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
  Pencil,
  UserX,
  Users,
  UserCheck,
  Briefcase,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

const employees = [
  {
    id: "NV001",
    name: "Nguyen Minh Tuan",
    email: "tuan.nguyen@didongviet.vn",
    phone: "0901234567",
    avatar: "",
    role: "Quan ly",
    department: "Kinh doanh",
    branch: "Chi nhanh Q.1",
    joinDate: "2022-03-15",
    status: "active",
    salesTarget: 500000000,
    salesAchieved: 420000000,
  },
  {
    id: "NV002",
    name: "Tran Thi Mai",
    email: "mai.tran@didongviet.vn",
    phone: "0912345678",
    avatar: "",
    role: "Nhan vien ban hang",
    department: "Kinh doanh",
    branch: "Chi nhanh Q.1",
    joinDate: "2023-01-10",
    status: "active",
    salesTarget: 300000000,
    salesAchieved: 285000000,
  },
  {
    id: "NV003",
    name: "Le Van Hung",
    email: "hung.le@didongviet.vn",
    phone: "0923456789",
    avatar: "",
    role: "Nhan vien ban hang",
    department: "Kinh doanh",
    branch: "Chi nhanh Q.3",
    joinDate: "2023-05-20",
    status: "active",
    salesTarget: 300000000,
    salesAchieved: 310000000,
  },
  {
    id: "NV004",
    name: "Pham Thi Lan",
    email: "lan.pham@didongviet.vn",
    phone: "0934567890",
    avatar: "",
    role: "Ke toan",
    department: "Tai chinh",
    branch: "Van phong chinh",
    joinDate: "2022-08-01",
    status: "active",
    salesTarget: 0,
    salesAchieved: 0,
  },
  {
    id: "NV005",
    name: "Hoang Duc Anh",
    email: "anh.hoang@didongviet.vn",
    phone: "0945678901",
    avatar: "",
    role: "Nhan vien kho",
    department: "Kho van",
    branch: "Kho trung tam",
    joinDate: "2023-09-15",
    status: "active",
    salesTarget: 0,
    salesAchieved: 0,
  },
  {
    id: "NV006",
    name: "Vo Minh Khoa",
    email: "khoa.vo@didongviet.vn",
    phone: "0956789012",
    avatar: "",
    role: "Nhan vien ban hang",
    department: "Kinh doanh",
    branch: "Chi nhanh Q.7",
    joinDate: "2024-01-02",
    status: "probation",
    salesTarget: 200000000,
    salesAchieved: 45000000,
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)} ty`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)} tr`;
  }
  return new Intl.NumberFormat("vi-VN").format(value);
};

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; variant: string }> = {
    active: { label: "Dang lam viec", variant: "bg-emerald-100 text-emerald-700" },
    probation: { label: "Thu viec", variant: "bg-blue-100 text-blue-700" },
    inactive: { label: "Nghi viec", variant: "bg-gray-100 text-gray-700" },
  };
  return configs[status] || configs.inactive;
};

const getRoleColor = (role: string) => {
  if (role.includes("Quan ly")) return "bg-purple-100 text-purple-700";
  if (role.includes("ban hang")) return "bg-primary/10 text-primary";
  if (role.includes("Ke toan")) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-700";
};

export default function EmployeesPage() {
  const stats = [
    { label: "Tong nhan vien", value: "48", icon: <Users className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { label: "Dang lam viec", value: "45", icon: <UserCheck className="h-5 w-5" />, color: "bg-emerald-100 text-emerald-600" },
    { label: "Thu viec", value: "3", icon: <Briefcase className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
    { label: "Chi nhanh", value: "5", icon: <Calendar className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <DashboardLayout
      title="Nhan vien"
      description="Quan ly thong tin nhan vien"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Them nhan vien
        </Button>
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
                  placeholder="Tim kiem theo ten, ma nhan vien..."
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Phong ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="sales">Kinh doanh</SelectItem>
                  <SelectItem value="finance">Tai chinh</SelectItem>
                  <SelectItem value="warehouse">Kho van</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Chi nhanh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca chi nhanh</SelectItem>
                  <SelectItem value="q1">Chi nhanh Q.1</SelectItem>
                  <SelectItem value="q3">Chi nhanh Q.3</SelectItem>
                  <SelectItem value="q7">Chi nhanh Q.7</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trang thai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tat ca</SelectItem>
                  <SelectItem value="active">Dang lam viec</SelectItem>
                  <SelectItem value="probation">Thu viec</SelectItem>
                  <SelectItem value="inactive">Nghi viec</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Danh sach nhan vien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhan vien</TableHead>
                  <TableHead>Lien he</TableHead>
                  <TableHead>Vi tri</TableHead>
                  <TableHead>Chi nhanh</TableHead>
                  <TableHead>Ngay vao</TableHead>
                  <TableHead className="text-center">KPI ban hang</TableHead>
                  <TableHead className="text-center">Trang thai</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => {
                  const statusConfig = getStatusConfig(employee.status);
                  const kpiPercent = employee.salesTarget > 0 
                    ? Math.round((employee.salesAchieved / employee.salesTarget) * 100) 
                    : null;
                  return (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {employee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {employee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ma: {employee.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            {employee.email}
                          </p>
                          <p className="text-sm flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            {employee.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(employee.role)} hover:${getRoleColor(employee.role)}`}>
                          {employee.role}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {employee.department}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm">{employee.branch}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {employee.joinDate}
                      </TableCell>
                      <TableCell className="text-center">
                        {kpiPercent !== null ? (
                          <div className="space-y-1">
                            <span className={`font-semibold ${kpiPercent >= 100 ? "text-emerald-600" : kpiPercent >= 80 ? "text-amber-600" : "text-red-600"}`}>
                              {kpiPercent}%
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(employee.salesAchieved)} / {formatCurrency(employee.salesTarget)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${statusConfig.variant} hover:${statusConfig.variant}`}>
                          {statusConfig.label}
                        </Badge>
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
                              <UserX className="mr-2 h-4 w-4" />
                              Vo hieu hoa
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
                Hien thi 1-6 cua 48 nhan vien
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
                <Button variant="outline" size="sm">8</Button>
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
