"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getUserByUsername, addToken } from "../services/users"
import { revalidatePath } from "next/cache"

export const registerUser = async (
  prevState: { errors?: {
      username?: string
      name?: string
      password?: string
      passwordConfirm?: string
    },
   values?: {
      username: string
      name: string
    }
  },
  
  formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  } = {}

  const existingUser = await getUserByUsername(username)

  if (existingUser) {
    errors.username = "User with the given username already exists in the database"
  } else if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (!passwordConfirm) {
  errors.passwordConfirm = "Please confirm your password"
  } else if (passwordConfirm !== password) {
  errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateNewToken = async (formData: FormData) => {
  const id = Number(formData.get("userId"))
  const token = crypto.randomUUID()
  await addToken(id, token)


  revalidatePath("/me")

}