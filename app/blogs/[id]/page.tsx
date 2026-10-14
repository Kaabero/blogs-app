import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLikeToBlog } from "../../actions/blogs"
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
    <div>
      <h2>{blog.title}</h2>
      <br />
      Author: {blog.author}
      <br />
      URL: <a href={blog.url}>{blog.url}</a>
      <br />
      Likes: {blog.likes}
      <form action={addLikeToBlog}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default function BlogPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogContent params={params} />
    </Suspense>
  )
}