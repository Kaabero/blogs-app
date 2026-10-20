"use client"

import { createBlog, BlogState } from "../../actions/blogs"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()


  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully")
      router.push("/blogs")
    }
  }, [state, showNotification, router])


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="mb-5 flex flex-col gap-1 sm:flex-col">
        <div>
          <label>
            Title:{' '}
            <input className="input min-w-0 flex-1" type="text" name="title"  defaultValue={state.values?.title}/>
          </label>
        </div>
        {state.errors?.title ? <p style={{ color: "red" }}>{state.errors.title}</p> : <br />}
        <div>
          <label>
            Author:{' '}
            <input className="input min-w-0 flex-1" type="text" name="author" defaultValue={state.values?.author} />
          </label>
        </div>
        {state.errors?.author ? <p style={{ color: "red" }}>{state.errors.author}</p> : <br />}
        <div>
          <label>
            URL:{' '}
            <input className="input min-w-0 flex-1" type="text" name="url" defaultValue={state.values?.url} />
          </label>
        </div>
        {state.errors?.url ? <p style={{ color: "red" }}>{state.errors.url}</p> : <br />}
        <button className="mt-2 btn btn-primary" type="submit">Create</button>
        


      </form>
    </div>
  )
}

export default NewBlog