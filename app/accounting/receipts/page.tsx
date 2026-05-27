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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Search,
  Plus,
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
} from 'lucide-react'
import { formatCurrency, formatDateTime, receipts } from '@/lib/accounting-data'
import type { Receipt, ReceiptType, ReceiptStatus } from '@/lib/accounting-types'

const statusColors: Record<ReceiptStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
}

const statusLabels: Record<ReceiptStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
}

function CreateReceiptModal({ type }: { type: ReceiptType }) {
  const isIncome = type === 'income'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isIncome ? 'default' : 'outline'}>
          <Plus className="mr-2 h-4 w-4" />
          {isIncome ? 'Tạo phiếu thu' : 'Tạo phiếu chi'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo {isIncome ? 'phiếu thu' : 'phiếu chi'} mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin {isIncome ? 'khoản thu' : 'khoản chi'} cần ghi nhận
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Số tiền</Label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <Label>Lý do {isIncome ? 'thu' : 'chi'}</Label>
            <Textarea placeholder={`Lý do ${isIncome ? 'thu' : 'chi'} tiền...`} />
          </div>

          <div className="space-y-2">
            <Label>Phương thức</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn phương thức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tiền mặt</SelectItem>
                <SelectItem value="transfer">Chuyển khoản</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Input placeholder="Ghi chú thêm (nếu có)" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button>Tạo phiếu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReceiptDetailModal({ receipt }: { receipt: Receipt }) {
  const isIncome = receipt.type === 'income'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết phiếu {receipt.receiptCode}</DialogTitle>
          <DialogDescription>
            {isIncome ? 'Phiếu thu' : 'Phiếu chi'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mã phiếu</p>
                <p className="font-medium">{receipt.receiptCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Loại</p>
                <Badge variant={isIncome ? 'default' : 'secondary'}>
                  {isIncome ? 'Phiếu thu' : 'Phiếu chi'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tiền</p>
                <p className={`text-lg font-bold ${isIncome ? 'text-success' : 'text-destructive'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(receipt.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge className={statusColors[receipt.status]} variant="secondary">
                  {statusLabels[receipt.status]}
                </Badge>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Lý do</p>
                <p className="font-medium">{receipt.reason}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Người tạo</p>
                <p className="font-medium">{receipt.createdBy}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ngày tạo</p>
                <p className="font-medium">{formatDateTime(receipt.createdAt)}</p>
              </div>
              {receipt.approvedBy && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Người duyệt</p>
                    <p className="font-medium">{receipt.approvedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày duyệt</p>
                    <p className="font-medium">
                      {receipt.approvedAt ? formatDateTime(receipt.approvedAt) : '-'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {receipt.status === 'pending' && (
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <XCircle className="mr-2 h-4 w-4" />
                Từ chối
              </Button>
              <Button>
                <CheckCircle className="mr-2 h-4 w-4" />
                Duyệt phiếu
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ReceiptTable({ receipts, type }: { receipts: Receipt[]; type: ReceiptType }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.receiptCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const isIncome = type === 'income'

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã phiếu, lý do..."
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
            <SelectItem value="pending">Chờ duyệt</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
        <CreateReceiptModal type={type} />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã phiếu</TableHead>
              <TableHead className="text-right">Số tiền</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Người tạo</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Người duyệt</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="font-medium">{receipt.receiptCode}</TableCell>
                <TableCell className={`text-right font-medium ${isIncome ? 'text-success' : 'text-destructive'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(receipt.amount)}
                </TableCell>
                <TableCell className="max-w-48 truncate">{receipt.reason}</TableCell>
                <TableCell>{receipt.createdBy}</TableCell>
                <TableCell>{formatDateTime(receipt.createdAt)}</TableCell>
                <TableCell>{receipt.approvedBy || '-'}</TableCell>
                <TableCell>
                  <Badge className={statusColors[receipt.status]} variant="secondary">
                    {statusLabels[receipt.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <ReceiptDetailModal receipt={receipt} />
                    {receipt.status === 'pending' && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
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

export default function ReceiptsPage() {
  const incomeReceipts = receipts.filter((r) => r.type === 'income')
  const expenseReceipts = receipts.filter((r) => r.type === 'expense')

  const stats = {
    totalIncome: incomeReceipts
      .filter((r) => r.status === 'approved')
      .reduce((sum, r) => sum + r.amount, 0),
    totalExpense: expenseReceipts
      .filter((r) => r.status === 'approved')
      .reduce((sum, r) => sum + r.amount, 0),
    pendingCount: receipts.filter((r) => r.status === 'pending').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý phiếu thu/chi</h1>
        <p className="text-muted-foreground">
          Tạo và quản lý các phiếu thu chi trong hệ thống
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <ArrowDownCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng thu</p>
              <p className="text-xl font-bold text-success">
                +{formatCurrency(stats.totalIncome)}
              </p>
              <p className="text-xs text-muted-foreground">{incomeReceipts.length} phiếu</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <ArrowUpCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng chi</p>
              <p className="text-xl font-bold text-destructive">
                -{formatCurrency(stats.totalExpense)}
              </p>
              <p className="text-xs text-muted-foreground">{expenseReceipts.length} phiếu</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chờ duyệt</p>
              <p className="text-2xl font-bold">{stats.pendingCount}</p>
              <p className="text-xs text-muted-foreground">phiếu</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList>
          <TabsTrigger value="income" className="gap-2">
            <ArrowDownCircle className="h-4 w-4" />
            Phiếu thu ({incomeReceipts.length})
          </TabsTrigger>
          <TabsTrigger value="expense" className="gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            Phiếu chi ({expenseReceipts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Danh sách phiếu thu</CardTitle>
            </CardHeader>
            <CardContent>
              <ReceiptTable receipts={incomeReceipts} type="income" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expense">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Danh sách phiếu chi</CardTitle>
            </CardHeader>
            <CardContent>
              <ReceiptTable receipts={expenseReceipts} type="expense" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
