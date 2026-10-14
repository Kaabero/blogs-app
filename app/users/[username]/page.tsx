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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function UserPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserContent params={params}/>
    </Suspense>
  )
}