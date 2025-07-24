"use client"

import { getMorePosts } from "@/actions/post"
import { GetPostsQuery, Pagination } from "@/graphql/generated/graphql"
import Link from "next/link"
import { useEffect, useState } from "react"

type PostListItem = NonNullable<
  GetPostsQuery["posts_connection"]
>["nodes"][number]

type Props = {
  // initialPostsの型をPost[]にすると、GET_POSTSのレスポンスにcommentsを含まないといけないため、
  // 今回はGetPostsQueryの戻り値の型を作成し、利用する
  posts: PostListItem[]
  pageInfo: Pagination
}

export function PostsList(props: Props) {
  const [posts, setPosts] = useState(props.posts)
  const [pageInfo, setPageInfo] = useState(props.pageInfo)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // propsが変更されたときにステートを更新
  useEffect(() => {
    setPosts(props.posts)
    setPageInfo(props.pageInfo)
  }, [props.posts, props.pageInfo])

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
