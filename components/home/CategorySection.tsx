"use client"

import { useState } from "react"
import { ProductCard, type Product } from "@/components/ui/product-card"
import { CategoryTabs } from "@/components/ui/category-tabs"
import { cn } from "@/lib/utils"

interface CategorySectionProps {
  title: string
  tabs?: Array<{ id: string; label: string }>
  products: Record<string, Product[]>
  className?: string
  showTabs?: boolean
}

export function CategorySection({
  title,
  tabs = [],
  products,
  className,
  showTabs = true,
}: CategorySectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "all")

  const displayProducts = products[activeTab] || products["all"] || Object.values(products)[0] || []

  return (
    <section className={cn("py-6", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {showTabs && tabs.length > 0 && (
          <CategoryTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayProducts.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
