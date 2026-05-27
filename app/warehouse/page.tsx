"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/warehouse/stat-card"
import { StatusBadge } from "@/components/warehouse/status-badge"
import {
  Package,
  DollarSign,
  AlertTriangle,
  XCircle,
  PackagePlus,
  PackageMinus,
  TrendingUp,
  Clock,
  Truck,
  ClipboardCheck,
  RefreshCw
} from "lucide-react"
import {
  products,
  warehouseActivities,
  getWarehouseStats,
  monthlyData,
  formatCurrency,
  formatDate
} from "@/lib/warehouse-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

const activityIcons = {
  import: PackagePlus,
  export: PackageMinus,
  transfer: Truck,
  audit: ClipboardCheck,
  adjust: RefreshCw
}

export default function WarehouseDashboard() {
  const stats = getWarehouseStats()
  const lowStockProducts = products.filter(p => p.status === "low_stock")
  const topSellingProducts = products.slice(0, 5).sort((a, b) => b.quantity - a.quantity)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Kho</h1>
          <p className="text-muted-foreground">Tổng quan hoạt động kho hàng</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Cập nhật lúc: 27/05/2026
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Tổng sản phẩm"
          value={stats.totalProducts.toLocaleString("vi-VN")}
          icon={Package}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Giá trị tồn kho"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatCard
          title="Sắp hết hàng"
          value={stats.lowStockProducts}
          icon={AlertTriangle}
          iconClassName="bg-yellow-500"
        />
        <StatCard
          title="Hết hàng"
          value={stats.outOfStockProducts}
          icon={XCircle}
          iconClassName="bg-red-500"
        />
        <StatCard
          title="Phiếu nhập hôm nay"
          value={stats.todayImports}
          icon={PackagePlus}
          iconClassName="bg-green-500"
        />
        <StatCard
          title="Phiếu xuất hôm nay"
          value={stats.todayExports}
          icon={PackageMinus}
          iconClassName="bg-blue-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Biểu đồ nhập/xuất theo tháng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Bar dataKey="import" name="Nhập kho" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="export" name="Xuất kho" fill="#1e293b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Hoạt động gần đây</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <div className="space-y-0">
                {warehouseActivities.map((activity) => {
                  const IconComponent = activityIcons[activity.type as keyof typeof activityIcons]
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-4 border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.createdBy} • {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Warning */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Cảnh báo tồn kho thấp
            </CardTitle>
            <Link href="/warehouse/inventory">
              <Button variant="ghost" size="sm">Xem tất cả</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Mã: {product.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">{product.quantity}</p>
                      <p className="text-xs text-muted-foreground">còn lại</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Không có sản phẩm sắp hết hàng
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Sản phẩm cần nhập thêm
            </CardTitle>
            <Link href="/warehouse/import">
              <Button variant="ghost" size="sm">Tạo phiếu nhập</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSellingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={product.status} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Tồn: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
