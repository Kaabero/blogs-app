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
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values?.username} />
          </label>
        </div>
        {state.errors?.username ? <p style={{ color: "red" }}>{state.errors.username}</p> : <br />}
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} />
          </label>
        </div>
        {state.errors?.name ? <p style={{ color: "red" }}>{state.errors.name}</p> : <br />}
        <div>
          <label>
            Password
            <input type="password" name="password"  />
          </label>
        </div>
        {state.errors?.password ? <p style={{ color: "red" }}>{state.errors.password}</p> : <br />}
        <div>
          <label>
            Repeat password
            <input type="password" name="passwordConfirm"/>
          </label>
        </div>
        {state.errors?.passwordConfirm ? <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p> : <br />}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

