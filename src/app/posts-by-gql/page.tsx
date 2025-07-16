import { GET_POSTS } from "@/graphql/queries/post"
import { GraphQLClient } from "graphql-request"
import Link from "next/link"
import { apiUrl } from "../constants/constants"

type PostsResponse = {
  posts: {
    title: string
    documentId: string
  }[]
}

async function getPosts() {
  const graphqlClient = new GraphQLClient(`${apiUrl}/graphql`)

  const data: PostsResponse = await graphqlClient.request(GET_POSTS)

  return data.posts
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <h2>By GraphQL</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.documentId}>
            <Link href={`/posts-by-gql/${post.documentId}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
