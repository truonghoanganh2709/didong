"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center border border-border rounded-lg", className)}>
      <button
        onClick={onDecrement}
        disabled={quantity <= min}
        className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-2 min-w-[50px] text-center font-medium">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        disabled={quantity >= max}
        className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
