"use client"

import Link from "next/link"

export function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-[#be1529] to-[#d70018] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
        <span className="text-yellow-300">🎊</span>
        <span className="font-medium">
          {"Tết đỏ dủ đầy - Giảm thêm đến 1 triệu"}
        </span>
        <Link
          href="/khuyen-mai"
          className="bg-[#ffd400] text-[#d70018] px-3 py-1 rounded-full text-xs font-bold hover:bg-yellow-300 transition-colors"
        >
          Săn ngay
        </Link>
      </div>
    </div>
  )
}
