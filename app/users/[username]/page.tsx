import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"
import { Suspense } from "react"

type Props = {
  params: Promise<{ username: string }>
}

async function UserContent({ params }: Props) {
  const { username } = await params
  const user = await getUserWithBlogs(username)


  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
       <p className="mt-2 mb-2 text-sm text-slate-600">
              Username:{" "}
              <span className="font-medium text-slate-800">
                {user.username}
              </span>
            </p>


      <h3 className="text-2xl mb-4">Blogs</h3>
      <ul className="space-y-4">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md">
            <h4 className="text-lg font-semibold">
            <Link className="blog-title-link" href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function UserPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="text-center mt-3">Loading...</p>}>
      <UserContent params={params}/>
    </Suspense>
  )
}