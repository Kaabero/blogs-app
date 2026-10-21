"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"


export type BlogState = {
  values?: {
    title: string
    author: string
    url: string
  }
  errors: {
    title?: string
    author?: string
    url?: string
  }
  success?: boolean
}


export const createBlog = async (
  prevState: BlogState,
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: BlogState["errors"] = {}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false
    }
  }
  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors, success: true }
}


export const addLikeToBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const filterBlogs = async (formData: FormData) => {
const filter = formData.get("filter")?.toString().trim()

if (!filter) {
redirect("/blogs")
}

redirect(`/blogs?filter=${filter}`)
}

