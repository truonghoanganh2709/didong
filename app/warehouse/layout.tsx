"use client"

import { WarehouseSidebar } from "@/components/warehouse/warehouse-sidebar"
import { WarehouseHeader } from "@/components/warehouse/warehouse-header"
import { Toaster } from "@/components/ui/sonner"

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <WarehouseSidebar />
      <div className="pl-64 transition-all duration-300">
        <WarehouseHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
