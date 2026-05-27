import { AccountingSidebar } from '@/components/accounting/sidebar'
import { AccountingHeader } from '@/components/accounting/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kế toán - Di Động Việt',
  description: 'Hệ thống quản lý kế toán Di Động Việt',
}

export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AccountingSidebar />
      <div className="pl-64 transition-all duration-300">
        <AccountingHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
