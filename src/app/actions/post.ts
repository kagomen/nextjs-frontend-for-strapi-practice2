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
