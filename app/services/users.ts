import { db } from "../../db"
import { eq } from "drizzle-orm"
import { users } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}


export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}


export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}


export const addToken = async (id: number, token: string) => {
  await db.update(users).set({ token }).where(eq(users.id, id))
}

export const getToken = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })

  return user?.token ?? null
}

export const getUserByToken= async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
     with: {
      blogs: {
        columns: {
          author: true,
          title: true,
          url: true,
        },
      },
    },
  })
}

export const getUserWithReadingList = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  })
}