"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Calendar,
} from "lucide-react";

const orders = [
  {
    id: "DH001234",
    customer: { name: "Nguyen Van An", email: "an.nguyen@email.com", avatar: "" },
    products: "iPhone 15 Pro Max 256GB",
    quantity: 1,
    total: 34990000,
    status: "completed",
    paymentMethod: "Chuyen khoan",
    date: "2024-01-15 14:30",
    address: "123 Nguyen Hue, Q.1, TP.HCM",
  },
  {
    id: "DH001235",
    customer: { name: "Tran Thi Binh", email: "binh.tran@email.com", avatar: "" },
    products: "Samsung Galaxy S24 Ultra",
    quantity: 1,
    total: 31990000,
    status: "processing",
    paymentMethod: "COD",
    date: "2024-01-15 15:45",
    address: "456 Le Loi, Q.3, TP.HCM",
  },
  {
    id: "DH001236",
    customer: { name: "Le Hoang Cuong", email: "cuong.le@email.com", avatar: "" },
    products: "iPhone 15 128GB, AirPods Pro 2",
    quantity: 2,
    total: 29890000,
    status: "shipping",
    paymentMethod: "The tin dung",
    date: "2024-01-15 16:20",
    address: "789 Hai Ba Trung, Q.1, TP.HCM",
  },
  {
    id: "DH001237",
    customer: { name: "Pham Minh Duc", email: "duc.pham@email.com", avatar: "" },
    products: "Samsung Galaxy Z Fold 5",
    quantity: 1,
    total: 41990000,
    status: "pending",
    paymentMethod: "Chuyen khoan",
    date: "2024-01-15 17:00",
    address: "321 Dien Bien Phu, Binh Thanh, TP.HCM",
  },
  {
    id: "DH001238",
    customer: { name: "Vo Thi Hoa", email: "hoa.vo@email.com", avatar: "" },
    products: "Xiaomi 14 Ultra",
    quantity: 1,
    total: 23990000,
    status: "cancelled",
    paymentMethod: "COD",
    date: "2024-01-15 10:15",
    address: "654 Cach Mang Thang 8, Q.10, TP.HCM",
  },
  {
    id: "DH001239",
    customer: { name: "Dang Van Giang", email: "giang.dang@email.com", avatar: "" },
    products: "OPPO Find X7 Ultra",
    quantity: 1,
    total: 24990000,
    status: "completed",
    paymentMethod: "The tin dung",
    date: "2024-01-14 09:30",
    address: "987 Nguyen Thi Minh Khai, Q.3, TP.HCM",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; variant: string; icon: React.ReactNode }> = {
    completed: {
      label: "Hoan thanh",
      variant: "bg-emerald-100 text-emerald-700",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
    },
    processing: {
      label: "Dang xu ly",
      variant: "bg-blue-100 text-blue-700",
      icon: <Package className="h-3.5 w-3.5" />,
    },
    shipping: {
      label: "Dang giao",
      variant: "bg-purple-100 text-purple-700",
      icon: <Truck className="h-3.5 w-3.5" />,
    },
    pending: {
      label: "Cho xac nhan",
      variant: "bg-amber-100 text-amber-700",
      icon: <Clock className="h-3.5 w-3.5" />,
    },
    cancelled: {
      label: "Da huy",
      variant: "bg-red-100 text-red-700",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
  };
  return configs[status] || configs.pending;
};

export default function OrdersPage() {
  const stats = [
    { label: "Tong don hang", value: "1,234", change: "+12%", color: "text-primary" },
    { label: "Cho xac nhan", value: "28", change: "-5%", color: "text-amber-600" },
    { label: "Dang giao", value: "45", change: "+8%", color: "text-purple-600" },
    { label: "Hoan thanh", value: "1,089", change: "+15%", color: "text-emerald-600" },
  ];

  return (
    <DashboardLayout
      title="Don hang"
      description="Quan ly va theo doi don hang"
      actions={
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Hom nay
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters & Tabs */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Tat ca</TabsTrigger>
                  <TabsTrigger value="pending">Cho xac nhan</TabsTrigger>
                  <TabsTrigger value="processing">Dang xu ly</TabsTrigger>
                  <TabsTrigger value="shipping">Dang giao</TabsTrigger>
                  <TabsTrigger value="completed">Hoan thanh</TabsTrigger>
                  <TabsTrigger value="cancelled">Da huy</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tim kiem theo ma don, ten khach hang..."
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Phuong thuc TT" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="bank">Chuyen khoan</SelectItem>
                  <SelectItem value="cod">COD</SelectItem>
                  <SelectItem value="card">The tin dung</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Danh sach don hang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input type="checkbox" className="rounded border-input" />
                  </TableHead>
                  <TableHead>Ma don</TableHead>
                  <TableHead>Khach hang</TableHead>
                  <TableHead>San pham</TableHead>
                  <TableHead className="text-right">Tong tien</TableHead>
                  <TableHead>Thanh toan</TableHead>
                  <TableHead className="text-center">Trang thai</TableHead>
                  <TableHead>Ngay dat</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded border-input" />
                      </TableCell>
                      <TableCell className="font-mono font-medium text-primary">
                        #{order.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={order.customer.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {order.customer.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-1 max-w-[200px]">
                          {order.products}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          x{order.quantity} san pham
                        </p>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{order.paymentMethod}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${statusConfig.variant} gap-1 hover:${statusConfig.variant}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.date}
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
                              <Printer className="mr-2 h-4 w-4" />
                              In hoa don
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="mr-2 h-4 w-4" />
                              Cap nhat van chuyen
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Huy don
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Hien thi 1-6 cua 1,234 don hang
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
                <Button variant="outline" size="sm">206</Button>
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
