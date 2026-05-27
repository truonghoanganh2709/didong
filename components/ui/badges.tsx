import { cn } from "@/lib/utils"

interface DiscountBadgeProps {
  percentage: number
  className?: string
}

export function DiscountBadge({ percentage, className }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-primary text-primary-foreground",
        className
      )}
    >
      -{percentage}%
    </span>
  )
}

interface InstallmentBadgeProps {
  className?: string
  text?: string
}

export function InstallmentBadge({ className, text = "Trả góp 0%" }: InstallmentBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#ffd400] text-[#1a1a1a]",
        className
      )}
    >
      {text}
    </span>
  )
}

interface GiftBadgeProps {
  className?: string
  text?: string
}

export function GiftBadge({ className, text = "Quà tặng" }: GiftBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500 text-white",
        className
      )}
    >
      {text}
    </span>
  )
}
