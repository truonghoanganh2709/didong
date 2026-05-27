"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FAQAccordion } from "@/components/ui/faq-accordion"
import { RatingStars } from "@/components/ui/rating-stars"
import { ArticleCard, type Article } from "@/components/ui/article-card"

interface ProductContentProps {
  content: {
    description: string
    specs: Array<{ label: string; value: string }>
    faqs: Array<{ question: string; answer: string }>
    rating: {
      average: number
      total: number
      distribution: number[]
    }
    articles: Article[]
  }
  className?: string
}

export function ProductContent({ content, className }: ProductContentProps) {
  const [activeTab, setActiveTab] = useState<"content" | "specs" | "faq" | "reviews" | "news">("content")

  const tabs = [
    { id: "content", label: "Nội dung chính" },
    { id: "specs", label: "Thông số kỹ thuật" },
    { id: "faq", label: "Câu hỏi thường gặp" },
    { id: "reviews", label: "Đánh giá" },
    { id: "news", label: "Tin tức sản phẩm" },
  ]

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "content" && (
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-bold text-foreground mb-4">Nội dung chính</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>iPhone 17 Pro khi nào ra mắt?</li>
              <li>iPhone 17 Pro 256GB giá bao nhiêu?</li>
              <li>iPhone 17 Pro có mấy màu?</li>
              <li>Đánh giá iPhone 17 Pro 256GB</li>
              <li>iPhone 17 Pro 256GB phù hợp với ai?</li>
            </ol>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {content.description}
            </p>
            <button className="text-primary font-medium mt-4 hover:underline">
              Xem thêm
            </button>
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.specs.map((spec, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex justify-between py-3 px-4 rounded",
                    index % 2 === 0 ? "bg-muted/50" : ""
                  )}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-foreground text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Câu hỏi thường gặp</h3>
            <FAQAccordion items={content.faqs} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Đánh giá của người dùng về iPhone 17 Pro Max 256GB Chính Hãng
            </h3>
            
            <div className="flex items-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{content.rating.average}</div>
                <RatingStars rating={content.rating.average} size="md" showValue={false} />
                <div className="text-sm text-muted-foreground mt-1">
                  {content.rating.total} người đã đánh giá
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-3">{star}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ffd400] rounded-full"
                        style={{ width: `${content.rating.distribution[index] || 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {content.rating.distribution[index] || 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {["Tất cả", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao", "Chưa có đánh giá"].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Tin tức sản phẩm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
