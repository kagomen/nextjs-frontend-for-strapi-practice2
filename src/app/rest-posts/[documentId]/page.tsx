import { getPost } from "@/services/rest/post"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

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
      <BlocksRenderer content={post.content} />
    </article>
  )
}
