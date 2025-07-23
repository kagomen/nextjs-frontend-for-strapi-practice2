"use client"

import { logoutAction } from "@/actions/logout"
import { UserData } from "@/types/rest/user"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useState } from "react"

interface UserContextType {
  user: UserData | null
  login: (userData: UserData) => void
  logout: () => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// クライアントコンポーネントでログイン状態やユーザ情報を利用するためのContext
// JWT tokenはブラウザでは管理せず、Cookieに保管する
// JWT tokenをクライアントコンポーネントで使用したい場合は、server actionsを使ってCookieから取得すること
export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: UserData | null
}) {
  const [user, setUser] = useState<UserData | null>(initialUser)
  const router = useRouter()

  const login = async (userData: UserData) => {
    setUser(userData)
  }

  const logout = async () => {
    await logoutAction()
    setUser(null)
    router.push("/login")
  }

  const isAuthenticated = !!user

  return (
    // UserContextはクライアントコンポーネントからユーザや認証情報を取得するために設置
    // UserContextはクライアントコンポーネントだが、childrenにはディレクティブ情報は影響しない
    // ※Next.jsではデフォルトでサーバーコンポーネント
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useAuthの使用に失敗しました")
  }
  return context
}
