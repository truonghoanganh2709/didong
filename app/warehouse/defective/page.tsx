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
import { defectiveProducts, formatDate } from "@/lib/warehouse-data"
import {
  Plus,
  Search,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  Wrench,
  RotateCcw,
  CheckCircle2,
  Phone,
  User
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
import { Badge } from "@/components/ui/badge"

export default function DefectivePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof defectiveProducts[0] | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    productCode: "",
    imei: "",
    defectType: "",
    customerName: "",
    customerPhone: "",
    techNote: ""
  })

  const filteredProducts = defectiveProducts.filter((product) => {
    const matchesSearch =
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.imei.includes(searchTerm) ||
      (product.customerName?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateDefective = () => {
    toast.success("Tiếp nhận sản phẩm lỗi thành công", {
      description: "Đã thêm vào danh sách xử lý bảo hành"
    })
    setIsCreateOpen(false)
    setFormData({ productCode: "", imei: "", defectType: "", customerName: "", customerPhone: "", techNote: "" })
  }

  const handleUpdateStatus = (id: string, status: string) => {
    toast.success("Cập nhật trạng thái thành công", {
      description: `Đã chuyển sang trạng thái: ${status}`
    })
  }

  const getStatusActions = (status: string) => {
    switch (status) {
      case "pending":
        return [
          { label: "Bắt đầu xử lý", icon: Wrench, status: "processing" }
        ]
      case "processing":
        return [
          { label: "Hoàn thành", icon: CheckCircle2, status: "completed" },
          { label: "Trả NCC", icon: RotateCcw, status: "returned" }
        ]
      default:
        return []
    }
  }

  const defectTypes = [
    "Lỗi màn hình",
    "Lỗi pin",
    "Lỗi camera",
    "Lỗi loa",
    "Lỗi mic",
    "Lỗi phần mềm",
    "Lỗi phần cứng khác",
    "Lỗi từ nhà sản xuất"
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hàng lỗi / Bảo hành</h1>
          <p className="text-muted-foreground">Quản lý sản phẩm lỗi và xử lý bảo hành</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tiếp nhận sản phẩm lỗi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tiếp nhận sản phẩm lỗi</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 p-1">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Mã sản phẩm *</Label>
                    <Input
                      placeholder="VD: IP15PM-256-BK"
                      value={formData.productCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, productCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IMEI/Serial *</Label>
                    <Input
                      placeholder="Nhập IMEI"
                      value={formData.imei}
                      onChange={(e) => setFormData(prev => ({ ...prev, imei: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tình trạng lỗi *</Label>
                  <Select
                    value={formData.defectType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, defectType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại lỗi" />
                    </SelectTrigger>
                    <SelectContent>
                      {defectTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">Thông tin khách hàng (nếu có)</Label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tên khách hàng</Label>
                    <Input
                      placeholder="Họ tên khách hàng"
                      value={formData.customerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input
                      placeholder="0xxx xxx xxx"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ghi chú kỹ thuật</Label>
                  <Textarea
                    placeholder="Mô tả chi tiết tình trạng lỗi..."
                    value={formData.techNote}
                    onChange={(e) => setFormData(prev => ({ ...prev, techNote: e.target.value }))}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button onClick={handleCreateDefective}>Tiếp nhận</Button>
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
                  placeholder="Tìm sản phẩm, IMEI, khách hàng..."
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
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="processing">Đang bảo hành</SelectItem>
                <SelectItem value="completed">Đã hoàn tất</SelectItem>
                <SelectItem value="returned">Đã trả NCC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {defectiveProducts.filter(p => p.status === "pending").length}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
                <p className="text-2xl font-bold text-blue-600">
                  {defectiveProducts.filter(p => p.status === "processing").length}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {defectiveProducts.filter(p => p.status === "completed").length}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trả NCC</p>
                <p className="text-2xl font-bold text-purple-600">
                  {defectiveProducts.filter(p => p.status === "returned").length}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-2">
                <RotateCcw className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danh sách sản phẩm lỗi ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Mã SP</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>IMEI</TableHead>
                <TableHead>Tình trạng lỗi</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày tiếp nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{product.productCode}</TableCell>
                  <TableCell className="font-medium">{product.productName}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{product.imei}</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                      {product.defectType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.customerName ? (
                      <div className="text-sm">
                        <p>{product.customerName}</p>
                        <p className="text-muted-foreground">{product.customerPhone}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(product.receivedAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        {getStatusActions(product.status).map((action) => (
                          <DropdownMenuItem
                            key={action.status}
                            onClick={() => handleUpdateStatus(product.id, action.label)}
                          >
                            <action.icon className="mr-2 h-4 w-4" />
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm lỗi</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Mã sản phẩm</Label>
                  <p className="font-mono font-medium">{selectedProduct.productCode}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">IMEI/Serial</Label>
                  <p className="font-mono">{selectedProduct.imei}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Tên sản phẩm</Label>
                <p className="font-medium">{selectedProduct.productName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Tình trạng lỗi</Label>
                  <Badge variant="destructive" className="mt-1 bg-red-100 text-red-800">
                    {selectedProduct.defectType}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedProduct.status} />
                  </div>
                </div>
              </div>

              <Separator />

              {selectedProduct.customerName && (
                <div>
                  <Label className="text-base font-medium">Thông tin khách hàng</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedProduct.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedProduct.customerPhone}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-muted-foreground">Ngày tiếp nhận</Label>
                <p>{formatDate(selectedProduct.receivedAt)}</p>
              </div>

              {selectedProduct.techNote && (
                <div>
                  <Label className="text-muted-foreground">Ghi chú kỹ thuật</Label>
                  <p className="p-3 bg-muted rounded-lg mt-1">{selectedProduct.techNote}</p>
                </div>
              )}

              {getStatusActions(selectedProduct.status).length > 0 && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  {getStatusActions(selectedProduct.status).map((action) => (
                    <Button
                      key={action.status}
                      onClick={() => {
                        handleUpdateStatus(selectedProduct.id, action.label)
                        setSelectedProduct(null)
                      }}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
