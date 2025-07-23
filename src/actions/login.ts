"use server"

import { loginService } from "@/services/rest/login"
import { cookies } from "next/headers"

// ログインフォームで使用するアクション
export async function loginAction(formData: FormData) {
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  try {
    // Strapiのログインエンドポイントをたたく
    const data = await loginService(identifier, password)

    const cookieStore = await cookies()
    // 返却されたJWT tokenをCookieにセット

    cookieStore.set("jwtToken", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 69 * 24 * 7, // 1week
      path: "/",
    })

    cookieStore.set("userInfo", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    })

    return { success: true, user: data.user }
  } catch (error) {
    return { success: false }
  }
}
