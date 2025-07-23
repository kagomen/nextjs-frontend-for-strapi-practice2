import { apiUrl } from "@/constants/constants"
import { UserData } from "@/types/rest/user"
import { cookies } from "next/headers"

// ログインユーザー限定でコンポーネント表示する際に使用する
export async function getAuthUser() {
  // ログイン時にセットしたCookieからJWT tokenを取得
  const token = (await cookies()).get("jwtToken")?.value

  if (!token) return null

  try {
    // ユーザー情報を取得
    const res = await fetch(`${apiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const user: UserData = await res.json()
    return user
  } catch (error) {
    console.error("Failed to getCurrentUser:", error)
    return null
  }
}
