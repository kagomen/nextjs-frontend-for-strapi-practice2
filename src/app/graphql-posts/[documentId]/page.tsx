import { getAuthUser } from "@/lib/auth"
import { getPost } from "@/services/graphql/post"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { CommentForm } from "../components/CommentForm"

type Props = {
  params: Promise<{ documentId: string }>
}

export default async function PostPage({ params }: Props) {
  const { documentId } = await params
  const post = await getPost(documentId)

  if (!post) throw new Error("failed to get post")

  const user = await getAuthUser()

  return (
    <div>
      <article>
        <h2>{post.title}</h2>
        <p>{post.publishedAt}</p>
        <BlocksRenderer content={post.content} />
      </article>

      {/* ログインユーザにのみ表示されるコメントフォーム */}
      {user && <CommentForm />}
    </div>
  )
}
