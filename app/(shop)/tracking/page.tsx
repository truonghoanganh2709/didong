"use client"

import { useState } from "react"
import Image from "next/image"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export default function TrackingPage() {
  const [phone, setPhone] = useState("")
  const [orderCode, setOrderCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle tracking logic
    console.log("Tracking:", { phone, orderCode })
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tra cứu" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Tra cứu đơn hàng"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-bold text-foreground mb-4">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-4 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-foreground mb-4">
                  Mã vận đơn
                </label>
                <input
                  type="text"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  placeholder="Nhập mã vận đơn"
                  className="w-full px-4 py-4 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Theo dõi hành trình
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
