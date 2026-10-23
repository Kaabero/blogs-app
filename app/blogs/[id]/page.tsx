import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLikeToBlog } from "../../actions/blogs"
import { addBlogToReadingList } from "@/app/actions/readingList"
import { Suspense } from "react"

type Props = {
  params: Promise<{ id: string }>
}

async function BlogContent({ params }: Props) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h2 data-testid="blog-title" className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p data-testid="blog-author" className="mt-2 mb-2 text-sm text-slate-600">
        Author:{" "}
        <span className="font-medium text-slate-800">
          {blog.author}
        </span>
      </p>
      <p className="mt-3 wrap-break-word text-sm text-slate-600">
        URL:{" "}
        <a className="link" href={blog.url}>
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
        <input type="hidden" name="id" value={blog.id} />
        <button className="mt-2 btn btn-primary" type="submit">
          Like
        </button>
      </form>

      <form action={addBlogToReadingList}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          data-testid="add-to-reading-list-button"
          className="mt-2 btn btn-primary bg-emerald-500"
          type="submit"
        >
          Add to reading list
        </button>
      </form>
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
