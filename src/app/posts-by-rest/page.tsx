import Link from "next/link"
import { apiUrl } from "../constants/constants"
import { Post } from "../types/post"

async function getPosts() {
  const res = await fetch(`${apiUrl}/api/posts`)
  const data = await res.json()
  return data.data
}

export default async function Home() {
  const posts: Post[] = await getPosts()
  return (
    <div>
      <h2>By REST API</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.documentId}>
            <Link href={`/posts-by-rest/${post.documentId}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
