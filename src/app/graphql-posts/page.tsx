import { POSTS_PAGE_SIZE } from "@/constants/constants"
import { getPosts } from "@/services/graphql/post"
import { PostsList } from "./components/PostsList"

export default async function Home() {
  const data = await getPosts({ page: 1, pageSize: POSTS_PAGE_SIZE })

  // 通信が失敗した場合、error.tsxを表示
  if (!data) throw new Error("failed to get posts")

  // 通信は成功したが、投稿がない場合
  if (data.nodes.length === 0) {
    return <div>ポストがありません</div>
  }

  return (
    <div>
      <h2>GraphQL Posts</h2>
      <PostsList initialPosts={data.nodes} initialPageInfo={data.pageInfo} />
    </div>
  )
}
