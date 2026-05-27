"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trash2 } from "lucide-react"
import { CustomerForm } from "@/components/checkout/CustomerForm"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { PaymentMethod } from "@/components/checkout/PaymentMethod"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { QuantitySelector } from "@/components/ui/quantity-selector"
import { DiscountBadge } from "@/components/ui/badges"

// Mock cart data
const cartItem = {
  id: "1",
  name: "APPLE IPHONE 17 PRO MAX 256GB (CTY)",
  variant: "Cam vũ trụ - New",
  image: "/placeholder.svg?height=100&width=100",
  price: 36990000,
  originalPrice: 38140000,
  discount: 3,
  quantity: 1,
}

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const subtotal = cartItem.price * quantity
  const shipping = 0 // Free shipping
  const discount = 0

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Tiếp tục mua hàng
        </Link>

        {/* Cart item */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={cartItem.image}
                alt={cartItem.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-foreground">{cartItem.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cartItem.variant}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">
                    {new Intl.NumberFormat("vi-VN").format(cartItem.price)} đ
                  </span>
                  {cartItem.discount && <DiscountBadge percentage={cartItem.discount} />}
                </div>
                <div className="flex items-center gap-3">
                  <QuantitySelector
                    quantity={quantity}
                    onIncrement={() => setQuantity((q) => q + 1)}
                    onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                  <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <CustomerForm />
        </div>

        {/* Shipping form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <ShippingForm />
        </div>

        {/* Payment method */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <PaymentMethod />
        </div>

        {/* Order summary */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mb-6">
          <span className="text-green-600">✓</span> Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
          <Link href="/dieu-khoan" className="text-primary hover:underline">
            Điều khoản sử dụng
          </Link>{" "}
          và chính sách{" "}
          <Link href="/bao-mat" className="text-primary hover:underline">
            Xử lý dữ liệu cá nhân
          </Link>{" "}
          của Di Động Việt.
        </p>
      </div>
    </div>
  )
}
