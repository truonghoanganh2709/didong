"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  PackageMinus,
  ClipboardCheck,
  Truck,
  Users,
  AlertTriangle,
  History,
  Settings,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

const menuItems = [
  { href: "/warehouse", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/warehouse/inventory", icon: Package, label: "Tồn kho" },
  { href: "/warehouse/import", icon: PackagePlus, label: "Nhập hàng" },
  { href: "/warehouse/export", icon: PackageMinus, label: "Xuất hàng" },
  { href: "/warehouse/audit", icon: ClipboardCheck, label: "Kiểm kho" },
  { href: "/warehouse/transfer", icon: Truck, label: "Chuyển kho" },
  { href: "/warehouse/suppliers", icon: Users, label: "Nhà cung cấp" },
  { href: "/warehouse/defective", icon: AlertTriangle, label: "Hàng lỗi" },
  { href: "/warehouse/history", icon: History, label: "Lịch sử" },
  { href: "/warehouse/settings", icon: Settings, label: "Cài đặt" }
]

export function WarehouseSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link href="/warehouse" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Smartphone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary">Di Động Việt</span>
              <span className="text-[10px] text-sidebar-foreground/60">Quản lý kho</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary mx-auto">
            <Smartphone className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/warehouse" && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Thu gọn</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
