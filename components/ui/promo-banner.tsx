import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PromoBannerProps {
  image: string
  href: string
  alt: string
  className?: string
}

export function PromoBanner({ image, href, alt, className }: PromoBannerProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block relative overflow-hidden rounded-lg hover:opacity-90 transition-opacity",
        className
      )}
    >
      <Image
        src={image}
        alt={alt}
        width={600}
        height={200}
        className="w-full h-auto object-cover"
      />
    </Link>
  )
}

interface PromoCardProps {
  title: string
  subtitle?: string
  image?: string
  href: string
  bgColor?: string
  className?: string
}

export function PromoCard({
  title,
  subtitle,
  image,
  href,
  bgColor = "bg-gradient-to-r from-primary to-secondary",
  className,
}: PromoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block relative overflow-hidden rounded-lg p-4 text-white hover:shadow-lg transition-shadow",
        bgColor,
        className
      )}
    >
      <div className="relative z-10">
        <h3 className="font-bold text-lg">{title}</h3>
        {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
      </div>
      {image && (
        <div className="absolute right-0 bottom-0 w-24 h-24">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      )}
    </Link>
  )
}
