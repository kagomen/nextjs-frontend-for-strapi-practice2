import Link from "next/link"

export default async function Home() {
  return (
    <div>
      <Link href="/posts-by-rest">Posts By REST API</Link>
      <Link href="/posts-by-gql">Posts By GraphQL</Link>
    </div>
  )
}
