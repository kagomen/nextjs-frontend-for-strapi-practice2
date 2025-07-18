// servicesディレクトリ: 外部との通信を担うコードを置く

import {
  GetPostQuery,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@/graphql/generated/graphql"
import { GET_POST, GET_POSTS } from "@/graphql/queries/post"
import { graphqlClient } from "../../lib/graphqlClient"

export async function getPosts(variables: GetPostsQueryVariables) {
  try {
    const data = await graphqlClient.request<
      GetPostsQuery,
      GetPostsQueryVariables
    >(GET_POSTS, variables)

    return data.posts_connection
  } catch (error) {
    console.error("failed to get posts: ", error)
    return null
  }
}

export async function getPost(documentId: string) {
  try {
    const data = await graphqlClient.request<GetPostQuery>(GET_POST, {
      documentId,
    })

    return data.post
  } catch (error) {
    console.error("failed to get post: ", error)
    return null
  }
}
