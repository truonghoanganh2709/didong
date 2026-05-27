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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Search,
  FileText,
  Download,
  Printer,
  Eye,
  Filter,
  Calendar,
} from 'lucide-react'
import { formatCurrency, formatDateTime, invoices, getInvoiceStatusLabel } from '@/lib/accounting-data'
import type { Invoice, InvoiceStatus } from '@/lib/accounting-types'

const statusColors: Record<InvoiceStatus, string> = {
  paid: 'bg-success/10 text-success hover:bg-success/20',
  unpaid: 'bg-warning/10 text-warning hover:bg-warning/20',
  refunded: 'bg-primary/10 text-primary hover:bg-primary/20',
  cancelled: 'bg-muted text-muted-foreground hover:bg-muted',
}

function InvoiceDetailModal({ invoice }: { invoice: Invoice }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi tiết hóa đơn {invoice.invoiceCode}</DialogTitle>
          <DialogDescription>
            Đơn hàng: {invoice.orderCode}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Khách hàng</p>
              <p className="font-medium">{invoice.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số điện thoại</p>
              <p className="font-medium">{invoice.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ngày tạo</p>
              <p className="font-medium">{formatDateTime(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <Badge className={statusColors[invoice.status]} variant="secondary">
                {getInvoiceStatusLabel(invoice.status)}
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Sản phẩm</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead className="text-right">SL</TableHead>
                  <TableHead className="text-right">Đơn giá</TableHead>
                  <TableHead className="text-right">Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end border-t pt-4">
            <div className="space-y-2 text-right">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Tạm tính:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">VAT (10%):</span>
                <span>{formatCurrency(invoice.vat)}</span>
              </div>
              <div className="flex justify-between gap-8 text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-primary">{formatCurrency(invoice.total + invoice.vat)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              In hóa đơn
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function InvoiceTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold">Danh sách hóa đơn</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã hóa đơn, mã đơn, tên KH, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="paid">Đã thanh toán</SelectItem>
              <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
              <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Chọn ngày
          </Button>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hóa đơn</TableHead>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead className="text-right">VAT</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceCode}</TableCell>
                  <TableCell>{invoice.orderCode}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.customerPhone}</TableCell>
                  <TableCell>{formatDateTime(invoice.createdAt)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(invoice.vat)}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status]} variant="secondary">
                      {getInvoiceStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <InvoiceDetailModal invoice={invoice} />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Hiển thị {filteredInvoices.length} / {invoices.length} hóa đơn</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="outline" size="sm" disabled>
              Sau
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
