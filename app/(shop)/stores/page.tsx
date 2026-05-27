"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export default function StoresPage() {
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Cửa hàng gần bạn" },
          ]}
        />

        <h1 className="text-xl font-bold text-foreground mt-4 mb-6">
          Tìm cửa hàng gần bạn
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-xl">
          <div className="relative">
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none bg-white transition-colors"
            >
              <option value="">Tỉnh thành</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="hn">Hà Nội</option>
              <option value="dn">Đà Nẵng</option>
              <option value="ct">Cần Thơ</option>
              <option value="hp">Hải Phòng</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none bg-white transition-colors"
            >
              <option value="">Phường xã</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-card border border-border rounded-lg min-h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">Bản đồ cửa hàng</p>
            <p className="text-sm">Vui lòng chọn tỉnh thành để xem danh sách cửa hàng</p>
          </div>
        </div>
      </div>
    </div>
  )
}
