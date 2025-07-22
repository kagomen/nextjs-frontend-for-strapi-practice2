"use client"

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ identifier, password })

    try {
      await login(identifier, password)
      console.log("ログイン成功")
    } catch (error) {
      console.log("ログイン失敗")
    }
  }
  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
