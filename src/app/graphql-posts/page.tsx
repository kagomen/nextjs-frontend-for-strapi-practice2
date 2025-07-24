import { POSTS_PAGE_SIZE } from "@/constants/constants"
import { getPosts } from "@/services/graphql/post"
import { PostsContainer } from "./components/PostsContainer"

// 注: 現在は異なる実装。以下はサーバーコンポーネントだけで検索フォームを実装したときのメモ。
// 検索処理のフロー:
// 1. ユーザが検索フォームを送信
// 2. GETメソッドでフォームが送信されると、フォームの内容はクエリパラメータに設定される
// 3. ブラウザがクエリパラメータが設定された新しいURLを検知し、ページリクエストを送信
// 4. getPosts()が実行され、Strapiにリクエストを送信
// 5. Strapiから返ってきた値を使ってHTMLを再レンダリング
export default async function GraphQLPostsPage() {
  // 初期データ取得
  const data = await getPosts({
    page: 1,
    pageSize: POSTS_PAGE_SIZE,
    searchText: "",
  })

  // 通信が失敗した場合、error.tsxを表示
  if (!data) {
    throw new Error("failed to get posts")
  }

  return (
    <div>
      <h2>GraphQL Posts</h2>
      <PostsContainer initialData={data} />
    </div>
  )
}
