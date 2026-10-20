import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLikeToBlog, addBlogToReadingList } from "../../actions/blogs"
import { Suspense } from "react"
import { getCurrentUser } from "@/app/services/session"
import { getReadingListStatus } from "@/app/services/readingList"

type Props = {
  params: Promise<{ id: string }>
}

async function BlogContent({ params }: Props) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()
  


  if (!blog) {
    notFound()
  }

  const readingListStatus = await getReadingListStatus(blog.id)


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="mt-2 mb-2 text-sm text-slate-600">
        Author:{" "}
        <span className="font-medium text-slate-800">
          {blog.author}
        </span>
      </p>
      <p className="mt-3 wrap-break-word text-sm text-slate-600">
        URL:{" "}
        <a
          className="link"
          href={blog.url}
        >
          {blog.url}
        </a>
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Likes:{" "}
        <span className="font-semibold text-slate-800">
          {blog.likes}
        </span>
      </p>
      <form action={addLikeToBlog}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />
        <button className="mt-2 btn btn-primary" type="submit">Like</button>
      </form>
      {user && user.id !== blog.userId && !readingListStatus && (
      <form action={addBlogToReadingList}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />
        <button className="mt-2 btn btn-primary bg-emerald-500" type="submit">Add to reading list</button>
      </form>
      )}
</div>
  )
}

export default function BlogPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="text-center mt-3">Loading...</p>}>
      <BlogContent params={params} />
    </Suspense>
  )
}