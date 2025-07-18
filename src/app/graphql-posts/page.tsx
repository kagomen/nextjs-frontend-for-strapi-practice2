"use client"

import { Pagination, Post } from "@/graphql/generated/graphql"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPosts } from "../../services/graphql/post"

const PAGE_SIZE = 1

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [pageInfo, setPageInfo] = useState<Pagination | null>(null)

  const loadPosts = async (page: number) => {
    const response = await getPosts({ page, pageSize: PAGE_SIZE })

    if (response?.nodes) {
      setPosts((prevPosts) => [...prevPosts, ...response.nodes])
    }

    if (response?.pageInfo) {
      setPageInfo(response.pageInfo)
    }
  }

  const handleLoadMore = () => {
    if (pageInfo && pageInfo.page < pageInfo.pageCount) {
      loadPosts(pageInfo.page + 1)
    }
  }

  useEffect(() => {
    loadPosts(1)
  }, [])

  const hasMore = pageInfo ? pageInfo.page < pageInfo.pageCount : false

  return (
    <div>
      <h2>GraphQL Posts</h2>
      <ul>
        {posts
          ?.filter((post) => post !== null)
          .map((post) => (
            <li key={post.documentId}>
              <Link href={`/graphql-posts/${post.documentId}`}>
                {post.title || "無題"}
              </Link>
            </li>
          ))}
      </ul>
      {hasMore ? (
        <button onClick={handleLoadMore}>もっと読む</button>
      ) : (
        <p>すべて表示済み</p>
      )}
    </div>
  )
}
