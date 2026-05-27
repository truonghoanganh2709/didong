'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import type { ChartData } from '@/lib/accounting-types'

interface RevenueChartProps {
  data: ChartData[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)}B`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`
    }
    return value.toString()
  }

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Biểu đồ doanh thu theo ngày</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.6 0.18 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.6 0.18 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.17 0 0)',
                  border: '1px solid oklch(0.25 0 0)',
                  borderRadius: '8px',
                  color: 'oklch(0.95 0 0)',
                }}
                formatter={(value: number) => [formatTooltip(value), 'Doanh thu']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.6 0.18 145)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface ExpenseChartProps {
  data: { category: string; amount: number; percentage: number }[]
}

const COLORS = [
  'oklch(0.5 0.2 25)',
  'oklch(0.6 0.18 145)',
  'oklch(0.55 0.15 250)',
  'oklch(0.75 0.15 70)',
  'oklch(0.65 0.12 300)',
  'oklch(0.5 0 0)',
]

export function ExpenseChart({ data }: ExpenseChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`
    }
    return value.toString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Chi phí theo loại</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
                nameKey="category"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.17 0 0)',
                  border: '1px solid oklch(0.25 0 0)',
                  borderRadius: '8px',
                  color: 'oklch(0.95 0 0)',
                }}
                formatter={(value: number) => [formatValue(value), 'Số tiền']}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span style={{ color: 'oklch(0.7 0 0)', fontSize: '12px' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProfitChartProps {
  data: ChartData[]
}

export function ProfitChart({ data }: ProfitChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)}B`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`
    }
    return value.toString()
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Doanh thu vs Chi phí vs Lợi nhuận</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.17 0 0)',
                  border: '1px solid oklch(0.25 0 0)',
                  borderRadius: '8px',
                  color: 'oklch(0.95 0 0)',
                }}
                formatter={(value: number) => [
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0,
                  }).format(value),
                ]}
              />
              <Legend />
              <Bar dataKey="revenue" name="Doanh thu" fill="oklch(0.6 0.18 145)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Chi phí" fill="oklch(0.5 0.2 25)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Lợi nhuận" fill="oklch(0.55 0.15 250)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
