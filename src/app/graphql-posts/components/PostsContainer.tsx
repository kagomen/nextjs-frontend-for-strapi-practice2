"use client"

import { PostsResponse } from "@/types/graphql/post"
import { useState } from "react"
import { PostsList } from "./PostsList"
import { SearchForm } from "./SearchForm"

type Props = {
  initialData: PostsResponse
}

export function PostsContainer({ initialData }: Props) {
  const [posts, setPosts] = useState(initialData.nodes)
  const [pageInfo, setPageInfo] = useState(initialData.pageInfo)

  const handleSearchResult = (data: PostsResponse) => {
    setPosts(data.nodes)
    setPageInfo(data.pageInfo)
  }

  return (
    <div>
      <SearchForm onSearchResult={handleSearchResult} />
      {posts.length === 0 ? (
        <div>ポストが見つかりませんでした</div>
      ) : (
        <PostsList posts={posts} pageInfo={pageInfo} />
      )}
    </div>
  )
}
