import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getReadingListStatus = async (blogId: number): Promise<boolean> => {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("Not logged in")
    }
    const result = await db
    .select({ blogId: readingList.blogId })
    .from(readingList)
    .where(
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    )
    .limit(1)

  return result.length > 0

}

export const toggleUnRead = async (blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
      throw new Error("Not logged in")
  }

  const blog = await db
    .select({ blogId: readingList.blogId })
    .from(readingList).where(
    and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId)
    ))

  if (!blog) {
    throw new Error("Blog not found from readinglist")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    )

 
}

