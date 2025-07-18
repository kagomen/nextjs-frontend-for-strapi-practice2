// servicesディレクトリ: 外部との通信を担うコードを置く

import {
  GetPostQuery,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@/graphql/generated/graphql"
import { GET_POST, GET_POSTS } from "@/graphql/queries/post"
import { graphqlClient } from "../../lib/graphqlClient"

export async function getPosts(variables: GetPostsQueryVariables) {
  const data = await graphqlClient.request<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS, variables)

  return data.posts_connection
}

export async function getPost(documentId: string) {
  const data = await graphqlClient.request<GetPostQuery>(GET_POST, {
    documentId,
  })

  return data.post
}
