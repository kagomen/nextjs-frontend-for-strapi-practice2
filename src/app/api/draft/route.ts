import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

// Strapi編集画面のプレビューボタンがたたくAPIエンドポイント
// secretでStrapiからのアクセスを確認後、ドラフトモードをONにし、
// 通常のPost表示画面にリダイレクトする
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const documentId = searchParams.get("documentId")

  if (secret !== process.env.DRAFT_MODE_SECRET || !documentId) {
    return new Response("Invalid token", { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(`/rest-posts/${documentId}`)
}
