import { notFound } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "../services/session"
import { Suspense } from "react"
import { generateNewToken } from "./../actions/users"
import { getToken, getUserWithReadingList } from "../services/users"
import { toggleBlogUnread } from "../actions/readingList"


async function ProfileContent() {
  const user = await getCurrentUser()
  
  if (!user) {
    notFound()
  }

  const token = await getToken(user.id)

  const userWithReadinglist = await getUserWithReadingList(user.id)

  const unreadBlogs = userWithReadinglist?.readingList.filter((item) => item.read === false).map((item)=> item.blog)

  const readBlogs = userWithReadinglist?.readingList.filter((item) => item.read === true).map((item)=> item.blog)

  const userHasUnreadBlogs = unreadBlogs && unreadBlogs?.length > 0

  const userHasReadBlogs = readBlogs && readBlogs?.length > 0


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My profile</h2>
       <p className="mt-2 mb-2 text-sm text-slate-600">
          Name:{" "}
          <span className="font-medium text-slate-800">
            {user.name}
          </span>
        </p>
        <p className="mt-2 mb-2 text-sm text-slate-600">
          Username:{" "}
          <span className="font-medium text-slate-800">
            {user.username}
          </span>
        </p>
      <h3 className="text-xl mb-4 mt-2">API Token</h3>
      <p className="mt-2 mb-2 text-sm text-slate-600">
        Current token:{" "}
      </p>
      {token ? (
      <p className="mt-2 mb-2 text-sm bg-blue-200 p-4 text-slate-800 border-2 border-blue-300">
        {token}
      </p>
      ): (
        <p className="mt-2 mb-2 text-sm text-slate-600">
          No token has been generated yet
        </p>
      )}
      <form action={generateNewToken}>
        <input
          type="hidden"
          name="userId"
          value={user.id}
        />
        <button className="mt-2 font-medium btn btn-primary" type="submit">Generate New Token</button>
      </form>
    <h3 className="text-2xl mb-4 mt-5">Reading list</h3>
    <h4 className="text-1xl mb-4 mt-5">Unread ({unreadBlogs?.length})</h4>

    {userHasUnreadBlogs ? (
      <ul className="space-y-4">
        {unreadBlogs.map((blog) => (
        <li
          key={blog.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
        >
          <h4 className="text-lg font-semibold">
            <Link
              className="blog-title-link"
              href={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
          </h4>

          <form action={toggleBlogUnread} className="ml-auto">
            <input type="hidden" name="id" value={blog.id} />
            <button
              className="btn btn-primary bg-emerald-500"
              type="submit"
            >
              Mark as read
            </button>
          </form>
        </li>
        ))}
      </ul>
    ) : (

      <p className="mt-2 mb-2 text-sm text-slate-600">
        No unread blogs in reading list
      </p>

    )}
    <h4 className="text-1xl mb-4 mt-5">Read ({readBlogs?.length})</h4>


    {userHasReadBlogs ? (
      <ul className="space-y-4">
        {readBlogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
          >
            <h4 className="text-lg font-semibold">
              <Link
                className="blog-title-link"
                href={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
            </h4>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 mb-2 text-sm text-slate-600">
        No read blogs in reading list
      </p>

    )}

    {!userHasUnreadBlogs && !userHasReadBlogs && (
      <p className="mt-2 mb-2 text-sm text-slate-600">
        No blogs in reading list
      </p>
    )}
    </div>
  )
}

export default function MyProfilePage() {
  return (
    <Suspense fallback={<p className="text-center mt-3">Loading...</p>}>
      <ProfileContent/>
    </Suspense>
  )
}