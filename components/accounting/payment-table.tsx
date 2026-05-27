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
  CheckCircle,
  Upload,
  AlertTriangle,
  Filter,
  Banknote,
  CreditCard,
  QrCode,
  Wallet,
  Truck,
} from 'lucide-react'
import { formatCurrency, formatDateTime, transactions, getPaymentMethodLabel } from '@/lib/accounting-data'
import type { Transaction } from '@/lib/accounting-types'

const statusColors: Record<string, string> = {
  success: 'bg-success/10 text-success hover:bg-success/20',
  pending: 'bg-warning/10 text-warning hover:bg-warning/20',
  failed: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
  mismatch: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
}

const statusLabels: Record<string, string> = {
  success: 'Thành công',
  pending: 'Chờ xử lý',
  failed: 'Thất bại',
  mismatch: 'Lệch tiền',
}

const methodIcons: Record<string, React.ElementType> = {
  cash: Banknote,
  transfer: CreditCard,
  qr_banking: QrCode,
  ewallet: Wallet,
  cod: Truck,
}

function ConfirmPaymentModal({ transaction }: { transaction: Transaction }) {
  const [note, setNote] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <CheckCircle className="mr-2 h-4 w-4" />
          Xác nhận
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận thanh toán</DialogTitle>
          <DialogDescription>
            Xác nhận giao dịch {transaction.orderCode}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
                <p className="font-medium">{transaction.orderCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số tiền</p>
                <p className="font-medium text-primary">{formatCurrency(transaction.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phương thức</p>
                <p className="font-medium">{getPaymentMethodLabel(transaction.paymentMethod)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Thời gian</p>
                <p className="font-medium">{formatDateTime(transaction.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              placeholder="Nhập ghi chú xác nhận..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Bằng chứng chuyển khoản (tùy chọn)</Label>
            <div className="flex items-center gap-2">
              <Input type="file" accept="image/*" />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button>Xác nhận thanh toán</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function PaymentTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.orderCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter

    return matchesSearch && matchesStatus && matchesMethod
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Danh sách giao dịch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã đơn hàng..."
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
              <SelectItem value="success">Thành công</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="failed">Thất bại</SelectItem>
              <SelectItem value="mismatch">Lệch tiền</SelectItem>
            </SelectContent>
          </Select>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-44">
              <CreditCard className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Phương thức" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả PT</SelectItem>
              <SelectItem value="cash">Tiền mặt</SelectItem>
              <SelectItem value="transfer">Chuyển khoản</SelectItem>
              <SelectItem value="qr_banking">QR Banking</SelectItem>
              <SelectItem value="ewallet">Ví điện tử</SelectItem>
              <SelectItem value="cod">COD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Xác nhận bởi</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const MethodIcon = methodIcons[transaction.paymentMethod]
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.orderCode}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MethodIcon className="h-4 w-4 text-muted-foreground" />
                        {getPaymentMethodLabel(transaction.paymentMethod)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[transaction.status]} variant="secondary">
                        {transaction.status === 'mismatch' && (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {statusLabels[transaction.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.confirmedBy || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-32 truncate">
                      {transaction.note || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {transaction.status === 'pending' && (
                          <ConfirmPaymentModal transaction={transaction} />
                        )}
                        {transaction.status === 'mismatch' && (
                          <Button size="sm" variant="destructive">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Xử lý
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Hiển thị {filteredTransactions.length} / {transactions.length} giao dịch
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
