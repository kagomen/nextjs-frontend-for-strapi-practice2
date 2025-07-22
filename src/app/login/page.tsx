"use client"

import { loginAction } from "@/actions/login"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const isError = useSearchParams().get("error")

  return (
    <div>
      <h2>Login Page</h2>
      {isError && <p>ログインに失敗しました</p>}
      <form action={loginAction}>
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
