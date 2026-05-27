'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  RefreshCcw,
  Users,
  Wallet,
  Receipt,
  RotateCcw,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  {
    title: 'Dashboard',
    href: '/accounting',
    icon: LayoutDashboard,
  },
  {
    title: 'Hóa đơn',
    href: '/accounting/invoices',
    icon: FileText,
  },
  {
    title: 'Thanh toán',
    href: '/accounting/payments',
    icon: CreditCard,
  },
  {
    title: 'Đối soát',
    href: '/accounting/reconciliation',
    icon: RefreshCcw,
  },
  {
    title: 'Công nợ',
    href: '/accounting/debts',
    icon: Users,
  },
  {
    title: 'Chi phí',
    href: '/accounting/expenses',
    icon: Wallet,
  },
  {
    title: 'Phiếu thu/chi',
    href: '/accounting/receipts',
    icon: Receipt,
  },
  {
    title: 'Hoàn tiền',
    href: '/accounting/refunds',
    icon: RotateCcw,
  },
  {
    title: 'Báo cáo',
    href: '/accounting/reports',
    icon: BarChart3,
  },
  {
    title: 'Cài đặt',
    href: '/accounting/settings',
    icon: Settings,
  },
]

export function AccountingSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/accounting" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Smartphone className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary">Di Động Việt</span>
                <span className="text-xs text-sidebar-muted">Kế toán</span>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/accounting' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
              KT
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Kế toán viên</span>
                <span className="text-xs text-sidebar-muted">admin@didongviet.vn</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
