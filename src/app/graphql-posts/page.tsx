import { POSTS_PAGE_SIZE } from "@/constants/constants"
import { getPosts } from "@/services/graphql/post"
import { PostsList } from "./components/PostsList"

// 検索処理のフロー:
// 1. ユーザが検索フォームを送信
// 2. GETメソッドでフォームが送信されると、フォームの内容はクエリパラメータに設定される
// 3. ブラウザがクエリパラメータが設定された新しいURLを検知し、ページリクエストを送信
// 4. getPosts()が実行され、Strapiにリクエストを送信
// 5. Strapiから返ってきた値を使ってHTMLを再レンダリング
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ searchText?: string }>
}) {
  const { searchText } = await searchParams

  const data = await getPosts({
    page: 1,
    pageSize: POSTS_PAGE_SIZE,
    searchText,
  })

  // 通信が失敗した場合、error.tsxを表示
  if (!data) throw new Error("failed to get posts")

  // 通信は成功したが、投稿がない場合
  if (data.nodes.length === 0) {
    return <div>ポストがありません</div>
  }

  return (
    <div>
      <h2>GraphQL Posts</h2>
      <form>
        <input
          type="text"
          placeholder="Search..."
          name="searchText"
          defaultValue={searchText || ""}
        />
        <button type="submit">🔍</button>
      </form>
      <PostsList posts={data.nodes} pageInfo={data.pageInfo} />
    </div>
  )
}
