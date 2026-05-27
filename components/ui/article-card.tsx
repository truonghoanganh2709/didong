import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface Article {
  id: string
  title: string
  slug: string
  image: string
  author: string
  date: string
  category?: string
}

interface ArticleCardProps {
  article: Article
  className?: string
  variant?: "default" | "horizontal"
}

export function ArticleCard({ article, className, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className={cn(
          "group flex gap-4 bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow",
          className
        )}
      >
        <div className="relative w-32 h-24 flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex flex-col justify-center py-2">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span>-</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="relative aspect-video">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        {article.category && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            {article.category}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>-</span>
          <span>{article.date}</span>
        </div>
      </div>
    </Link>
  )
}
