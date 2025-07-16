import { apiUrl } from "@/app/constants/constants"
import { Post } from "@/app/types/post"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

async function getPost(documentId: string) {
  const res = await fetch(`${apiUrl}/api/posts/${documentId}`)
  const data = await res.json()
  return data.data
}

type Props = {
  params: Promise<{ documentId: string }>
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params
  const post: Post | null = await getPost(documentId)

  if (!post) return <div>nothing</div>

  return (
    <article>
      <h2>{post.title}</h2>
      <BlocksRenderer content={post.content} />
    </article>
  )
}
