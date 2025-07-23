"use client"

import { loginAction } from "@/actions/login"
import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useUser()
  const [error, setError] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError(false)
    const result = await loginAction(formData)

    if (result.success && result.user) {
      login(result.user)
      router.push("/")
      return
    }

    setError(true)
  }

  return (
    <div>
      <h2>Login Page</h2>
      {error && <p>ログインに失敗しました</p>}
      <form action={handleSubmit}>
        <input type="email" name="identifier" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
