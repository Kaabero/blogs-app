import { eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

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
  await db.insert(blogs).values({ title, author, url })
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