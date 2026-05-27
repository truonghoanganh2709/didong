import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PriceDisplay } from "./price-display"
import { DiscountBadge, InstallmentBadge } from "./badges"
import { RatingStars } from "./rating-stars"

export interface Product {
  id: string
  name: string
  slug: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  rating?: number
  installment?: boolean
  gifts?: string[]
  badge?: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group block bg-card rounded-lg border border-border p-3 hover:shadow-lg transition-shadow",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square mb-3">
        {product.badge && (
          <div className="absolute top-0 left-0 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-br-lg font-medium">
            {product.badge}
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />
          {hasDiscount && product.discount && (
            <DiscountBadge percentage={product.discount} />
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {product.installment && <InstallmentBadge />}
        </div>

        {/* Gifts */}
        {product.gifts && product.gifts.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <span className="text-green-600 font-medium">Quà: </span>
            {product.gifts[0]}
            {product.gifts.length > 1 && ` +${product.gifts.length - 1} quà`}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <RatingStars rating={product.rating} />
        )}
      </div>
    </Link>
  )
}
