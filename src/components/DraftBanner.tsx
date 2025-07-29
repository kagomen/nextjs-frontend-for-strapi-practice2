"use client"
import { usePathname } from "next/navigation"

export function DraftBanner() {
  const pathname = usePathname()
  return (
    <div className="bg-orange-500">
      <p>プレビューモード表示中</p>
      {/* 現在のパスをroute handlerに渡し、リダイレクトさせる */}
      <a href={`/api/disable-draft?path=${pathname}`}>プレビューを終了</a>
    </div>
  )
}
