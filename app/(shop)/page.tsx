"use client"

import { HeroSlider } from "@/components/home/HeroSlider"
import { CategorySection } from "@/components/home/CategorySection"
import { PromoBanner } from "@/components/ui/promo-banner"
import { mockProducts, categoryTabs, heroSlides, sidePromos } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Main slider */}
          <div className="lg:col-span-2">
            <HeroSlider slides={heroSlides} />
          </div>

          {/* Side promos */}
          <div className="flex flex-col gap-4">
            {sidePromos.map((promo) => (
              <Link
                key={promo.id}
                href={promo.href}
                className="relative block rounded-lg overflow-hidden bg-gradient-to-r from-[#be1529] to-[#d70018] p-4 text-white hover:shadow-lg transition-shadow"
              >
                <div className="relative z-10">
                  <h3 className="font-bold text-lg">{promo.title}</h3>
                  <p className="text-sm opacity-90">{promo.subtitle}</p>
                </div>
                <div className="absolute right-2 bottom-2 w-20 h-20">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}

            {/* Flash deals */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">Mở bán sớm nhất</span>
                <span className="text-xs text-muted-foreground">Xem thêm</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3.5 triệu</div>
                  <div className="text-xs text-muted-foreground">Giảm đến</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10 triệu</div>
                  <div className="text-xs text-muted-foreground">Thu cũ đổi mới</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">600K</div>
                  <div className="text-xs text-muted-foreground">Quà tặng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* iPhone Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <CategorySection
            title="Sản phẩm bán chạy nhất"
            tabs={categoryTabs.phones}
            products={{
              all: [...mockProducts.iphone, ...mockProducts.samsung].slice(0, 10),
              iphone: mockProducts.iphone,
              samsung: mockProducts.samsung,
              xiaomi: mockProducts.xiaomi,
            }}
          />
        </div>

        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <PromoBanner
            image="/placeholder.svg?height=150&width=400"
            href="/khuyen-mai/khai-truong"
            alt="Khai trương điện máy mới"
          />
          <PromoBanner
            image="/placeholder.svg?height=150&width=400"
            href="/khuyen-mai/tra-gop"
            alt="Trả góp 0%"
          />
          <PromoBanner
            image="/placeholder.svg?height=150&width=400"
            href="/khuyen-mai/san-ngay"
            alt="Săn ngay ưu đãi"
          />
        </div>

        {/* iPhone Official Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt="Apple"
              width={30}
              height={30}
            />
            <h2 className="text-xl font-bold text-foreground">
              iPhone Chính Hãng (Apple Authorized Reseller)
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.iphone.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Samsung Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Samsung Chính Hãng</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.samsung.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Xiaomi/OPPO Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-foreground">OPPO | Xiaomi | TECNO | realme | HONOR Chính Hãng</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.xiaomi.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* MacBook & Tablet Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">MacBook & Tablet</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.tablet.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Smart Watch Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Đồng Hồ Thông Minh</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.watch.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Audio Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Âm Thanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockProducts.audio.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-background rounded-lg border border-border p-3 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="text-primary font-bold">
                  {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                </div>
                {product.originalPrice && (
                  <div className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} đ
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
