"use client"

import Link from "next/link"
import { Search, Phone, Store, FileSearch, Gift, ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: Phone, label: "Đặt hàng", href: "/dat-hang" },
  { icon: Store, label: "Cửa hàng", href: "/stores" },
  { icon: FileSearch, label: "Tra cứu", href: "/tracking" },
  { icon: Gift, label: "Khuyến mãi", href: "/khuyen-mai" },
  { icon: ShoppingCart, label: "Giỏ hàng", href: "/cart" },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-[#be1529] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded p-1">
                <div className="w-8 h-8 bg-[#d70018] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-tight">didongviet</div>
                <div className="text-[10px] text-white/80 uppercase tracking-wider">
                  Chuyên gia giá trị vượt trội
                </div>
              </div>
            </div>
          </Link>

          {/* Danh mục button */}
          <button className="hidden md:flex items-center gap-2 bg-[#444444] hover:bg-[#555555] px-4 py-2 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
            <span className="font-medium">Danh mục</span>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn cần tìm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-lg text-[#1a1a1a] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#ffd400]"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-[#d70018]" />
              </button>
            </div>
          </div>

          {/* Nav items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center px-3 py-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
