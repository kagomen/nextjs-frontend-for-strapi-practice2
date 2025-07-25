export interface LoginResponse {
  jwt: string
  user: UserData
}

export interface UserData {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}
