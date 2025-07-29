import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

// ドラフトモードを終了させ、
// ドラフトモード終了ボタンがクエリで渡したパスにリダイレクト
export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || "/"

  redirect(path)
}
