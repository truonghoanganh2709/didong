import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  showValue?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  showValue = true,
  size = "sm",
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              index < Math.floor(rating)
                ? "fill-[#ffd400] text-[#ffd400]"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
