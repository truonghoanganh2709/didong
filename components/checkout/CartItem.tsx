"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { QuantitySelector } from "@/components/ui/quantity-selector"
import { DiscountBadge } from "@/components/ui/badges"
import { cn } from "@/lib/utils"

interface CartItemProps {
  item: {
    id: string
    name: string
    variant: string
    image: string
    price: number
    originalPrice?: number
    discount?: number
    quantity: number
  }
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
  className?: string
}

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  className,
}: CartItemProps) {
  return (
    <div className={cn("flex gap-4 p-4 border-b border-border", className)}>
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-foreground line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{item.variant}</p>
          </div>
          <button
            onClick={onRemove}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">
              {new Intl.NumberFormat("vi-VN").format(item.price)} đ
            </span>
            {item.discount && <DiscountBadge percentage={item.discount} />}
          </div>

          <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => onQuantityChange(item.quantity + 1)}
            onDecrement={() => onQuantityChange(Math.max(1, item.quantity - 1))}
          />
        </div>
      </div>
    </div>
  )
}
