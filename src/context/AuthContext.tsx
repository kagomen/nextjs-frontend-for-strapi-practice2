"use client"

import { loginService } from "@/services/rest/login"
import { UserData } from "@/types/rest/user"
import { createContext, ReactNode, useContext, useState } from "react"

interface AuthContextType {
  user: UserData | null
  jwt: string | null
  login: (identifier: string, password: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [jwt, setJwt] = useState<string | null>(null)

  const login = async (identifier: string, password: string) => {
    const data = await loginService(identifier, password)
    if (data.jwt && data.user) {
      setJwt(data.jwt)
      setUser(data.user)
    }
  }

  const logout = () => {
    setJwt(null)
    setUser(null)
  }

  const isAuthenticated = !!jwt

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthの使用に失敗しました")
  }
  return context
}
