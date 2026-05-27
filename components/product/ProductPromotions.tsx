import { Check, Gift, CreditCard, Truck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Promotion {
  icon: "check" | "gift" | "card" | "truck" | "shield"
  title: string
  description?: string
  link?: string
}

interface ProductPromotionsProps {
  promotions: Promotion[]
  className?: string
}

const icons = {
  check: Check,
  gift: Gift,
  card: CreditCard,
  truck: Truck,
  shield: Shield,
}

export function ProductPromotions({ promotions, className }: ProductPromotionsProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Gift className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Khuyến mãi</h3>
      </div>

      <div className="space-y-3">
        {promotions.map((promo, index) => {
          const Icon = icons[promo.icon]
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium text-primary">{index + 1}. </span>
                  {promo.title}
                  {promo.description && (
                    <span className="text-muted-foreground"> {promo.description}</span>
                  )}
                  {promo.link && (
                    <Link href={promo.link} className="text-primary hover:underline ml-1">
                      (Xem chi tiết)
                    </Link>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="w-full text-center text-primary text-sm font-medium mt-4 hover:underline">
        Xem thêm
      </button>
    </div>
  )
}
