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
import { transferOrders, warehouses, products, formatDate } from "@/lib/warehouse-data"
import {
  Plus,
  Search,
  Truck,
  Eye,
  MoreHorizontal,
  Trash2,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function TransferPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof transferOrders[0] | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    sourceWarehouse: "",
    destWarehouse: "",
    note: "",
    products: [] as { productId: string; imei: string; quantity: number }[]
  })

  const [newProduct, setNewProduct] = useState({
    productId: "",
    quantity: 1
  })

  const filteredOrders = transferOrders.filter((order) => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sourceWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.destWarehouse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddProduct = () => {
    if (newProduct.productId && newProduct.quantity > 0) {
      const product = products.find(p => p.id === newProduct.productId)
      if (product) {
        setFormData(prev => ({
          ...prev,
          products: [...prev.products, {
            productId: newProduct.productId,
            imei: product.imei,
            quantity: newProduct.quantity
          }]
        }))
        setNewProduct({ productId: "", quantity: 1 })
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
    toast.success("Tạo phiếu chuyển kho thành công", {
      description: "Phiếu chuyển kho CK-2024-000348 đã được tạo"
    })
    setIsCreateOpen(false)
    setFormData({ sourceWarehouse: "", destWarehouse: "", note: "", products: [] })
  }

  const handleConfirmReceived = (orderId: string) => {
    toast.success("Xác nhận nhận hàng thành công", {
      description: "Hàng đã được nhập vào kho đích"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chuyển kho</h1>
          <p className="text-muted-foreground">Quản lý chuyển hàng giữa các chi nhánh</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo phiếu chuyển
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Tạo phiếu chuyển kho mới</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 p-1">
                {/* Warehouse Selection */}
                <div className="grid gap-4 md:grid-cols-3 items-end">
                  <div className="space-y-2">
                    <Label>Kho nguồn *</Label>
                    <Select
                      value={formData.sourceWarehouse}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, sourceWarehouse: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kho nguồn" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.map((wh) => (
                          <SelectItem key={wh.id} value={wh.name}>
                            {wh.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kho đích *</Label>
                    <Select
                      value={formData.destWarehouse}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, destWarehouse: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kho đích" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses
                          .filter(wh => wh.name !== formData.sourceWarehouse)
                          .map((wh) => (
                            <SelectItem key={wh.id} value={wh.name}>
                              {wh.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Add Product */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Thêm sản phẩm chuyển</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <Select
                        value={newProduct.productId}
                        onValueChange={(value) => setNewProduct(prev => ({ ...prev, productId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.filter(p => p.quantity > 0).map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} (Tồn: {product.quantity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="SL"
                        min={1}
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      />
                      <Button type="button" onClick={handleAddProduct}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product List */}
                {formData.products.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Danh sách sản phẩm chuyển</Label>
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sản phẩm</TableHead>
                            <TableHead>IMEI</TableHead>
                            <TableHead className="text-center">Số lượng</TableHead>
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
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea
                    placeholder="Nhập ghi chú cho phiếu chuyển kho..."
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button onClick={handleCreateOrder}>Tạo phiếu chuyển</Button>
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
                  placeholder="Tìm mã phiếu, kho..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ chuyển</SelectItem>
                <SelectItem value="in_transit">Đang vận chuyển</SelectItem>
                <SelectItem value="received">Đã nhận</SelectItem>
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
            <Truck className="h-5 w-5" />
            Danh sách phiếu chuyển kho ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Kho nguồn</TableHead>
                <TableHead>Kho đích</TableHead>
                <TableHead className="text-center">Số SP</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Người nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono font-medium text-primary">{order.code}</TableCell>
                  <TableCell>{order.sourceWarehouse}</TableCell>
                  <TableCell>{order.destWarehouse}</TableCell>
                  <TableCell className="text-center">{order.products.length}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.createdBy}</TableCell>
                  <TableCell>{order.receiver || "-"}</TableCell>
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
                        {order.status === "in_transit" && (
                          <DropdownMenuItem onClick={() => handleConfirmReceived(order.id)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Xác nhận nhận hàng
                          </DropdownMenuItem>
                        )}
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
            <DialogTitle>Chi tiết phiếu chuyển kho {selectedOrder?.code}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 py-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Kho nguồn</p>
                  <p className="font-medium">{selectedOrder.sourceWarehouse}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Kho đích</p>
                  <p className="font-medium">{selectedOrder.destWarehouse}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-muted-foreground">Ngày tạo</Label>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Người tạo</Label>
                  <p className="font-medium">{selectedOrder.createdBy}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Người nhận</Label>
                  <p className="font-medium">{selectedOrder.receiver || "-"}</p>
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
                <Label className="text-base font-medium">Danh sách sản phẩm chuyển</Label>
                <div className="rounded-lg border mt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>IMEI</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
                          <TableCell className="font-mono text-sm">{item.imei}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {selectedOrder.status === "in_transit" && (
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={() => handleConfirmReceived(selectedOrder.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Xác nhận nhận hàng
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
