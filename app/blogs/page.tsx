import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogs } from "../actions/blogs"
import { Suspense } from "react"


type Props = {
  searchParams: Promise<{ filter?: string }>
}

async function BlogsContent({ searchParams }: Props) {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter?.trim())



  return (
    <div>
      <h2>Blogs</h2>

      <form action={filterBlogs}>
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          key={filter ?? ""}
        />
        <button type="submit">
          Search
        </button>
      </form>
      <br/>
      <Link href="/blogs">
        <button type="button">Show all</button>
      </Link>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>
              <Link href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </strong>
            <br />
            Author: {blog.author}
            <br />
            URL: <a href={blog.url}>{blog.url}</a>
            <br />
            Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Blogs(props: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogsContent searchParams={props.searchParams} />
    </Suspense>
  )
}