"use client"

import { searchPosts } from "@/actions/post"
import { PostsResponse } from "@/types/graphql/post"
import { FormEvent } from "react"

type Props = {
  onSearchResult: (data: PostsResponse) => void
}

export function SearchForm({ onSearchResult }: Props) {
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = await searchPosts(formData)

    if (!data) {
      return
    }

    onSearchResult(data)
  }

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search..." name="searchText" />
      <button type="submit">🔍</button>
    </form>
  )
}
