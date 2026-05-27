"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/warehouse/status-badge"
import { exportOrders, products, formatCurrency, formatDate } from "@/lib/warehouse-data"
import {
  Plus,
  Search,
  PackageMinus,
  Eye,
  Printer,
  MoreHorizontal,
  Trash2,
  Barcode
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function ExportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof exportOrders[0] | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    type: "online" as "online" | "store" | "warranty",
    receiver: "",
    note: "",
    products: [] as { productId: string; imei: string; quantity: number; salePrice: number }[]
  })

  const [barcodeInput, setBarcodeInput] = useState("")

  const filteredOrders = exportOrders.filter((order) => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleScanBarcode = () => {
    if (barcodeInput) {
      const product = products.find(p => p.imei === barcodeInput || p.code === barcodeInput)
      if (product) {
        setFormData(prev => ({
          ...prev,
          products: [...prev.products, {
            productId: product.id,
            imei: product.imei,
            quantity: 1,
            salePrice: formData.type === "warranty" ? 0 : product.salePrice
          }]
        }))
        setBarcodeInput("")
        toast.success("Đã thêm sản phẩm", { description: product.name })
      } else {
        toast.error("Không tìm thấy sản phẩm", { description: "Vui lòng kiểm tra lại IMEI/mã sản phẩm" })
      }
    }
  }

  const handleRemoveProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }))
  }

  const handleCreateOrder = () => {
    toast.success("Tạo phiếu xuất thành công", {
      description: "Phiếu xuất PX-2024-002148 đã được tạo"
    })
    setIsCreateOpen(false)
    setFormData({ type: "online", receiver: "", note: "", products: [] })
  }

  const handlePrint = (orderId: string) => {
    toast.info("Đang chuẩn bị in...", {
      description: "Phiếu xuất sẽ được in trong giây lát"
    })
  }

  const totalFormAmount = formData.products.reduce(
    (sum, p) => sum + p.quantity * p.salePrice, 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Xuất hàng</h1>
          <p className="text-muted-foreground">Quản lý phiếu xuất và xuất hàng khỏi kho</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo phiếu xuất
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Tạo phiếu xuất hàng mới</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 p-1">
                {/* Export Type */}
                <Tabs value={formData.type} onValueChange={(v) => setFormData(prev => ({ ...prev, type: v as typeof formData.type }))}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="online">Đơn hàng online</TabsTrigger>
                    <TabsTrigger value="store">Cửa hàng</TabsTrigger>
                    <TabsTrigger value="warranty">Bảo hành</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Người nhận *</Label>
                    <Input
                      placeholder={
                        formData.type === "online" ? "Tên khách hàng / Mã đơn hàng" :
                        formData.type === "store" ? "Tên cửa hàng" : "Trung tâm bảo hành"
                      }
                      value={formData.receiver}
                      onChange={(e) => setFormData(prev => ({ ...prev, receiver: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày xuất</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <Separator />

                {/* Barcode Scanner */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Quét barcode / IMEI</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Quét hoặc nhập IMEI/mã sản phẩm..."
                        className="pl-10"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleScanBarcode()}
                      />
                    </div>
                    <Button onClick={handleScanBarcode}>Thêm</Button>
                  </div>
                </div>

                {/* Product List */}
                {formData.products.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Danh sách sản phẩm xuất</Label>
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sản phẩm</TableHead>
                            <TableHead>IMEI</TableHead>
                            <TableHead className="text-center">SL</TableHead>
                            <TableHead className="text-right">Đơn giá</TableHead>
                            <TableHead className="text-right">Thành tiền</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.products.map((item, index) => {
                            const product = products.find(p => p.id === item.productId)
                            return (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{product?.name}</TableCell>
                                <TableCell className="font-mono text-sm">{item.imei}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.salePrice)}</TableCell>
                                <TableCell className="text-right font-medium">
                                  {formatCurrency(item.quantity * item.salePrice)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveProduct(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Tổng tiền</p>
                        <p className="text-xl font-bold text-primary">{formatCurrency(totalFormAmount)}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea
                    placeholder="Nhập ghi chú cho phiếu xuất..."
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button onClick={handleCreateOrder}>Tạo phiếu xuất</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm mã phiếu, người nhận..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Loại xuất" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="online">Đơn online</SelectItem>
                <SelectItem value="store">Cửa hàng</SelectItem>
                <SelectItem value="warranty">Bảo hành</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xuất</SelectItem>
                <SelectItem value="completed">Đã xuất</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <PackageMinus className="h-5 w-5" />
            Danh sách phiếu xuất ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Người nhận</TableHead>
                <TableHead className="text-center">Số SP</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono font-medium text-primary">{order.code}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.type} />
                  </TableCell>
                  <TableCell>{order.receiver}</TableCell>
                  <TableCell className="text-center">{order.products.length}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.totalAmount)}
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.createdBy}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePrint(order.id)}>
                          <Printer className="mr-2 h-4 w-4" />
                          In phiếu xuất
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết phiếu xuất {selectedOrder?.code}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-muted-foreground">Loại xuất</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedOrder.type} />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Người nhận</Label>
                  <p className="font-medium">{selectedOrder.receiver}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ngày tạo</Label>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base font-medium">Danh sách sản phẩm</Label>
                <div className="rounded-lg border mt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>IMEI</TableHead>
                        <TableHead className="text-center">SL</TableHead>
                        <TableHead className="text-right">Đơn giá</TableHead>
                        <TableHead className="text-right">Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
                          <TableCell className="font-mono text-sm">{item.imei}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.salePrice)}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.quantity * item.salePrice)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Người tạo: {selectedOrder.createdBy}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tổng tiền</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(selectedOrder.totalAmount)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
