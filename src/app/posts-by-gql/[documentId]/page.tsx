import { apiUrl } from "@/app/constants/constants"
import { GET_POST } from "@/graphql/queries/post"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { GraphQLClient } from "graphql-request"

type PostResponse = {
  post: {
    title: string
    content: BlocksContent
    publishedAt: string
  }
}

async function getPost(documentId: string) {
  const graphqlClient = new GraphQLClient(`${apiUrl}/graphql`)

  const data: PostResponse = await graphqlClient.request(GET_POST, {
    documentId,
  })

  return data.post
}

type Props = {
  params: Promise<{ documentId: string }>
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params
  const post = await getPost(documentId)

  if (!post) return <div>nothing</div>

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.publishedAt}</p>
      <BlocksRenderer content={post.content} />
    </article>
  )
}
