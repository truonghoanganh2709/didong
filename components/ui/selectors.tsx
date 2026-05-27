"use client"

import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  value: string
  image?: string
}

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColor: string
  onSelect: (color: string) => void
  className?: string
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelect,
  className,
}: ColorSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onSelect(color.value)}
          className={cn(
            "px-3 py-2 rounded-lg border text-sm font-medium transition-all",
            selectedColor === color.value
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.value }}
            />
            <span>{color.name}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

interface StorageOption {
  label: string
  value: string
  available?: boolean
}

interface StorageSelectorProps {
  options: StorageOption[]
  selectedStorage: string
  onSelect: (storage: string) => void
  className?: string
}

export function StorageSelector({
  options,
  selectedStorage,
  onSelect,
  className,
}: StorageSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => option.available !== false && onSelect(option.value)}
          disabled={option.available === false}
          className={cn(
            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
            selectedStorage === option.value
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/50",
            option.available === false && "opacity-50 cursor-not-allowed"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
