"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Download,
  Upload,
} from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: "SP001",
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg",
    category: "iPhone",
    brand: "Apple",
    price: 34990000,
    stock: 45,
    status: "active",
  },
  {
    id: "SP002",
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg",
    category: "Samsung",
    brand: "Samsung",
    price: 31990000,
    stock: 32,
    status: "active",
  },
  {
    id: "SP003",
    name: "iPhone 15 128GB",
    image: "/placeholder.svg",
    category: "iPhone",
    brand: "Apple",
    price: 22990000,
    stock: 58,
    status: "active",
  },
  {
    id: "SP004",
    name: "Samsung Galaxy Z Fold 5",
    image: "/placeholder.svg",
    category: "Samsung",
    brand: "Samsung",
    price: 41990000,
    stock: 12,
    status: "active",
  },
  {
    id: "SP005",
    name: "Xiaomi 14 Ultra",
    image: "/placeholder.svg",
    category: "Xiaomi",
    brand: "Xiaomi",
    price: 23990000,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "SP006",
    name: "OPPO Find X7 Ultra",
    image: "/placeholder.svg",
    category: "OPPO",
    brand: "OPPO",
    price: 24990000,
    stock: 8,
    status: "low_stock",
  },
  {
    id: "SP007",
    name: "iPhone 14 Pro 128GB",
    image: "/placeholder.svg",
    category: "iPhone",
    brand: "Apple",
    price: 24990000,
    stock: 25,
    status: "active",
  },
  {
    id: "SP008",
    name: "Samsung Galaxy A55 5G",
    image: "/placeholder.svg",
    category: "Samsung",
    brand: "Samsung",
    price: 10990000,
    stock: 120,
    status: "active",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const getStatusBadge = (status: string, stock: number) => {
  if (status === "out_of_stock" || stock === 0) {
    return (
      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
        Het hang
      </Badge>
    );
  }
  if (status === "low_stock" || stock < 10) {
    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
        Sap het
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
      Con hang
    </Badge>
  );
};

export default function ProductsPage() {
  return (
    <DashboardLayout
      title="San pham"
      description="Quan ly danh sach san pham cua cua hang"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Nhap Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuat Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Them san pham
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tim kiem theo ten, ma san pham..."
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Danh muc" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca danh muc</SelectItem>
                  <SelectItem value="iphone">iPhone</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="oppo">OPPO</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trang thai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="active">Con hang</SelectItem>
                  <SelectItem value="low_stock">Sap het</SelectItem>
                  <SelectItem value="out_of_stock">Het hang</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Danh sach san pham ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input type="checkbox" className="rounded border-input" />
                  </TableHead>
                  <TableHead>San pham</TableHead>
                  <TableHead>Ma SP</TableHead>
                  <TableHead>Danh muc</TableHead>
                  <TableHead className="text-right">Gia ban</TableHead>
                  <TableHead className="text-center">Ton kho</TableHead>
                  <TableHead className="text-center">Trang thai</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-input" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg border bg-muted overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {product.id}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell className="text-center">{product.stock}</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(product.status, product.stock)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiet
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Chinh sua
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xoa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Hien thi 1-8 cua 256 san pham
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Truoc
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">...</Button>
                <Button variant="outline" size="sm">32</Button>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
