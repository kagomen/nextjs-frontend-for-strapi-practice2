import { apiUrl } from "@/constants/constants"
import { LoginResponse } from "@/types/rest/user"

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
    const errorData = await res.json()
    throw new Error(errorData.error.message)
  }

  return res.json()
}
