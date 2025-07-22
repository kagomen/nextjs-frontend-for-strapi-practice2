"use client"

import { getMorePosts } from "@/actions/post"
import { Pagination, Post } from "@/graphql/generated/graphql"
import Link from "next/link"
import { useState } from "react"

type Props = {
  initialPosts: Post[]
  initialPageInfo: Pagination
}

export function PostsList({ initialPosts, initialPageInfo }: Props) {
  const [posts, setPosts] = useState(initialPosts)
  const [pageInfo, setPageInfo] = useState(initialPageInfo)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGetMorePosts = async () => {
    const data = await getMorePosts(pageInfo.page + 1)

    // 読み込みに失敗した場合、ページ全体をエラーにせず、メッセージ表示して対応する
    if (!data) {
      setErrorMessage("読み込みに失敗しました")
      return
    }

    setPosts((prevPosts) => [...prevPosts, ...data.nodes])
    setPageInfo(data.pageInfo)
  }

  const hasMore = pageInfo ? pageInfo.page < pageInfo.pageCount : false

  return (
    <div>
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
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : hasMore ? (
        <button onClick={handleGetMorePosts}>もっと読む</button>
      ) : (
        <p>すべて表示済み</p>
      )}
    </div>
  )
}
