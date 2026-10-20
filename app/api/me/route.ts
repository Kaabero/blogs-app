import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "../../services/users"


export const GET = async (req: NextRequest) => {
  const auth = req.headers.get("Authorization")
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = auth.split(' ')[1]

  const data = await getUserByToken(token)


  if (!data) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, username, name, blogs } = data


  return NextResponse.json({ id, username, name, blogs }, { status: 200 })
}