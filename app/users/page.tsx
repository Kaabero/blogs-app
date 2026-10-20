import Link from "next/link"
import { getUsers } from "../services/users"
import { Suspense } from "react"



const UsersContent = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md">
            <h4 className="text-lg font-semibold">
            <Link className="blog-title-link" href={`/users/${user.username}`}>{user.name}</Link>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default function Users() {
  return (
    <Suspense fallback={<p className="text-center mt-3">Loading...</p>}>
      <UsersContent />
    </Suspense>
  )
}
