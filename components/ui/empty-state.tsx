import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  image?: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({
  title,
  description,
  image,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      {image && (
        <div className="relative w-64 h-48 mb-6">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      )}
      <h3 className="text-xl font-medium text-foreground text-center mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
