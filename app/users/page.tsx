import Link from "next/link"
import { getUsers } from "../services/users"
import { Suspense } from "react"



const UsersContent = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default function Users() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UsersContent />
    </Suspense>
  )
}