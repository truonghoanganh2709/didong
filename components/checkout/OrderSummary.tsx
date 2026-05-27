"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  discount: number
  className?: string
}

export function OrderSummary({
  subtotal,
  shipping,
  discount,
  className,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const total = subtotal + shipping - discount

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="font-bold text-foreground uppercase">Chi tiết thanh toán</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-foreground">
          <span>Tiền hàng:</span>
          <span>{new Intl.NumberFormat("vi-VN").format(subtotal)} đ</span>
        </div>
        <div className="flex items-center justify-between text-foreground">
          <span>Phí vận chuyển:</span>
          <span>{shipping === 0 ? "Miễn phí" : `${new Intl.NumberFormat("vi-VN").format(shipping)} đ`}</span>
        </div>
        <div className="flex items-center justify-between text-foreground">
          <span>Khuyến mãi:</span>
          <span>{discount === 0 ? "0 đ" : `-${new Intl.NumberFormat("vi-VN").format(discount)} đ`}</span>
        </div>
      </div>

      {/* Promo code */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập mã khuyến mãi"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Áp dụng
        </button>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="font-bold text-foreground">Tổng cộng:</span>
        <span className="text-xl font-bold text-primary">
          {new Intl.NumberFormat("vi-VN").format(total)} đ
        </span>
      </div>
    </div>
  )
}
