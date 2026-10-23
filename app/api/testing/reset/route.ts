import { NextResponse } from "next/server"
import { deleteAllBlogs } from "@/app/services/blogs"
import { deleteAllUsers } from "@/app/services/users"
import { deleteAllReadingLists } from "@/app/services/readingList"



export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
  
  await deleteAllReadingLists()
  await deleteAllBlogs()
  await deleteAllUsers()
  

  return new NextResponse(null, { status: 204 })
}
