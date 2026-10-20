import { notFound } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { Suspense } from "react"
import { generateNewToken } from "./../actions/users"
import { getToken } from "../services/users"


async function ProfileContent() {
  const user = await getCurrentUser()
  
  if (!user) {
    notFound()
  }

  const token = await getToken(user.id)

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