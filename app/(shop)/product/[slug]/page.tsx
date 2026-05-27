"use client"

import { use } from "react"
import Link from "next/link"
import { ChevronLeft, Shield, Truck, RefreshCcw } from "lucide-react"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductPromotions } from "@/components/product/ProductPromotions"
import { NearbyStores } from "@/components/product/NearbyStores"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { ProductContent } from "@/components/product/ProductContent"
import { mockProducts, mockArticles } from "@/lib/mock-data"

// Mock product detail data
const productDetail = {
  name: "iPhone 17 Pro Max 256GB Chính Hãng",
  price: 36990000,
  originalPrice: 37990000,
  discount: 3,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  colors: [
    { name: "Cam vũ trụ", value: "#FF6B35" },
    { name: "Xanh dầm", value: "#1E3A5F" },
    { name: "Bạc", value: "#C0C0C0" },
  ],
  storages: [
    { label: "128GB", value: "128gb" },
    { label: "256GB", value: "256gb" },
    { label: "512GB", value: "512gb" },
    { label: "1TB", value: "1tb" },
  ],
  installment: true,
}

const promotions = [
  {
    icon: "gift" as const,
    title: "Tặng Sạc 2 Tai Zin Bóc Máy",
    link: "#",
  },
  {
    icon: "card" as const,
    title: "Combo Tết DA ÂN - CHILI - SMART giảm thêm đến 1.500.000đ",
    link: "#",
  },
  {
    icon: "check" as const,
    title: "Ưu đãi độc quyền",
    description: "Giảm thêm 200.000đ khi thanh toán chuyển khoản hoặc 1 trong 5 mã thanh toán",
    link: "#",
  },
  {
    icon: "card" as const,
    title: "Giảm 3% giá gốc khi mua kèm máy",
    link: "#",
  },
]

const nearbyStores = [
  {
    id: "1",
    name: "Cửa hàng Di Động Việt Phan Đăng Lưu",
    address: "201 Thống Nhất, Phường Tân Thành, Thành Phố Cà Mau",
    phone: "1800.6018",
    isOpen: true,
  },
  {
    id: "2",
    name: "Cửa hàng Vertu Đông Khởi",
    address: "71 Đồng Khởi, Phường Bến Nghé, Thành phố Hồ Chí Minh",
    phone: "0877.999.579",
    isOpen: true,
  },
]

const productContent = {
  description: `iPhone 17 Pro Max 256GB nổi bật với chip A19 Pro được sản xuất trên tiến 
trình 3nm mạnh mẽ, xử lý mượt mà các tác vụ nặng. Bộ 3 camera đều 
được nâng cấp lên 48MP cùng với zoom quang lên mạng diện thêm ảnh 
sắc nét, sống động. Màn hình 6.9 inch, Promotion 120Hz Super Retina 
XDR, độ sáng tối đa lên đến 2000 nits.`,
  specs: [
    { label: "Màn hình", value: "6.9 inch" },
    { label: "Độ phân giải", value: "3000 mili" },
    { label: "Mặt kính cảm ứng", value: "Kính cường lực Ceramic Shield" },
    { label: "Công nghệ màn hình", value: "Super Retina XDR, Công nghệ ProMotion" },
    { label: "Màn hình rộng", value: '6.9" - Tân số quét 120Hz' },
    { label: "Camera sau", value: "48MP Fusion với Công nghệ Tetrapixel, 48MP Fusion Ultra Wide" },
    { label: "Quay phim", value: "Zoom quang học 6.5x, 7x, 8x, Quay Slo-motion" },
    { label: "Tính năng", value: "Center Stage, Góc hình siêu rộng, Quay video chuyển động" },
    { label: "Độ phân giải", value: "8MP" },
    { label: "Camera trước", value: "12MP TrueDepth" },
    { label: "Chip bộ nhớ & CPU", value: "A19 Pro" },
    { label: "Chip đồ họa (GPU)", value: "GPU 6 lõi mới Neural Engine" },
    { label: "Hệ điều hành", value: "iOS 26" },
    { label: "Ổ cứng (CPU)", value: "Chip A19 Pro" },
  ],
  faqs: [
    {
      question: "Camera trên iPhone 17 Pro Max có nâng cấp gì đặc biệt?",
      answer: "iPhone 17 Pro Max được trang bị hệ thống camera 48MP với khả năng zoom quang học 6.5x, hỗ trợ quay video 8K và nhiều tính năng chụp ảnh chuyên nghiệp.",
    },
    {
      question: "iPhone 17 Pro Max chơi game có tốt không?",
      answer: "Với chip A19 Pro mạnh mẽ và GPU 6 lõi, iPhone 17 Pro Max xử lý mượt mà các game nặng nhất trên App Store.",
    },
    {
      question: "iPhone 17 Pro Max phù hợp với đối tượng người dùng nào?",
      answer: "iPhone 17 Pro Max phù hợp với người dùng cao cấp, những người cần hiệu năng mạnh mẽ, camera chuyên nghiệp và màn hình lớn.",
    },
    {
      question: "iPhone 17 Pro Max có kích thước màn hình bao nhiêu?",
      answer: "iPhone 17 Pro Max có màn hình 6.9 inch Super Retina XDR với tần số quét 120Hz.",
    },
  ],
  rating: {
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0],
  },
  articles: mockArticles.slice(0, 4),
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Điện thoại", href: "/dien-thoai" },
            { label: "Điện thoại iPhone", href: "/dien-thoai/iphone" },
            { label: "iPhone 17 series", href: "/dien-thoai/iphone-17" },
            { label: productDetail.name },
          ]}
        />

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary hover:underline mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Tiếp tục mua hàng
        </Link>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery
              images={productDetail.images}
              productName={productDetail.name}
            />

            {/* Product features */}
            <div className="mt-4 bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Thông tin sản phẩm</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Hàng chính hãng - Bảo hành </span>
                    <span className="text-primary">12 tháng tại TGDĐ</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">Giao hàng toàn quốc</span>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCcw className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Đổi trả trong </span>
                    <span className="text-primary">30 ngày</span>
                    <span className="text-muted-foreground"> nếu lỗi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {productDetail.name}
            </h1>
            <ProductInfo product={productDetail} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <ProductPromotions promotions={promotions} />
            <NearbyStores stores={nearbyStores} />
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts
          products={[...mockProducts.iphone, ...mockProducts.samsung]}
          className="mb-8"
        />

        {/* Product content tabs */}
        <ProductContent content={productContent} className="mb-8" />
      </div>
    </div>
  )
}
