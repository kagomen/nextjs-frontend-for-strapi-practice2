"use client"

import { searchPosts } from "@/actions/post"
import { PostsResponse } from "@/types/graphql/post"
import { FormEvent, useState } from "react"
import { PostsList } from "./PostsList"

type Props = {
  initialData: PostsResponse
}

export function SearchForm({ initialData }: Props) {
  const [posts, setPosts] = useState(initialData.nodes)
  const [pageInfo, setPageInfo] = useState(initialData.pageInfo)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = await searchPosts(formData)

    if (data) {
      setPosts(data.nodes)
      setPageInfo(data.pageInfo)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." name="searchText" />
        <button type="submit">🔍</button>
      </form>
      <PostsList posts={posts} pageInfo={pageInfo} />
    </div>
  )
}
