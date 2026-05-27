import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ"
}

export function PriceDisplay({
  price,
  originalPrice,
  className,
  size = "md",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-bold text-primary",
          sizeClasses[size]
        )}
      >
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-muted-foreground line-through text-sm">
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  )
}
