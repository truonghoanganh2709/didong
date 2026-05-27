"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreHorizontal,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Plus,
  FileBarChart,
} from "lucide-react";
import Image from "next/image";

const inventoryData = [
  {
    id: "SP001",
    name: "iPhone 15 Pro Max 256GB",
    image: "/placeholder.svg",
    category: "iPhone",
    sku: "IP15PM-256",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    incoming: 30,
    reserved: 5,
    warehouse: "Kho chinh",
    lastUpdated: "2024-01-15",
  },
  {
    id: "SP002",
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg",
    category: "Samsung",
    sku: "SS-S24U",
    currentStock: 32,
    minStock: 15,
    maxStock: 80,
    incoming: 0,
    reserved: 8,
    warehouse: "Kho chinh",
    lastUpdated: "2024-01-14",
  },
  {
    id: "SP003",
    name: "iPhone 15 128GB",
    image: "/placeholder.svg",
    category: "iPhone",
    sku: "IP15-128",
    currentStock: 58,
    minStock: 25,
    maxStock: 120,
    incoming: 50,
    reserved: 12,
    warehouse: "Kho chinh",
    lastUpdated: "2024-01-15",
  },
  {
    id: "SP004",
    name: "Samsung Galaxy Z Fold 5",
    image: "/placeholder.svg",
    category: "Samsung",
    sku: "SS-ZF5",
    currentStock: 12,
    minStock: 10,
    maxStock: 40,
    incoming: 20,
    reserved: 3,
    warehouse: "Kho phu",
    lastUpdated: "2024-01-13",
  },
  {
    id: "SP005",
    name: "Xiaomi 14 Ultra",
    image: "/placeholder.svg",
    category: "Xiaomi",
    sku: "XM-14U",
    currentStock: 5,
    minStock: 15,
    maxStock: 50,
    incoming: 25,
    reserved: 2,
    warehouse: "Kho chinh",
    lastUpdated: "2024-01-12",
  },
  {
    id: "SP006",
    name: "OPPO Find X7 Ultra",
    image: "/placeholder.svg",
    category: "OPPO",
    sku: "OP-FX7U",
    currentStock: 8,
    minStock: 10,
    maxStock: 30,
    incoming: 0,
    reserved: 1,
    warehouse: "Kho phu",
    lastUpdated: "2024-01-11",
  },
];

const stockMovements = [
  { id: 1, product: "iPhone 15 Pro Max 256GB", type: "in", quantity: 30, note: "Nhap tu NCC Apple", date: "2024-01-15 09:00", user: "Admin" },
  { id: 2, product: "Samsung Galaxy S24 Ultra", type: "out", quantity: 5, note: "Ban hang #DH001235", date: "2024-01-15 10:30", user: "Nhan vien A" },
  { id: 3, product: "iPhone 15 128GB", type: "in", quantity: 50, note: "Nhap tu NCC Apple", date: "2024-01-15 11:00", user: "Admin" },
  { id: 4, product: "Xiaomi 14 Ultra", type: "out", quantity: 3, note: "Ban hang #DH001240", date: "2024-01-15 14:00", user: "Nhan vien B" },
  { id: 5, product: "OPPO Find X7 Ultra", type: "adjust", quantity: -2, note: "Dieu chinh kiem ke", date: "2024-01-14 16:00", user: "Admin" },
];

const getStockStatus = (current: number, min: number) => {
  const ratio = current / min;
  if (ratio === 0) return { label: "Het hang", color: "bg-red-100 text-red-700", progress: 0 };
  if (ratio < 1) return { label: "Can nhap", color: "bg-amber-100 text-amber-700", progress: (current / min) * 100 };
  if (ratio < 1.5) return { label: "Ton thap", color: "bg-yellow-100 text-yellow-700", progress: 50 };
  return { label: "Du hang", color: "bg-emerald-100 text-emerald-700", progress: Math.min((current / min) * 33, 100) };
};

export default function InventoryPage() {
  const stats = [
    { label: "Tong san pham", value: "256", icon: <Package className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Sap het hang", value: "12", icon: <AlertTriangle className="h-5 w-5" />, color: "bg-amber-100 text-amber-600" },
    { label: "Dang ve", value: "5 lo", icon: <TrendingUp className="h-5 w-5" />, color: "bg-emerald-100 text-emerald-600" },
    { label: "Gia tri ton kho", value: "12.5 ty", icon: <TrendingDown className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
  ];

  return (
    <DashboardLayout
      title="Kho hang"
      description="Quan ly ton kho va xuat nhap hang"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileBarChart className="mr-2 h-4 w-4" />
            Bao cao ton kho
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nhap hang
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList>
            <TabsTrigger value="inventory">Ton kho</TabsTrigger>
            <TabsTrigger value="movements">Lich su xuat nhap</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tim kiem theo ten, ma SKU..."
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
                      <SelectItem value="in_stock">Du hang</SelectItem>
                      <SelectItem value="low">Ton thap</SelectItem>
                      <SelectItem value="out">Het hang</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Kho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tat ca kho</SelectItem>
                      <SelectItem value="main">Kho chinh</SelectItem>
                      <SelectItem value="sub">Kho phu</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danh sach ton kho</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>San pham</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          Ton kho
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">Dang ve</TableHead>
                      <TableHead className="text-center">Da dat</TableHead>
                      <TableHead>Muc ton</TableHead>
                      <TableHead className="text-center">Trang thai</TableHead>
                      <TableHead>Kho</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => {
                      const status = getStockStatus(item.currentStock, item.minStock);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-lg border bg-muted overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-foreground line-clamp-1 max-w-[200px]">
                                  {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {item.sku}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-semibold text-lg">{item.currentStock}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {item.incoming > 0 ? (
                              <span className="text-emerald-600 font-medium">+{item.incoming}</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.reserved > 0 ? (
                              <span className="text-amber-600 font-medium">{item.reserved}</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={status.progress} className="h-2 w-20" />
                              <p className="text-xs text-muted-foreground">
                                Min: {item.minStock} | Max: {item.maxStock}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`${status.color} hover:${status.color}`}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{item.warehouse}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Nhap hang</DropdownMenuItem>
                                <DropdownMenuItem>Xuat hang</DropdownMenuItem>
                                <DropdownMenuItem>Dieu chinh</DropdownMenuItem>
                                <DropdownMenuItem>Lich su</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lich su xuat nhap kho</CardTitle>
                <CardDescription>Cac giao dich xuat nhap trong 7 ngay gan nhat</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thoi gian</TableHead>
                      <TableHead>San pham</TableHead>
                      <TableHead className="text-center">Loai</TableHead>
                      <TableHead className="text-center">So luong</TableHead>
                      <TableHead>Ghi chu</TableHead>
                      <TableHead>Nguoi thuc hien</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {movement.date}
                        </TableCell>
                        <TableCell className="font-medium">{movement.product}</TableCell>
                        <TableCell className="text-center">
                          {movement.type === "in" && (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Nhap</Badge>
                          )}
                          {movement.type === "out" && (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Xuat</Badge>
                          )}
                          {movement.type === "adjust" && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Dieu chinh</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={movement.type === "in" ? "text-emerald-600" : movement.type === "out" ? "text-blue-600" : "text-amber-600"}>
                            {movement.type === "in" ? "+" : ""}{movement.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{movement.note}</TableCell>
                        <TableCell className="text-sm">{movement.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
