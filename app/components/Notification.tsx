"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null


  return <div data-testid="notification" className=
  {`m-3 rounded-none text-white text-center p-4  ${type === "success" ? "bg-green-800" : "bg-red-800"}`}
  >
  {message}
  </div>
}