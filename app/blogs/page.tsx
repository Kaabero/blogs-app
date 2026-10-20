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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <form action={filterBlogs} className="mb-5 flex flex-col gap-1 sm:flex-row">
        <input
        className="input min-w-0 flex-1"
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          key={filter ?? ""}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {filter && (
      <Link href="/blogs">
        <button className="mb-2 btn btn-secondary" type="button">Show all</button>
      </Link>
      )}
      {blogs.length > 0 ? ( 
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md">
            <h4 className="text-lg font-semibold">
              <Link  className="blog-title-link" href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              Author:{" "}
              <span className="font-medium text-slate-800">
                {blog.author}
              </span>
            </p>
            <p className="mt-3 break-words text-sm text-slate-600">
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
          </li>
        ))}
      </ul>
      ) : (
      <p className="mt-2 mb-2 text-sm text-slate-600">
        No blogs
      </p> 
      )}
    </div>
  )
}


export default function Blogs(props: Props) {
  return (
    <Suspense fallback={<p className="text-center mt-3">Loading...</p>}>
      <BlogsContent searchParams={props.searchParams} />
    </Suspense>
  )
}