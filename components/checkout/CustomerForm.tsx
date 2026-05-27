"use client"

import { cn } from "@/lib/utils"

interface CustomerFormProps {
  className?: string
}

export function CustomerForm({ className }: CustomerFormProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="font-bold text-foreground uppercase">Thông tin khách hàng</h2>

      {/* Gender selection */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="male"
            defaultChecked
            className="w-4 h-4 text-primary border-border focus:ring-primary"
          />
          <span className="text-foreground">Anh</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="female"
            className="w-4 h-4 text-primary border-border focus:ring-primary"
          />
          <span className="text-foreground">Chị</span>
        </label>
      </div>

      {/* Name and phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Họ và tên <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số điện thoại <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            placeholder="Số điện thoại"
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
