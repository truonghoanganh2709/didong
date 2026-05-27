"use client"

import { useState } from "react"
import { PriceDisplay } from "@/components/ui/price-display"
import { DiscountBadge, InstallmentBadge } from "@/components/ui/badges"
import { ColorSelector, StorageSelector } from "@/components/ui/selectors"
import { QuantitySelector } from "@/components/ui/quantity-selector"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: {
    name: string
    price: number
    originalPrice?: number
    discount?: number
    colors: Array<{ name: string; value: string }>
    storages: Array<{ label: string; value: string; available?: boolean }>
    installment?: boolean
  }
  className?: string
}

export function ProductInfo({ product, className }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value || "")
  const [selectedStorage, setSelectedStorage] = useState(product.storages[0]?.value || "")
  const [quantity, setQuantity] = useState(1)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Storage options */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Dung lượng
        </label>
        <StorageSelector
          options={product.storages}
          selectedStorage={selectedStorage}
          onSelect={setSelectedStorage}
        />
      </div>

      {/* Color options */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Màu sắc
        </label>
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">Giá bán tại:</span>
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          size="lg"
        />
        {product.discount && <DiscountBadge percentage={product.discount} />}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.installment && <InstallmentBadge text="Trả góp 0%, Quẻ thẻ" />}
        <div className="bg-[#ffd400] text-[#1a1a1a] px-3 py-1 rounded text-sm font-medium">
          Trả góp qua thẻ
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Số lượng:</span>
        <QuantitySelector
          quantity={quantity}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-bold text-lg transition-colors">
          MUA NGAY
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-[#ffd400] hover:bg-[#ffd400]/90 text-[#1a1a1a] py-3 rounded-lg font-medium transition-colors">
            Trả góp qua thẻ
          </button>
          <button className="border border-primary text-primary hover:bg-primary/5 py-3 rounded-lg font-medium transition-colors">
            Mua trả góp
          </button>
        </div>
      </div>
    </div>
  )
}
