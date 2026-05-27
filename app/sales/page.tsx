"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  Truck,
  TrendingUp,
  Package,
  MessageSquare,
} from "lucide-react";
import {
  mockDashboardStats,
  mockOrders,
  mockNotifications,
  formatCurrency,
  formatTime,
  getStatusColor,
  getStatusLabel,
} from "@/lib/mock-data/sales";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SalesHeader } from "@/components/sales/header";
import Link from "next/link";

const revenueData = [
  { name: "T2", revenue: 45000000 },
  { name: "T3", revenue: 52000000 },
  { name: "T4", revenue: 38000000 },
  { name: "T5", revenue: 67000000 },
  { name: "T6", revenue: 89000000 },
  { name: "T7", revenue: 128000000 },
  { name: "CN", revenue: 95000000 },
];

const statCards = [
  {
    title: "Đơn hôm nay",
    value: mockDashboardStats.todayOrders,
    icon: ShoppingCart,
    trend: "+12%",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Khách đang tư vấn",
    value: mockDashboardStats.consultingCustomers,
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Doanh thu cá nhân",
    value: formatCurrency(mockDashboardStats.personalRevenue),
    icon: DollarSign,
    trend: "+8%",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Đơn chờ xác nhận",
    value: mockDashboardStats.pendingOrders,
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Đơn cần giao",
    value: mockDashboardStats.deliveryOrders,
    icon: Truck,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

export default function SalesDashboard() {
  const pendingOrders = mockOrders.filter((o) => o.status === "pending");
  const managerNotifications = mockNotifications.filter(
    (n) => n.type === "manager"
  );

  return (
    <div className="flex flex-col">
      <SalesHeader title="Dashboard" />

      <div className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    {stat.trend && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs text-success">{stat.trend}</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Doanh thu tuần này
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000000}tr`}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelStyle={{ color: "var(--foreground)" }}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Sản phẩm bán chạy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardStats.topProducts.map((item, index) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.brand}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.sold} đã bán
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Đơn chờ xác nhận
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sales/orders">Xem tất cả</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {pendingOrders.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Không có đơn hàng chờ xác nhận
                    </p>
                  ) : (
                    pendingOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {order.orderNumber}
                            </span>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                order.paymentStatus
                              )}`}
                            >
                              {getStatusLabel(order.paymentStatus)}
                            </Badge>
                            {order.paymentMethod === "cod" && (
                              <Badge variant="outline" className="text-xs">
                                COD
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {order.customer.name} - {order.customer.phone}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-primary">
                            {formatCurrency(order.total)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(order.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Manager Notifications */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Thông báo từ quản lý
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {managerNotifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Không có thông báo mới
                    </p>
                  ) : (
                    managerNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.read
                            ? "bg-secondary/50"
                            : "bg-primary/5 border border-primary/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <p className="font-medium text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
