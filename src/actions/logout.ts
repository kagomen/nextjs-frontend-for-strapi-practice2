"use server"

import { cookies } from "next/headers"

// ログアウトボタンで使用するアクション

// Cookieを削除する
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("jwtToken")
  cookieStore.delete("userInfo")

  return { success: true }
}
