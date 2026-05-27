import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

export default function CartPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Tiếp tục mua hàng
        </Link>

        {/* Empty cart state */}
        <div className="bg-card border border-border rounded-lg p-8">
          <EmptyState
            title="Không có sản phẩm nào"
            image="/placeholder.svg?height=250&width=300"
            action={{
              label: "Về trang chủ",
              href: "/",
            }}
          />

          <div className="text-center mt-6 text-muted-foreground">
            <p>
              Khi cần trợ giúp, vui lòng gọi{" "}
              <a href="tel:1800.6018" className="text-primary font-bold">
                1800.6018
              </a>{" "}
              (7:30 - 21:30)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
