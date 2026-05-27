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
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertCircle,
  Eye,
} from 'lucide-react'
import { formatCurrency, formatDateTime, refundRequests, getPaymentMethodLabel } from '@/lib/accounting-data'
import type { RefundRequest, RefundStatus } from '@/lib/accounting-types'

const statusColors: Record<RefundStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
}

const statusLabels: Record<RefundStatus, string> = {
  pending: 'Chờ xử lý',
  approved: 'Đã duyệt',
  completed: 'Đã hoàn tiền',
  rejected: 'Từ chối',
}

function RefundDetailModal({ refund }: { refund: RefundRequest }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết yêu cầu hoàn tiền</DialogTitle>
          <DialogDescription>Đơn hàng: {refund.orderCode}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Khách hàng</p>
                <p className="font-medium">{refund.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">{refund.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tiền hoàn</p>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(refund.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phương thức hoàn</p>
                <p className="font-medium">{getPaymentMethodLabel(refund.refundMethod)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Lý do hoàn tiền</p>
                <p className="font-medium">{refund.reason}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ngày tạo</p>
                <p className="font-medium">{formatDateTime(refund.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge className={statusColors[refund.status]} variant="secondary">
                  {statusLabels[refund.status]}
                </Badge>
              </div>
              {refund.processedBy && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Người xử lý</p>
                    <p className="font-medium">{refund.processedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày xử lý</p>
                    <p className="font-medium">
                      {refund.processedAt ? formatDateTime(refund.processedAt) : '-'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProcessRefundModal({ refund }: { refund: RefundRequest }) {
  const [action, setAction] = useState<'approve' | 'reject'>('approve')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <CheckCircle className="mr-2 h-4 w-4" />
          Xử lý
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xử lý yêu cầu hoàn tiền</DialogTitle>
          <DialogDescription>
            Đơn hàng: {refund.orderCode} - Khách: {refund.customerName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Số tiền hoàn</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(refund.amount)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Phương thức</p>
                <p className="font-medium">{getPaymentMethodLabel(refund.refundMethod)}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Lý do</p>
              <p className="font-medium">{refund.reason}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quyết định</Label>
            <Select value={action} onValueChange={(v) => setAction(v as 'approve' | 'reject')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">Duyệt hoàn tiền</SelectItem>
                <SelectItem value="reject">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú xử lý</Label>
            <Textarea placeholder="Nhập ghi chú (nếu có)..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button variant={action === 'approve' ? 'default' : 'destructive'}>
            {action === 'approve' ? 'Duyệt hoàn tiền' : 'Từ chối'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function RefundsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredRefunds = refundRequests.filter((refund) => {
    const matchesSearch =
      refund.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === 'all' || refund.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    pending: refundRequests.filter((r) => r.status === 'pending').length,
    approved: refundRequests.filter((r) => r.status === 'approved').length,
    completed: refundRequests.filter((r) => r.status === 'completed').length,
    rejected: refundRequests.filter((r) => r.status === 'rejected').length,
    totalAmount: refundRequests
      .filter((r) => r.status === 'completed')
      .reduce((sum, r) => sum + r.amount, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hoàn tiền & Hủy đơn</h1>
        <p className="text-muted-foreground">
          Xử lý các yêu cầu hoàn tiền từ khách hàng
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chờ xử lý</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đã duyệt</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đã hoàn tiền</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Từ chối</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-muted p-3">
              <RotateCcw className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng đã hoàn</p>
              <p className="text-lg font-bold">{formatCurrency(stats.totalAmount)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách yêu cầu hoàn tiền</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm theo mã đơn, tên KH, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="completed">Đã hoàn tiền</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead>Lý do</TableHead>
                  <TableHead>PT hoàn</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">{refund.orderCode}</TableCell>
                    <TableCell>{refund.customerName}</TableCell>
                    <TableCell>{refund.customerPhone}</TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      {formatCurrency(refund.amount)}
                    </TableCell>
                    <TableCell className="max-w-32 truncate">{refund.reason}</TableCell>
                    <TableCell>{getPaymentMethodLabel(refund.refundMethod)}</TableCell>
                    <TableCell>{formatDateTime(refund.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[refund.status]} variant="secondary">
                        {statusLabels[refund.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <RefundDetailModal refund={refund} />
                        {refund.status === 'pending' && (
                          <ProcessRefundModal refund={refund} />
                        )}
                        {refund.status === 'approved' && (
                          <Button size="sm" variant="outline">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Hoàn tiền
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
