// servicesディレクトリ: 外部との通信を担うコードを置く

import { GetPostQuery, GetPostsQuery } from "@/graphql/generated/graphql"
import { GET_POST, GET_POSTS } from "@/graphql/queries/post"
import { graphqlClient } from "../../lib/graphqlClient"

export async function getPosts() {
  const data = await graphqlClient.request<GetPostsQuery>(GET_POSTS)

  return data.posts
}

export async function getPost(documentId: string) {
  const data = await graphqlClient.request<GetPostQuery>(GET_POST, {
    documentId,
  })

  return data.post
}
