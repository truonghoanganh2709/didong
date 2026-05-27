import { PaymentTable } from '@/components/accounting/payment-table'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Clock, AlertTriangle, XCircle, Banknote, CreditCard, QrCode, Wallet, Truck } from 'lucide-react'
import { transactions, formatCurrency } from '@/lib/accounting-data'

export default function PaymentsPage() {
  const stats = {
    success: transactions.filter((t) => t.status === 'success').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    failed: transactions.filter((t) => t.status === 'failed').length,
    mismatch: transactions.filter((t) => t.status === 'mismatch').length,
    totalAmount: transactions
      .filter((t) => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0),
  }

  const methodStats = {
    cash: transactions.filter((t) => t.paymentMethod === 'cash').length,
    transfer: transactions.filter((t) => t.paymentMethod === 'transfer').length,
    qr_banking: transactions.filter((t) => t.paymentMethod === 'qr_banking').length,
    ewallet: transactions.filter((t) => t.paymentMethod === 'ewallet').length,
    cod: transactions.filter((t) => t.paymentMethod === 'cod').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý thanh toán</h1>
        <p className="text-muted-foreground">
          Theo dõi và xác nhận các giao dịch thanh toán
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Thành công</p>
              <p className="text-2xl font-bold">{stats.success}</p>
              <p className="text-xs text-success">{formatCurrency(stats.totalAmount)}</p>
            </div>
          </CardContent>
        </Card>

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
            <div className="rounded-lg bg-destructive/10 p-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lệch tiền</p>
              <p className="text-2xl font-bold text-destructive">{stats.mismatch}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-muted p-3">
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Thất bại</p>
              <p className="text-2xl font-bold">{stats.failed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Phân bổ theo phương thức</p>
          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Tiền mặt</p>
                <p className="font-semibold">{methodStats.cash}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Chuyển khoản</p>
                <p className="font-semibold">{methodStats.transfer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">QR Banking</p>
                <p className="font-semibold">{methodStats.qr_banking}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Ví điện tử</p>
                <p className="font-semibold">{methodStats.ewallet}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">COD</p>
                <p className="font-semibold">{methodStats.cod}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PaymentTable />
    </div>
  )
}
