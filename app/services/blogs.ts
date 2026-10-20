import { eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (filter?: string) => {
  if (filter) {
    const blogsFromDb = await db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
    })

    return blogsFromDb.sort((a, b) => b.likes - a.likes)
  }

  const blogsFromDb = await db.query.blogs.findMany()

  return blogsFromDb.sort((a, b) => b.likes - a.likes)
}


export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const [blog] = await db.insert(blogs).values({ title, author, url, userId: user.id }).returning()

  if (!blog) {
    throw new Error("Creating new blog failed")
  }

  await db.insert(readingList).values({userId: user.id, blogId: blog.id})
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}


export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }
  const blog = await getBlogById(blogId)

  if (!blog) {
    throw new Error("Blog not found")
  }  

  await db.insert(readingList).values({userId: user.id, blogId})

}