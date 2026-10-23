"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const initialState = {
  errors: {
    username: "",
    name: "",
    password: "",
    passwordConfirm: ""
  },
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="mb-5 flex flex-col gap-1 sm:flex-col">
        <div>
          <label>
            Username
            <input className="input min-w-0 flex-1" type="text" name="username" defaultValue={state.values?.username} />
          </label>
        </div>
        {state.errors?.username ? <p data-testid="username-error" style={{ color: "red" }}>{state.errors.username}</p> : <br />}
        <div>
          <label>
            Name
            <input className="input min-w-0 flex-1" type="text" name="name" defaultValue={state.values?.name} />
          </label>
        </div>
        {state.errors?.name ? <p style={{ color: "red" }}>{state.errors.name}</p> : <br />}
        <div>
          <label>
            Password
            <input className="input min-w-0 flex-1" type="password" name="password"  />
          </label>
        </div>
        {state.errors?.password ? <p style={{ color: "red" }}>{state.errors.password}</p> : <br />}
        <div>
          <label>
            Confirm Password
            <input className="input min-w-0 flex-1" type="password" name="passwordConfirm"/>
          </label>
        </div>
        {state.errors?.passwordConfirm ? <p data-testid="passwordConfirm-error" style={{ color: "red" }}>{state.errors.passwordConfirm}</p> : <br />}
        <button className="mt-2 btn btn-primary" type="submit" data-testid="register-button">Register</button>
      </form>
    </div>
  )
}

