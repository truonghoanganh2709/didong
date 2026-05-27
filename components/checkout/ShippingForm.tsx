"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShippingFormProps {
  className?: string
}

export function ShippingForm({ className }: ShippingFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [selectedProvince, setSelectedProvince] = useState("")

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="font-bold text-foreground uppercase">Hình thức giao hàng</h2>

      {/* Delivery method */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="delivery"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={() => setDeliveryMethod("delivery")}
            className="w-4 h-4 text-primary border-border focus:ring-primary"
          />
          <span className="text-foreground">Giao hàng tận nơi</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={() => setDeliveryMethod("pickup")}
            className="w-4 h-4 text-primary border-border focus:ring-primary"
          />
          <span className="text-foreground">Nhận hàng tại cửa hàng</span>
        </label>
      </div>

      {deliveryMethod === "delivery" && (
        <>
          {/* Province and district */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tỉnh thành <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none bg-white transition-colors"
                >
                  <option value="">Chọn tỉnh thành</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="nb">Ninh Bình</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                {selectedProvince && (
                  <button
                    onClick={() => setSelectedProvince("")}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phường xã <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none bg-white transition-colors"
                >
                  <option value="">Chọn phường / xã</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tên đường số nhà <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên đường / số nhà"
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Yêu cầu khác (nếu có)
            </label>
            <input
              type="text"
              placeholder="Nhập yêu cầu"
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground text-sm">Gọi người khác nhận hàng (Nếu có)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground text-sm">Xuất hóa đơn công ty</span>
            </label>
          </div>
        </>
      )}
    </div>
  )
}
