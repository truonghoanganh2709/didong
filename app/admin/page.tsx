"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { RevenueChart } from "@/components/admin/dashboard/revenue-chart";
import { OrderStatistics } from "@/components/admin/dashboard/order-statistics";
import { LowStockAlerts } from "@/components/admin/dashboard/low-stock-alerts";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { TopSellingProducts } from "@/components/admin/dashboard/top-selling-products";
import { CustomerStatistics } from "@/components/admin/dashboard/customer-statistics";

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening with your store today."
    >
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OrderStatistics />
      </div>

      {/* Middle Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <LowStockAlerts />
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TopSellingProducts />
        <CustomerStatistics />
      </div>
    </DashboardLayout>
  );
}
