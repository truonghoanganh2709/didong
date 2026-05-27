'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Download,
  Printer,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Users,
  FileText,
} from 'lucide-react'
import { formatCurrency, revenueChartData, expensesByCategory, debts } from '@/lib/accounting-data'

const COLORS = [
  'oklch(0.5 0.2 25)',
  'oklch(0.6 0.18 145)',
  'oklch(0.55 0.15 250)',
  'oklch(0.75 0.15 70)',
  'oklch(0.65 0.12 300)',
]

// Mock monthly data
const monthlyData = [
  { month: 'T1', revenue: 7500000000, expenses: 5200000000, profit: 2300000000 },
  { month: 'T2', revenue: 6800000000, expenses: 4800000000, profit: 2000000000 },
  { month: 'T3', revenue: 8200000000, expenses: 5600000000, profit: 2600000000 },
  { month: 'T4', revenue: 7900000000, expenses: 5400000000, profit: 2500000000 },
  { month: 'T5', revenue: 8547230000, expenses: 5800000000, profit: 2747230000 },
]

const vatData = [
  { month: 'T1', vatIn: 520000000, vatOut: 750000000, vatPayable: 230000000 },
  { month: 'T2', vatIn: 480000000, vatOut: 680000000, vatPayable: 200000000 },
  { month: 'T3', vatIn: 560000000, vatOut: 820000000, vatPayable: 260000000 },
  { month: 'T4', vatIn: 540000000, vatOut: 790000000, vatPayable: 250000000 },
  { month: 'T5', vatIn: 580000000, vatOut: 854723000, vatPayable: 274723000 },
]

const cashFlowData = [
  { date: '01/05', inflow: 450000000, outflow: 280000000 },
  { date: '02/05', inflow: 520000000, outflow: 350000000 },
  { date: '03/05', inflow: 380000000, outflow: 420000000 },
  { date: '04/05', inflow: 620000000, outflow: 380000000 },
  { date: '05/05', inflow: 480000000, outflow: 310000000 },
  { date: '06/05', inflow: 550000000, outflow: 420000000 },
  { date: '07/05', inflow: 680000000, outflow: 450000000 },
]

function formatYAxis(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`
  }
  return value.toString()
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('month')

  const customerDebts = debts.filter((d) => d.entityType === 'customer')
  const supplierDebts = debts.filter((d) => d.entityType === 'supplier')
  const totalReceivables = customerDebts.reduce((sum, d) => sum + d.remainingAmount, 0)
  const totalPayables = supplierDebts.reduce((sum, d) => sum + d.remainingAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Báo cáo tài chính</h1>
          <p className="text-muted-foreground">
            Tổng hợp báo cáo tài chính theo kỳ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Theo ngày</SelectItem>
              <SelectItem value="month">Theo tháng</SelectItem>
              <SelectItem value="quarter">Theo quý</SelectItem>
              <SelectItem value="year">Theo năm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất PDF
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            In báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Doanh thu tháng 5</p>
              <p className="text-xl font-bold">{formatCurrency(8547230000)}</p>
              <p className="text-xs text-success">+8.2% so với tháng trước</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chi phí tháng 5</p>
              <p className="text-xl font-bold">{formatCurrency(5800000000)}</p>
              <p className="text-xs text-destructive">+7.4% so với tháng trước</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lợi nhuận tháng 5</p>
              <p className="text-xl font-bold">{formatCurrency(2747230000)}</p>
              <p className="text-xs text-success">+9.9% so với tháng trước</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Wallet className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VAT phải nộp</p>
              <p className="text-xl font-bold">{formatCurrency(274723000)}</p>
              <p className="text-xs text-muted-foreground">Tháng 5/2024</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="profit">Lợi nhuận</TabsTrigger>
          <TabsTrigger value="cashflow">Dòng tiền</TabsTrigger>
          <TabsTrigger value="debt">Công nợ</TabsTrigger>
          <TabsTrigger value="vat">Thuế VAT</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Báo cáo doanh thu</CardTitle>
              <CardDescription>Doanh thu theo tháng năm 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.17 0 0)',
                        border: '1px solid oklch(0.25 0 0)',
                        borderRadius: '8px',
                        color: 'oklch(0.95 0 0)',
                      }}
                      formatter={(value: number) => [formatCurrency(value)]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu" fill="oklch(0.6 0.18 145)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Báo cáo lợi nhuận</CardTitle>
              <CardDescription>So sánh doanh thu - chi phí - lợi nhuận</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.17 0 0)',
                        border: '1px solid oklch(0.25 0 0)',
                        borderRadius: '8px',
                        color: 'oklch(0.95 0 0)',
                      }}
                      formatter={(value: number) => [formatCurrency(value)]}
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
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Báo cáo dòng tiền</CardTitle>
              <CardDescription>Tiền vào - tiền ra theo ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <defs>
                      <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.6 0.18 145)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.6 0.18 145)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.5 0.2 25)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.5 0.2 25)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.17 0 0)',
                        border: '1px solid oklch(0.25 0 0)',
                        borderRadius: '8px',
                        color: 'oklch(0.95 0 0)',
                      }}
                      formatter={(value: number) => [formatCurrency(value)]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="inflow"
                      name="Tiền vào"
                      stroke="oklch(0.6 0.18 145)"
                      fillOpacity={1}
                      fill="url(#colorInflow)"
                    />
                    <Area
                      type="monotone"
                      dataKey="outflow"
                      name="Tiền ra"
                      stroke="oklch(0.5 0.2 25)"
                      fillOpacity={1}
                      fill="url(#colorOutflow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debt" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Công nợ phải thu</CardTitle>
                <CardDescription>Từ khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-warning/10 p-2">
                        <Users className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium">Tổng phải thu</p>
                        <p className="text-sm text-muted-foreground">{customerDebts.length} khách hàng</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-warning">{formatCurrency(totalReceivables)}</p>
                  </div>
                  {customerDebts.map((debt) => (
                    <div key={debt.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{debt.entityName}</p>
                        <p className="text-xs text-muted-foreground">{debt.entityCode}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(debt.remainingAmount)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Công nợ phải trả</CardTitle>
                <CardDescription>Cho nhà cung cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-destructive/10 p-2">
                        <FileText className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium">Tổng phải trả</p>
                        <p className="text-sm text-muted-foreground">{supplierDebts.length} nhà cung cấp</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-destructive">{formatCurrency(totalPayables)}</p>
                  </div>
                  {supplierDebts.map((debt) => (
                    <div key={debt.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{debt.entityName}</p>
                        <p className="text-xs text-muted-foreground">{debt.entityCode}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(debt.remainingAmount)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Báo cáo thuế VAT</CardTitle>
              <CardDescription>VAT đầu vào - đầu ra - phải nộp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vatData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: 'oklch(0.5 0 0)', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.17 0 0)',
                        border: '1px solid oklch(0.25 0 0)',
                        borderRadius: '8px',
                        color: 'oklch(0.95 0 0)',
                      }}
                      formatter={(value: number) => [formatCurrency(value)]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="vatIn"
                      name="VAT đầu vào"
                      stroke="oklch(0.55 0.15 250)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="vatOut"
                      name="VAT đầu ra"
                      stroke="oklch(0.6 0.18 145)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="vatPayable"
                      name="VAT phải nộp"
                      stroke="oklch(0.5 0.2 25)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
