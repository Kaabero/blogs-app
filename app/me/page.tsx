import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "../services/session"
import { Suspense } from "react"
import { generateNewToken } from "./../actions/users"
import { getToken, getUserWithReadingList } from "../services/users"
import { toggleBlogUnread } from "../actions/readingList"
import { connection } from "next/server"

async function ProfileContent() {
  await connection()

  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

   const token = await getToken(user.id)

  const userWithReadinglist = await getUserWithReadingList(user.id)
  const unreadBlogs =
    userWithReadinglist?.readingList
      .filter((item) => item.read === false)
      .map((item) => item.blog) ?? []
  const readBlogs =
    userWithReadinglist?.readingList
      .filter((item) => item.read === true)
      .map((item) => item.blog) ?? []

  const userHasUnreadBlogs = unreadBlogs.length > 0
  const userHasReadBlogs = readBlogs.length > 0

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div data-testid="user-profile">
        <h2 className="text-2xl font-bold mb-4">My profile</h2>
        <p data-testid="user-name" className="mt-2 mb-2 text-sm text-slate-600">
          Name:{" "}
          <span className="font-medium text-slate-800">{user.name}</span>
        </p>
        <p data-testid="user-username" className="mt-2 mb-2 text-sm text-slate-600">
          Username:{" "}
          <span className="font-medium text-slate-800">{user.username}</span>
        </p>
      </div>

      <div data-testid="api-token-section">
        <h3 className="text-xl mb-4 mt-2">API Token</h3>
        {token ? (
      <>
        <p data-testid="token-display" className="mt-2 mb-2 text-sm text-slate-600">Current token:</p>
        <code data-testid="api-token" className="mt-2 mb-2 block text-sm bg-slate-100 p-3 rounded border border-slate-300 text-slate-800">{token}</code>
      </>
      ) : (
        <p data-testid="no-token-message" className="mt-2 mb-2 text-sm text-slate-600">
          No token has been generated yet
        </p>
      )}
      <form action={generateNewToken}>
        <input type="hidden" name="userId" value={user.id} />
        <button
          data-testid="generate-token-button"
          className="mt-2 font-medium btn btn-primary"
          type="submit"
        >
          Generate New Token
        </button>
      </form>
      </div>
      <div data-testid="reading-list-section">
        <h3 className="text-2xl mb-4 mt-5">Reading list</h3>
        <h4 className="text-1xl mb-4 mt-5">Unread ({unreadBlogs.length})</h4>
        <div data-testid="unread-section">
          {userHasUnreadBlogs ? (
            <ul className="space-y-4">
              {unreadBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <h4 className="text-lg font-semibold">
                    <Link className="blog-title-link" href={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h4>

                  <form action={toggleBlogUnread} className="ml-auto">
                    <input type="hidden" name="id" value={blog.id} />
                    <button
                      data-testid={`mark-read-${blog.id}`}
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
            <p data-testid="no-unread-blogs" className="mt-2 mb-2 text-sm text-slate-600">
              No unread blogs in reading list
            </p>
          )}
        </div>
        <h4 className="text-1xl mb-4 mt-5">Read ({readBlogs.length})</h4>
        {userHasReadBlogs ? (
          <ul className="space-y-4">
            {readBlogs.map((blog) => (
              <li
                key={blog.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
              >
                <h4 className="text-lg font-semibold">
                  <Link className="blog-title-link" href={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h4>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 mb-2 text-sm text-slate-600">No read blogs in reading list</p>
        )}

        {!userHasUnreadBlogs && !userHasReadBlogs && (
          <p data-testid="empty-reading-list" className="mt-2 mb-2 text-sm text-slate-600">
            No blogs in reading list
          </p>
        )}
      </div>
    </div>
  )
}


export default function MyProfilePage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-3">Loading...</p>}
    >
      <ProfileContent />
    </Suspense>
  )
}
