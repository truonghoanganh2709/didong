"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    sold: 456,
    revenue: "₫15,956,440,000",
    progress: 100,
    image: "📱",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    sold: 389,
    revenue: "₫12,444,110,000",
    progress: 85,
    image: "📱",
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    sold: 312,
    revenue: "₫5,616,000,000",
    progress: 68,
    image: "📱",
  },
  {
    id: 4,
    name: "OPPO Find X7 Ultra",
    brand: "OPPO",
    sold: 278,
    revenue: "₫6,947,220,000",
    progress: 61,
    image: "📱",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    sold: 534,
    revenue: "₫3,204,000,000",
    progress: 58,
    image: "🎧",
  },
];

export function TopSellingProducts() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">
            Top Selling Products
          </CardTitle>
        </div>
        <Badge variant="secondary">This Month</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
            >
              {/* Rank */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : index === 1
                      ? "bg-muted-foreground/20 text-foreground"
                      : index === 2
                        ? "bg-warning/20 text-warning"
                        : "bg-secondary text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>

              {/* Product Image Placeholder */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {product.brand}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Progress
                    value={product.progress}
                    className="h-2 flex-1 [&>div]:bg-primary"
                  />
                  <span className="text-xs text-muted-foreground shrink-0">
                    {product.sold} sold
                  </span>
                </div>
              </div>

              {/* Revenue */}
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm">{product.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
