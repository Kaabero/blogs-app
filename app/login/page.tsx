"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="mb-5 flex flex-col gap-1 sm:flex-col">
        <div>
          <label>
            Username
            <input className="input min-w-0 flex-1" type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input className="input min-w-0 flex-1" type="password" name="password" required />
          </label>
        </div>
        <button className="mt-2 btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  )
}