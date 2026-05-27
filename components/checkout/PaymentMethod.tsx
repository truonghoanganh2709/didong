"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentMethodProps {
  className?: string
}

export function PaymentMethod({ className }: PaymentMethodProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="font-bold text-foreground uppercase">Phương thức thanh toán</h2>

      <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <span className="text-foreground">Chọn phương thức thanh toán</span>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  )
}
