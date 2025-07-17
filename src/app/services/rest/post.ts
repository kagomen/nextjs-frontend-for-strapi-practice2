import { apiUrl } from "../../constants/constants"
import { PostResponse, PostsResponse } from "../../types/rest/post"

export async function getPosts() {
  const res = await fetch(`${apiUrl}/api/posts`)
  const data: PostsResponse = await res.json()
  return data.data
}

export async function getPost(documentId: string) {
  const res = await fetch(`${apiUrl}/api/posts/${documentId}`)
  const data: PostResponse = await res.json()
  return data.data
}
