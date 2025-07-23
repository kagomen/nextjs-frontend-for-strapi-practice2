import { apiUrl } from "@/constants/constants"
import { LoginResponse } from "@/types/rest/user"

// Strapiのログインエンドポイントをたたき、結果を返却する
export async function loginService(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${apiUrl}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error.message)
  }

  return res.json()
}
