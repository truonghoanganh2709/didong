'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { formatCurrency } from '@/lib/accounting-data'
import type { DashboardMetrics } from '@/lib/accounting-types'

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variantStyles = {
  default: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  success: {
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  warning: {
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  danger: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
}

function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: MetricCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={
                    trend.isPositive ? 'text-sm text-success' : 'text-sm text-destructive'
                  }
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">so với hôm qua</span>
              </div>
            )}
          </div>
          <div className={`rounded-lg p-3 ${styles.iconBg}`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardMetricsGridProps {
  metrics: DashboardMetrics
}

export function DashboardMetricsGrid({ metrics }: DashboardMetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Doanh thu hôm nay"
        value={formatCurrency(metrics.todayRevenue)}
        icon={DollarSign}
        trend={{ value: 12.5, isPositive: true }}
        variant="success"
      />
      <MetricCard
        title="Doanh thu tháng"
        value={formatCurrency(metrics.monthRevenue)}
        icon={TrendingUp}
        trend={{ value: 8.2, isPositive: true }}
        variant="success"
      />
      <MetricCard
        title="Lợi nhuận tạm tính"
        value={formatCurrency(metrics.estimatedProfit)}
        icon={CreditCard}
        trend={{ value: 5.4, isPositive: true }}
        variant="success"
      />
      <MetricCard
        title="Tổng chi phí"
        value={formatCurrency(metrics.totalExpenses)}
        icon={AlertTriangle}
        trend={{ value: 3.2, isPositive: false }}
        variant="warning"
      />
      <MetricCard
        title="Công nợ phải thu"
        value={formatCurrency(metrics.receivables)}
        subtitle="Từ 5 đối tác"
        icon={Users}
        variant="warning"
      />
      <MetricCard
        title="Công nợ phải trả"
        value={formatCurrency(metrics.payables)}
        subtitle="Đến 3 nhà cung cấp"
        icon={FileText}
        variant="danger"
      />
      <MetricCard
        title="Đơn đã thanh toán"
        value={metrics.paidOrders.toLocaleString('vi-VN')}
        subtitle="Trong tháng này"
        icon={CheckCircle}
        variant="success"
      />
      <MetricCard
        title="Đơn chưa thanh toán"
        value={metrics.unpaidOrders.toLocaleString('vi-VN')}
        subtitle="Cần xử lý"
        icon={AlertTriangle}
        variant="danger"
      />
    </div>
  )
}
