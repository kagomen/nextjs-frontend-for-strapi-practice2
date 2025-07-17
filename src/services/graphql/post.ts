// servicesディレクトリ: 外部との通信を担うコードを置く

import { GET_POST, GET_POSTS } from "@/graphql/queries/post"
import { graphqlClient } from "../../lib/graphqlClient"
import { PostResponse, PostsResponse } from "../../types/graphql/post"

export async function getPosts() {
  const data: PostsResponse = await graphqlClient.request(GET_POSTS)

  return data.posts
}

export async function getPost(documentId: string) {
  const data: PostResponse = await graphqlClient.request(GET_POST, {
    documentId,
  })

  return data.post
}
