import Link from "next/link"

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Link href="/rest-posts">REST API</Link>
      <Link href="/graphql-posts">GraphQL</Link>
    </div>
  )
}
