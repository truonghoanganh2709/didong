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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCcw,
  Truck,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import { formatCurrency, formatDateTime, transactions, getPaymentMethodLabel } from '@/lib/accounting-data'

const statusColors: Record<string, string> = {
  success: 'bg-success/10 text-success hover:bg-success/20',
  pending: 'bg-warning/10 text-warning hover:bg-warning/20',
  failed: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
  mismatch: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
}

// Mock online orders for reconciliation
const onlineOrders = [
  {
    id: '1',
    orderCode: 'DH-2024-005695',
    customerName: 'Nguyễn Văn A',
    amount: 25990000,
    paymentMethod: 'transfer',
    paymentStatus: 'confirmed',
    orderStatus: 'shipped',
    createdAt: new Date('2024-05-14T10:00:00'),
  },
  {
    id: '2',
    orderCode: 'DH-2024-005696',
    customerName: 'Trần Thị B',
    amount: 18490000,
    paymentMethod: 'cod',
    paymentStatus: 'pending_collection',
    orderStatus: 'delivered',
    createdAt: new Date('2024-05-14T11:00:00'),
  },
  {
    id: '3',
    orderCode: 'DH-2024-005697',
    customerName: 'Lê Văn C',
    amount: 32990000,
    paymentMethod: 'transfer',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    createdAt: new Date('2024-05-14T12:00:00'),
  },
  {
    id: '4',
    orderCode: 'DH-2024-005698',
    customerName: 'Phạm Thị D',
    amount: 15990000,
    paymentMethod: 'cod',
    paymentStatus: 'collected',
    orderStatus: 'delivered',
    createdAt: new Date('2024-05-14T13:00:00'),
  },
]

const paymentStatusLabels: Record<string, string> = {
  confirmed: 'Đã xác nhận',
  pending: 'Chờ xác nhận',
  pending_collection: 'Chờ thu hộ',
  collected: 'Đã thu hộ',
  refund_pending: 'Chờ hoàn tiền',
  refunded: 'Đã hoàn tiền',
}

const paymentStatusColors: Record<string, string> = {
  confirmed: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  pending_collection: 'bg-warning/10 text-warning',
  collected: 'bg-success/10 text-success',
  refund_pending: 'bg-primary/10 text-primary',
  refunded: 'bg-muted text-muted-foreground',
}

export default function ReconciliationPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const transferOrders = onlineOrders.filter((o) => o.paymentMethod === 'transfer')
  const codOrders = onlineOrders.filter((o) => o.paymentMethod === 'cod')

  const pendingTransfers = transferOrders.filter((o) => o.paymentStatus === 'pending')
  const pendingCOD = codOrders.filter((o) => o.paymentStatus === 'pending_collection')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Đối soát đơn hàng online</h1>
        <p className="text-muted-foreground">
          Kiểm tra và xác nhận trạng thái thanh toán đơn hàng online
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chờ xác nhận CK</p>
              <p className="text-2xl font-bold">{pendingTransfers.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Truck className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chờ thu hộ COD</p>
              <p className="text-2xl font-bold">{pendingCOD.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đã đối soát</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <RefreshCcw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yêu cầu hoàn tiền</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transfer" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transfer" className="gap-2">
            <ArrowDownLeft className="h-4 w-4" />
            Chuyển khoản
          </TabsTrigger>
          <TabsTrigger value="cod" className="gap-2">
            <Truck className="h-4 w-4" />
            COD
          </TabsTrigger>
          <TabsTrigger value="refund" className="gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Hoàn tiền
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đơn hàng chuyển khoản</CardTitle>
              <CardDescription>
                Xác nhận tiền đã về tài khoản và đổi trạng thái thanh toán
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo mã đơn hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn hàng</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead className="text-right">Số tiền</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái TT</TableHead>
                      <TableHead>Trạng thái đơn</TableHead>
                      <TableHead className="text-center">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderCode}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(order.amount)}
                        </TableCell>
                        <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                        <TableCell>
                          <Badge
                            className={paymentStatusColors[order.paymentStatus]}
                            variant="secondary"
                          >
                            {paymentStatusLabels[order.paymentStatus]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.orderStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            {order.paymentStatus === 'pending' && (
                              <Button size="sm">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Xác nhận
                              </Button>
                            )}
                            {order.paymentStatus === 'confirmed' && (
                              <span className="text-sm text-success">Đã xác nhận</span>
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
        </TabsContent>

        <TabsContent value="cod">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đơn hàng COD</CardTitle>
              <CardDescription>
                Theo dõi tiền thu hộ và xác nhận sau khi shipper nộp tiền
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn hàng</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead className="text-right">Số tiền</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái TT</TableHead>
                      <TableHead>Trạng thái đơn</TableHead>
                      <TableHead className="text-center">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {codOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderCode}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(order.amount)}
                        </TableCell>
                        <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                        <TableCell>
                          <Badge
                            className={paymentStatusColors[order.paymentStatus]}
                            variant="secondary"
                          >
                            {paymentStatusLabels[order.paymentStatus]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.orderStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            {order.paymentStatus === 'pending_collection' && (
                              <Button size="sm">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Xác nhận thu
                              </Button>
                            )}
                            {order.paymentStatus === 'collected' && (
                              <span className="text-sm text-success">Đã thu</span>
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
        </TabsContent>

        <TabsContent value="refund">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Yêu cầu hoàn tiền</CardTitle>
              <CardDescription>
                Tạo phiếu hoàn tiền và lưu lý do hoàn tiền
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <RefreshCcw className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chuyển sang trang Hoàn tiền để xử lý
                  </p>
                  <Button variant="link" className="mt-1">
                    Đi đến trang Hoàn tiền
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
