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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Search,
  Users,
  Building,
  AlertTriangle,
  Clock,
  CheckCircle,
  Bell,
  History,
  Filter,
} from 'lucide-react'
import { formatCurrency, formatDate, debts, getPaymentMethodLabel } from '@/lib/accounting-data'
import type { Debt, DebtStatus, DebtType } from '@/lib/accounting-types'

const statusColors: Record<DebtStatus, string> = {
  current: 'bg-success/10 text-success',
  overdue: 'bg-destructive/10 text-destructive',
  paid: 'bg-muted text-muted-foreground',
}

const statusLabels: Record<DebtStatus, string> = {
  current: 'Trong hạn',
  overdue: 'Quá hạn',
  paid: 'Đã thanh toán',
}

function PaymentHistoryModal({ debt }: { debt: Debt }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <History className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lịch sử thanh toán</DialogTitle>
          <DialogDescription>{debt.entityName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tổng nợ</p>
                <p className="font-medium">{formatCurrency(debt.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đã thanh toán</p>
                <p className="font-medium text-success">{formatCurrency(debt.paidAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Còn lại</p>
                <p className="font-medium text-destructive">{formatCurrency(debt.remainingAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hạn thanh toán</p>
                <p className="font-medium">{formatDate(debt.dueDate)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-sm">
                <span>Tiến độ thanh toán</span>
                <span>{Math.round((debt.paidAmount / debt.amount) * 100)}%</span>
              </div>
              <Progress value={(debt.paidAmount / debt.amount) * 100} className="h-2" />
            </div>
          </div>

          {debt.paymentHistory.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Lịch sử thanh toán</p>
              {debt.paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{formatCurrency(payment.amount)}</p>
                    <p className="text-sm text-muted-foreground">
                      {getPaymentMethodLabel(payment.method)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{formatDate(payment.paidAt)}</p>
                    {payment.note && (
                      <p className="text-xs text-muted-foreground">{payment.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Chưa có lịch sử thanh toán
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DebtTable({ debts, type }: { debts: Debt[]; type: DebtType }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredDebts = debts.filter((debt) => {
    const matchesSearch =
      debt.entityCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.entityName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || debt.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Tìm ${type === 'customer' ? 'khách hàng' : 'nhà cung cấp'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="current">Trong hạn</SelectItem>
            <SelectItem value="overdue">Quá hạn</SelectItem>
            <SelectItem value="paid">Đã thanh toán</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Tên {type === 'customer' ? 'khách hàng' : 'nhà cung cấp'}</TableHead>
              <TableHead className="text-right">Tổng nợ</TableHead>
              <TableHead className="text-right">Đã trả</TableHead>
              <TableHead className="text-right">Còn lại</TableHead>
              <TableHead>Hạn TT</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDebts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.entityCode}</TableCell>
                <TableCell>{debt.entityName}</TableCell>
                <TableCell className="text-right">{formatCurrency(debt.amount)}</TableCell>
                <TableCell className="text-right text-success">
                  {formatCurrency(debt.paidAmount)}
                </TableCell>
                <TableCell className="text-right font-medium text-destructive">
                  {formatCurrency(debt.remainingAmount)}
                </TableCell>
                <TableCell>{formatDate(debt.dueDate)}</TableCell>
                <TableCell>
                  <Badge className={statusColors[debt.status]} variant="secondary">
                    {debt.status === 'overdue' && (
                      <AlertTriangle className="mr-1 h-3 w-3" />
                    )}
                    {statusLabels[debt.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <PaymentHistoryModal debt={debt} />
                    {debt.status !== 'paid' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bell className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default function DebtsPage() {
  const customerDebts = debts.filter((d) => d.entityType === 'customer')
  const supplierDebts = debts.filter((d) => d.entityType === 'supplier')

  const stats = {
    totalReceivables: customerDebts.reduce((sum, d) => sum + d.remainingAmount, 0),
    totalPayables: supplierDebts.reduce((sum, d) => sum + d.remainingAmount, 0),
    overdueCustomers: customerDebts.filter((d) => d.status === 'overdue').length,
    overdueSuppliers: supplierDebts.filter((d) => d.status === 'overdue').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý công nợ</h1>
        <p className="text-muted-foreground">
          Theo dõi công nợ khách hàng và nhà cung cấp
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Công nợ phải thu</p>
              <p className="text-xl font-bold">{formatCurrency(stats.totalReceivables)}</p>
              <p className="text-xs text-muted-foreground">{customerDebts.length} khách hàng</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Công nợ phải trả</p>
              <p className="text-xl font-bold">{formatCurrency(stats.totalPayables)}</p>
              <p className="text-xs text-muted-foreground">{supplierDebts.length} nhà cung cấp</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">KH quá hạn</p>
              <p className="text-2xl font-bold text-destructive">{stats.overdueCustomers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <Clock className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">NCC quá hạn</p>
              <p className="text-2xl font-bold text-destructive">{stats.overdueSuppliers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customer" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customer" className="gap-2">
            <Users className="h-4 w-4" />
            Công nợ khách hàng ({customerDebts.length})
          </TabsTrigger>
          <TabsTrigger value="supplier" className="gap-2">
            <Building className="h-4 w-4" />
            Công nợ nhà cung cấp ({supplierDebts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Công nợ khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <DebtTable debts={customerDebts} type="customer" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Công nợ nhà cung cấp</CardTitle>
            </CardHeader>
            <CardContent>
              <DebtTable debts={supplierDebts} type="supplier" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
