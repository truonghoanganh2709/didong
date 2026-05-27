'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDateTime, invoices, transactions } from '@/lib/accounting-data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const statusColors = {
  paid: 'bg-success/10 text-success hover:bg-success/20',
  unpaid: 'bg-warning/10 text-warning hover:bg-warning/20',
  refunded: 'bg-primary/10 text-primary hover:bg-primary/20',
  cancelled: 'bg-muted text-muted-foreground hover:bg-muted',
  success: 'bg-success/10 text-success hover:bg-success/20',
  pending: 'bg-warning/10 text-warning hover:bg-warning/20',
  failed: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
  mismatch: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
}

const statusLabels = {
  paid: 'Đã thanh toán',
  unpaid: 'Chưa thanh toán',
  refunded: 'Hoàn tiền',
  cancelled: 'Đã hủy',
  success: 'Thành công',
  pending: 'Chờ xử lý',
  failed: 'Thất bại',
  mismatch: 'Lệch tiền',
}

export function RecentInvoices() {
  const recentInvoices = invoices.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Hóa đơn gần đây</CardTitle>
        <Link href="/accounting/invoices">
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{invoice.invoiceCode}</span>
                  <Badge className={statusColors[invoice.status]} variant="secondary">
                    {statusLabels[invoice.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {invoice.customerName} - {invoice.customerPhone}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(invoice.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(invoice.total)}</p>
                <p className="text-xs text-muted-foreground">VAT: {formatCurrency(invoice.vat)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentTransactions() {
  const recentTransactions = transactions.slice(0, 5)

  const paymentMethodLabels: Record<string, string> = {
    cash: 'Tiền mặt',
    transfer: 'Chuyển khoản',
    qr_banking: 'QR Banking',
    ewallet: 'Ví điện tử',
    cod: 'COD',
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Giao dịch gần đây</CardTitle>
        <Link href="/accounting/payments">
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{transaction.orderCode}</span>
                  <Badge className={statusColors[transaction.status]} variant="secondary">
                    {statusLabels[transaction.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {paymentMethodLabels[transaction.paymentMethod]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                {transaction.confirmedBy && (
                  <p className="text-xs text-muted-foreground">
                    Xác nhận: {transaction.confirmedBy}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
