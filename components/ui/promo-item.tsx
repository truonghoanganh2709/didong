import { Check, Gift, Percent, CreditCard, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface PromoItemProps {
  icon?: "check" | "gift" | "percent" | "card" | "truck"
  text: string
  highlight?: string
  className?: string
}

const icons = {
  check: Check,
  gift: Gift,
  percent: Percent,
  card: CreditCard,
  truck: Truck,
}

export function PromoItem({ icon = "check", text, highlight, className }: PromoItemProps) {
  const Icon = icons[icon]

  return (
    <div className={cn("flex items-start gap-2 text-sm", className)}>
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3 h-3 text-green-600" />
      </div>
      <span className="text-muted-foreground">
        {text}
        {highlight && (
          <span className="text-primary font-medium ml-1">{highlight}</span>
        )}
      </span>
    </div>
  )
}

interface PromoListProps {
  items: Array<{
    icon?: "check" | "gift" | "percent" | "card" | "truck"
    text: string
    highlight?: string
  }>
  className?: string
}

export function PromoList({ items, className }: PromoListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <PromoItem key={index} {...item} />
      ))}
    </div>
  )
}
