import { BlocksContent } from "@strapi/blocks-react-renderer"

export type PostsResponse = {
  posts: {
    title: string
    documentId: string
  }[]
}

export type PostResponse = {
  post: {
    title: string
    content: BlocksContent
    publishedAt: string
  }
}
