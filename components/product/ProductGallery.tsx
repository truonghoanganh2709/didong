"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Main image */}
      <div className="relative aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={productName}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-colors",
              selectedIndex === index
                ? "border-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <Image
              src={image}
              alt={`${productName} - ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
