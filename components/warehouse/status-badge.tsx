"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  // Product status
  in_stock: { label: "Còn hàng", variant: "default" },
  low_stock: { label: "Sắp hết", variant: "secondary" },
  out_of_stock: { label: "Hết hàng", variant: "destructive" },
  // Order status
  draft: { label: "Nháp", variant: "outline" },
  pending: { label: "Chờ duyệt", variant: "secondary" },
  completed: { label: "Hoàn thành", variant: "default" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
  // Transfer status
  in_transit: { label: "Đang vận chuyển", variant: "secondary" },
  received: { label: "Đã nhận", variant: "default" },
  // Audit status
  in_progress: { label: "Đang kiểm", variant: "secondary" },
  // Defective status
  processing: { label: "Đang xử lý", variant: "secondary" },
  returned: { label: "Đã trả NCC", variant: "outline" },
  // Export types
  online: { label: "Online", variant: "default" },
  store: { label: "Cửa hàng", variant: "secondary" },
  warranty: { label: "Bảo hành", variant: "outline" }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "outline" as const }
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(
        config.variant === "default" && "bg-green-600 hover:bg-green-700 text-white",
        config.variant === "secondary" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        config.variant === "destructive" && "bg-red-100 text-red-800 hover:bg-red-200",
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
