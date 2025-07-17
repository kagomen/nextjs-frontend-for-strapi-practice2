import Link from "next/link"
import { getPosts } from "../../services/graphql/post"

export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <h2>GraphQL Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.documentId}>
            <Link href={`/graphql-posts/${post.documentId}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
