import { GetPostsQuery } from "@/graphql/generated/graphql"

export type PostsResponse = NonNullable<GetPostsQuery["posts_connection"]>

export type PostListItem = NonNullable<
  GetPostsQuery["posts_connection"]
>["nodes"][number]
