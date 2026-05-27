import { DashboardMetricsGrid } from '@/components/accounting/dashboard-metrics'
import { RevenueChart, ExpenseChart, ProfitChart } from '@/components/accounting/dashboard-charts'
import { RecentInvoices, RecentTransactions } from '@/components/accounting/recent-activity'
import { dashboardMetrics, revenueChartData, expensesByCategory } from '@/lib/accounting-data'

export default function AccountingDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Kế toán</h1>
        <p className="text-muted-foreground">Tổng quan tài chính Di Động Việt</p>
      </div>

      <DashboardMetricsGrid metrics={dashboardMetrics} />

      <div className="grid gap-6 lg:grid-cols-3">
        <RevenueChart data={revenueChartData} />
        <ExpenseChart data={expensesByCategory} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ProfitChart data={revenueChartData} />
        <div className="space-y-6">
          <RecentInvoices />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentInvoices />
        <RecentTransactions />
      </div>
    </div>
  )
}
