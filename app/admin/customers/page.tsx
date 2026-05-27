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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  UserPlus,
  Users,
  Crown,
  Star,
  Download,
} from "lucide-react";

const customers = [
  {
    id: "KH001",
    name: "Nguyen Van An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    avatar: "",
    tier: "vip",
    totalOrders: 15,
    totalSpent: 125990000,
    lastOrder: "2024-01-15",
    joinDate: "2023-06-15",
    status: "active",
  },
  {
    id: "KH002",
    name: "Tran Thi Binh",
    email: "binh.tran@email.com",
    phone: "0912345678",
    avatar: "",
    tier: "gold",
    totalOrders: 8,
    totalSpent: 78500000,
    lastOrder: "2024-01-14",
    joinDate: "2023-08-20",
    status: "active",
  },
  {
    id: "KH003",
    name: "Le Hoang Cuong",
    email: "cuong.le@email.com",
    phone: "0923456789",
    avatar: "",
    tier: "silver",
    totalOrders: 5,
    totalSpent: 45200000,
    lastOrder: "2024-01-10",
    joinDate: "2023-10-05",
    status: "active",
  },
  {
    id: "KH004",
    name: "Pham Minh Duc",
    email: "duc.pham@email.com",
    phone: "0934567890",
    avatar: "",
    tier: "standard",
    totalOrders: 2,
    totalSpent: 15990000,
    lastOrder: "2024-01-08",
    joinDate: "2024-01-01",
    status: "active",
  },
  {
    id: "KH005",
    name: "Vo Thi Hoa",
    email: "hoa.vo@email.com",
    phone: "0945678901",
    avatar: "",
    tier: "gold",
    totalOrders: 12,
    totalSpent: 98750000,
    lastOrder: "2024-01-12",
    joinDate: "2023-05-10",
    status: "active",
  },
  {
    id: "KH006",
    name: "Dang Van Giang",
    email: "giang.dang@email.com",
    phone: "0956789012",
    avatar: "",
    tier: "standard",
    totalOrders: 1,
    totalSpent: 24990000,
    lastOrder: "2024-01-05",
    joinDate: "2024-01-05",
    status: "inactive",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const getTierConfig = (tier: string) => {
  const configs: Record<string, { label: string; variant: string; icon: React.ReactNode }> = {
    vip: {
      label: "VIP",
      variant: "bg-purple-100 text-purple-700",
      icon: <Crown className="h-3.5 w-3.5" />,
    },
    gold: {
      label: "Vang",
      variant: "bg-amber-100 text-amber-700",
      icon: <Star className="h-3.5 w-3.5" />,
    },
    silver: {
      label: "Bac",
      variant: "bg-slate-200 text-slate-700",
      icon: <Star className="h-3.5 w-3.5" />,
    },
    standard: {
      label: "Tieu chuan",
      variant: "bg-gray-100 text-gray-700",
      icon: null,
    },
  };
  return configs[tier] || configs.standard;
};

export default function CustomersPage() {
  const stats = [
    { label: "Tong khach hang", value: "5,842", icon: <Users className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Khach VIP", value: "128", icon: <Crown className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" },
    { label: "Khach moi thang nay", value: "245", icon: <UserPlus className="h-5 w-5" />, color: "bg-emerald-100 text-emerald-600" },
    { label: "Ty le quay lai", value: "68%", icon: <Star className="h-5 w-5" />, color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <DashboardLayout
      title="Khach hang"
      description="Quan ly thong tin khach hang"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuat Excel
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Them khach hang
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

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tim kiem theo ten, email, so dien thoai..."
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Hang thanh vien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="gold">Vang</SelectItem>
                  <SelectItem value="silver">Bac</SelectItem>
                  <SelectItem value="standard">Tieu chuan</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trang thai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="active">Hoat dong</SelectItem>
                  <SelectItem value="inactive">Khong hoat dong</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Danh sach khach hang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input type="checkbox" className="rounded border-input" />
                  </TableHead>
                  <TableHead>Khach hang</TableHead>
                  <TableHead>Lien he</TableHead>
                  <TableHead className="text-center">Hang</TableHead>
                  <TableHead className="text-center">Don hang</TableHead>
                  <TableHead className="text-right">Tong chi tieu</TableHead>
                  <TableHead>Don gan nhat</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => {
                  const tierConfig = getTierConfig(customer.tier);
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded border-input" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {customer.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ma: {customer.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            {customer.email}
                          </p>
                          <p className="text-sm flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            {customer.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${tierConfig.variant} gap-1 hover:${tierConfig.variant}`}>
                          {tierConfig.icon}
                          {tierConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(customer.totalSpent)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {customer.lastOrder}
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
                              <Mail className="mr-2 h-4 w-4" />
                              Gui email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Goi dien
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
                Hien thi 1-6 cua 5,842 khach hang
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
                <Button variant="outline" size="sm">974</Button>
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
