import { BlocksContent } from "@strapi/blocks-react-renderer"

export interface Post {
  id: number
  documentId: string
  title: string
  content: BlocksContent
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type PostsResponse = {
  data: Post[]
}

export type PostResponse = {
  data: Post
}
