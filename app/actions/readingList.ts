"use server"

import { toggleUnRead } from "../services/readingList"
import { addToReadingList } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const addBlogToReadingList = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addToReadingList(id)
  revalidatePath("/me")
  revalidatePath(`/blogs/${id}`)
}

export const toggleBlogUnread = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await toggleUnRead(id)
  revalidatePath("/me")
}