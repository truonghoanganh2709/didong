import { InvoiceTable } from '@/components/accounting/invoice-table'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react'
import { invoices, formatCurrency } from '@/lib/accounting-data'

export default function InvoicesPage() {
  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'paid').length,
    unpaid: invoices.filter((i) => i.status === 'unpaid').length,
    cancelled: invoices.filter((i) => i.status === 'cancelled' || i.status === 'refunded').length,
    totalAmount: invoices.reduce((sum, i) => sum + i.total, 0),
    paidAmount: invoices
      .filter((i) => i.status === 'paid')
      .reduce((sum, i) => sum + i.total, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý hóa đơn</h1>
        <p className="text-muted-foreground">
          Xem và quản lý tất cả hóa đơn bán hàng
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng hóa đơn</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đã thanh toán</p>
              <p className="text-2xl font-bold">{stats.paid}</p>
              <p className="text-xs text-success">{formatCurrency(stats.paidAmount)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chưa thanh toán</p>
              <p className="text-2xl font-bold">{stats.unpaid}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-muted p-3">
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hủy/Hoàn tiền</p>
              <p className="text-2xl font-bold">{stats.cancelled}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <InvoiceTable />
    </div>
  )
}
