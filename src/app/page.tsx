"use client"

import { useUser } from "@/context/UserContext"
import Link from "next/link"

export default function Home() {
  const { logout } = useUser()

  return (
    <div className="flex flex-col">
      <Link href="/rest-posts">REST API</Link>
      <Link href="/graphql-posts">GraphQL</Link>

      <button onClick={logout}>Logout</button>
    </div>
  )
}
