import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Product } from "@/components/ui/product-card"

interface RelatedProductsProps {
  products: Product[]
  title?: string
  className?: string
}

export function RelatedProducts({
  products,
  title = "Sản phẩm tương tự",
  className,
}: RelatedProductsProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <h3 className="font-bold text-foreground mb-4">{title}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {products.slice(0, 6).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block bg-background rounded-lg border border-border p-2 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="text-xs font-medium text-foreground line-clamp-2 mb-1">
              {product.name}
            </h4>
            <div className="text-primary font-bold text-sm">
              {new Intl.NumberFormat("vi-VN").format(product.price)} đ
            </div>
            {product.originalPrice && (
              <div className="text-muted-foreground text-xs line-through">
                {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
