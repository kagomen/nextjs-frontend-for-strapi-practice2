"use server"

import { loginService } from "@/services/rest/login"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  try {
    const data = await loginService(identifier, password)

    if (data.jwt) {
      const cookieStore = await cookies()
      cookieStore.set("authToken", data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 69 * 24 * 7, // 1week
        path: "/",
      })
    }
  } catch (error) {
    redirect("/login?error=true")
  }

  redirect("/")
}
