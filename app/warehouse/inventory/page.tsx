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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/warehouse/status-badge"
import { products, categories, formatCurrency } from "@/lib/warehouse-data"
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Package,
  Edit,
  Eye,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.imei.includes(searchTerm)
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleExportExcel = () => {
    toast.success("Đang xuất file Excel...", {
      description: "File sẽ được tải xuống trong giây lát"
    })
  }

  const handleUpdateStock = () => {
    toast.success("Đã cập nhật tồn kho", {
      description: "Dữ liệu tồn kho đã được đồng bộ"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý tồn kho</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý hàng hóa trong kho</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUpdateStock}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Cập nhật tồn kho
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sản phẩm, mã, IMEI..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="in_stock">Còn hàng</SelectItem>
                <SelectItem value="low_stock">Sắp hết</SelectItem>
                <SelectItem value="out_of_stock">Hết hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Package className="h-5 w-5" />
            Danh sách sản phẩm ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[120px]">Mã SP</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>IMEI/Serial</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-right">Giá nhập</TableHead>
                <TableHead className="text-right">Giá bán</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{product.code}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {product.imei}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${
                      product.quantity === 0 ? "text-red-600" : 
                      product.quantity < 10 ? "text-yellow-600" : "text-green-600"
                    }`}>
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(product.importPrice)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(product.salePrice)}</TableCell>
                  <TableCell className="text-sm">{product.location}</TableCell>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => {
                              e.preventDefault()
                              setSelectedProduct(product)
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
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

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Mã sản phẩm</Label>
                  <p className="font-mono font-medium">{selectedProduct.code}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">IMEI/Serial</Label>
                  <p className="font-mono">{selectedProduct.imei}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Tên sản phẩm</Label>
                <p className="font-medium">{selectedProduct.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Danh mục</Label>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Vị trí kho</Label>
                  <p>{selectedProduct.location}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedProduct.status} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Số lượng tồn</Label>
                  <p className="text-2xl font-bold">{selectedProduct.quantity}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Giá nhập</Label>
                  <p className="text-lg font-medium">{formatCurrency(selectedProduct.importPrice)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Giá bán</Label>
                  <p className="text-lg font-medium text-primary">{formatCurrency(selectedProduct.salePrice)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
