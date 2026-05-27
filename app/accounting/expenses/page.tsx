'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Search,
  Plus,
  Filter,
  Pencil,
  Trash2,
  Package,
  Truck,
  Megaphone,
  Users,
  Building,
  Wrench,
  Zap,
  MoreHorizontal,
} from 'lucide-react'
import { formatCurrency, formatDateTime, expenses, expensesByCategory, getExpenseCategoryLabel } from '@/lib/accounting-data'
import type { Expense, ExpenseCategory } from '@/lib/accounting-types'

const categoryIcons: Record<ExpenseCategory, React.ElementType> = {
  inventory: Package,
  shipping: Truck,
  marketing: Megaphone,
  salary: Users,
  rent: Building,
  warranty: Wrench,
  utilities: Zap,
  other: MoreHorizontal,
}

const COLORS = [
  'oklch(0.5 0.2 25)',
  'oklch(0.6 0.18 145)',
  'oklch(0.55 0.15 250)',
  'oklch(0.75 0.15 70)',
  'oklch(0.65 0.12 300)',
  'oklch(0.5 0 0)',
]

function AddExpenseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm chi phí
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm khoản chi phí mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin chi phí cần ghi nhận
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Loại chi phí</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại chi phí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inventory">Nhập hàng</SelectItem>
                <SelectItem value="shipping">Vận chuyển</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="salary">Lương nhân viên</SelectItem>
                <SelectItem value="rent">Mặt bằng</SelectItem>
                <SelectItem value="warranty">Bảo hành</SelectItem>
                <SelectItem value="utilities">Điện nước</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mô tả</Label>
            <Textarea placeholder="Mô tả chi tiết khoản chi..." />
          </div>

          <div className="space-y-2">
            <Label>Số tiền</Label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Input placeholder="Ghi chú thêm (nếu có)" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button>Lưu chi phí</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const chartData = expensesByCategory.map((item) => ({
    name: item.category,
    value: item.amount,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý chi phí</h1>
          <p className="text-muted-foreground">
            Theo dõi và phân loại các khoản chi phí
          </p>
        </div>
        <AddExpenseModal />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Tổng quan chi phí tháng này</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {expensesByCategory.slice(0, 4).map((item, index) => {
                const Icon = categoryIcons[item.category.toLowerCase() as ExpenseCategory] || MoreHorizontal
                return (
                  <div key={item.category} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-lg p-2"
                        style={{ backgroundColor: `${COLORS[index]}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: COLORS[index] }} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-lg font-bold">{formatCurrency(item.amount)}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage}% tổng chi</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Phân bổ chi phí</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
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
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Tổng chi phí</p>
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách chi phí</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm chi phí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Loại chi phí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="inventory">Nhập hàng</SelectItem>
                <SelectItem value="shipping">Vận chuyển</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="salary">Lương nhân viên</SelectItem>
                <SelectItem value="rent">Mặt bằng</SelectItem>
                <SelectItem value="warranty">Bảo hành</SelectItem>
                <SelectItem value="utilities">Điện nước</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Người tạo</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => {
                  const Icon = categoryIcons[expense.category]
                  return (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">
                            {getExpenseCategoryLabel(expense.category)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-64">
                        <p className="truncate">{expense.description}</p>
                      </TableCell>
                      <TableCell className="text-right font-medium text-destructive">
                        -{formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>{formatDateTime(expense.createdAt)}</TableCell>
                      <TableCell>{expense.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
