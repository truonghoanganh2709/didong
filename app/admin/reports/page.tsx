"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
} from "lucide-react";

const revenueData = [
  { month: "T1", revenue: 4200, orders: 320, profit: 840 },
  { month: "T2", revenue: 3800, orders: 290, profit: 760 },
  { month: "T3", revenue: 5100, orders: 410, profit: 1020 },
  { month: "T4", revenue: 4700, orders: 380, profit: 940 },
  { month: "T5", revenue: 5500, orders: 450, profit: 1100 },
  { month: "T6", revenue: 6200, orders: 520, profit: 1240 },
  { month: "T7", revenue: 5800, orders: 480, profit: 1160 },
  { month: "T8", revenue: 6500, orders: 540, profit: 1300 },
  { month: "T9", revenue: 7100, orders: 590, profit: 1420 },
  { month: "T10", revenue: 6800, orders: 560, profit: 1360 },
  { month: "T11", revenue: 7500, orders: 620, profit: 1500 },
  { month: "T12", revenue: 8200, orders: 680, profit: 1640 },
];

const categoryData = [
  { name: "iPhone", value: 45, revenue: 28500 },
  { name: "Samsung", value: 28, revenue: 17800 },
  { name: "Xiaomi", value: 12, revenue: 7600 },
  { name: "OPPO", value: 10, revenue: 6300 },
  { name: "Khac", value: 5, revenue: 3200 },
];

const topProductsData = [
  { name: "iPhone 15 Pro Max", sales: 245, revenue: 8575 },
  { name: "Samsung S24 Ultra", sales: 189, revenue: 6039 },
  { name: "iPhone 15", sales: 156, revenue: 3588 },
  { name: "Galaxy Z Fold 5", sales: 87, revenue: 3653 },
  { name: "Xiaomi 14 Ultra", sales: 72, revenue: 1727 },
];

const branchData = [
  { branch: "Q.1", revenue: 15200, orders: 890, growth: 12 },
  { branch: "Q.3", revenue: 12800, orders: 720, growth: 8 },
  { branch: "Q.7", revenue: 10500, orders: 580, growth: 15 },
  { branch: "Binh Thanh", revenue: 8900, orders: 480, growth: -3 },
  { branch: "Go Vap", revenue: 7600, orders: 410, growth: 5 },
];

const COLORS = ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca"];

const formatCurrency = (value: number) => {
  return `${value.toLocaleString("vi-VN")} tr`;
};

export default function ReportsPage() {
  const summaryStats = [
    { label: "Tong doanh thu", value: "71.4 ty", change: "+15.2%", positive: true, icon: <DollarSign className="h-5 w-5" /> },
    { label: "Tong don hang", value: "5,840", change: "+12.8%", positive: true, icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "Khach hang moi", value: "1,245", change: "+8.5%", positive: true, icon: <Users className="h-5 w-5" /> },
    { label: "San pham ban ra", value: "8,920", change: "-2.3%", positive: false, icon: <Package className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      title="Bao cao"
      description="Thong ke va phan tich kinh doanh"
      actions={
        <div className="flex items-center gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Nam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Tuy chon
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuat bao cao
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4">
          {summaryStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <div className={`flex items-center gap-1 mt-1 text-sm ${stat.positive ? "text-emerald-600" : "text-red-600"}`}>
                      {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {stat.change} so voi nam truoc
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList>
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="products">San pham</TabsTrigger>
            <TabsTrigger value="branches">Chi nhanh</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Revenue Chart */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Doanh thu theo thang</CardTitle>
                  <CardDescription>So sanh doanh thu, don hang va loi nhuan</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}tr`} />
                      <Tooltip 
                        formatter={(value: number) => `${value.toLocaleString()} trieu`}
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#dc2626" strokeWidth={2} dot={{ fill: "#dc2626" }} />
                      <Line type="monotone" dataKey="profit" name="Loi nhuan" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Doanh thu theo danh muc</CardTitle>
                  <CardDescription>Phan bo doanh thu theo hang</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {categoryData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(item.revenue)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Products Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Top san pham ban chay</CardTitle>
                  <CardDescription>Doanh thu theo san pham (trieu VND)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={topProductsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}tr`} />
                      <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={120} />
                      <Tooltip 
                        formatter={(value: number) => `${value.toLocaleString()} trieu`}
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                      />
                      <Bar dataKey="revenue" name="Doanh thu" fill="#dc2626" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Volume */}
              <Card>
                <CardHeader>
                  <CardTitle>So luong ban</CardTitle>
                  <CardDescription>So luong san pham da ban</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={topProductsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" fontSize={12} />
                      <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={120} />
                      <Tooltip 
                        formatter={(value: number) => `${value} san pham`}
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                      />
                      <Bar dataKey="sales" name="So luong" fill="#f97316" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hieu suat chi nhanh</CardTitle>
                <CardDescription>So sanh doanh thu va don hang theo chi nhanh</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={branchData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="branch" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}tr`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Doanh thu (trieu)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="orders" name="Don hang" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Branch table */}
                <div className="mt-6 border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Chi nhanh</th>
                        <th className="text-right p-3 text-sm font-medium">Doanh thu</th>
                        <th className="text-right p-3 text-sm font-medium">Don hang</th>
                        <th className="text-right p-3 text-sm font-medium">Tang truong</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchData.map((branch) => (
                        <tr key={branch.branch} className="border-t">
                          <td className="p-3 font-medium">Chi nhanh {branch.branch}</td>
                          <td className="p-3 text-right">{formatCurrency(branch.revenue)}</td>
                          <td className="p-3 text-right">{branch.orders}</td>
                          <td className={`p-3 text-right font-medium ${branch.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {branch.growth >= 0 ? "+" : ""}{branch.growth}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
