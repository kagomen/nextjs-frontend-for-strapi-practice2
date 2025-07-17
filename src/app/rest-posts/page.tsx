import Link from "next/link"
import { getPosts } from "../../services/rest/post"

export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <h2>REST API Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.documentId}>
            <Link href={`/rest-posts/${post.documentId}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
