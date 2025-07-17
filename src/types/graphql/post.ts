import { BlocksContent } from "@strapi/blocks-react-renderer"

export interface PostsResponse {
  posts: {
    title: string
    documentId: string
  }[]
}

export interface PostResponse {
  post: {
    title: string
    content: BlocksContent
    publishedAt: string
  }
}
