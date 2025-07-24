"use server"

import { POSTS_PAGE_SIZE } from "@/constants/constants"
import { getPosts } from "@/services/graphql/post"

export async function getMorePosts(page: number) {
  try {
    return getPosts({ page, pageSize: POSTS_PAGE_SIZE })
  } catch (error) {
    console.error("failed to load more posts: ", error)
    return null
  }
}

export async function searchPosts(formData: FormData) {
  const searchText = (formData.get("searchText") as string) || ""

  const data = await getPosts({
    page: 1,
    pageSize: POSTS_PAGE_SIZE,
    searchText,
  })

  return data
}
