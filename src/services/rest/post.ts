import { draftMode } from "next/headers"
import { apiUrl } from "../../constants/constants"
import { PostResponse, PostsResponse } from "../../types/rest/post"

export async function getPosts() {
  const { isEnabled } = await draftMode()

  const url =
    `${apiUrl}/api/posts?status=` + (isEnabled ? "draft" : "published")

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  })
  const data: PostsResponse = await res.json()
  return data.data
}

export async function getPost(documentId: string) {
  // ドラフトモードかどうかを判断するフラグを取得
  const { isEnabled } = await draftMode()

  const url =
    `${apiUrl}/api/posts/${documentId}?status=` +
    (isEnabled ? "draft" : "published")

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  })

  const data: PostResponse = await res.json()
  return data.data
}
