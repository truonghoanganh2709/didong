"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Clock,
  LogIn,
  LogOut,
  Target,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Award,
  History,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import { mockCurrentShift, formatCurrency, formatTime } from "@/lib/mock-data/sales";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const hourlyData = [
  { hour: "8:00", sales: 15000000 },
  { hour: "9:00", sales: 23000000 },
  { hour: "10:00", sales: 45000000 },
  { hour: "11:00", sales: 67000000 },
  { hour: "12:00", sales: 85000000 },
  { hour: "13:00", sales: 95000000 },
  { hour: "14:00", sales: 110000000 },
  { hour: "15:00", sales: 128547000 },
];

const shiftHistory = [
  {
    date: "26/03/2024",
    checkIn: "08:00",
    checkOut: "17:30",
    hours: "9.5h",
    sales: 145000000,
    orders: 12,
    commission: 1450000,
  },
  {
    date: "25/03/2024",
    checkIn: "08:15",
    checkOut: "17:45",
    hours: "9.5h",
    sales: 98000000,
    orders: 8,
    commission: 980000,
  },
  {
    date: "24/03/2024",
    checkIn: "08:00",
    checkOut: "17:00",
    hours: "9h",
    sales: 167000000,
    orders: 15,
    commission: 1670000,
  },
  {
    date: "23/03/2024",
    checkIn: "08:30",
    checkOut: "18:00",
    hours: "9.5h",
    sales: 112000000,
    orders: 10,
    commission: 1120000,
  },
];

export default function ShiftPage() {
  const [shift, setShift] = useState(mockCurrentShift);
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [showCheckOutDialog, setShowCheckOutDialog] = useState(false);

  const kpiPercentage = Math.round(
    (shift.kpiAchieved / shift.kpiTarget) * 100
  );
  const workingHours = shift.checkIn
    ? Math.round(
        (new Date().getTime() - shift.checkIn.getTime()) / (1000 * 60 * 60) * 10
      ) / 10
    : 0;

  const handleCheckIn = () => {
    setShift((prev) => ({ ...prev, checkIn: new Date() }));
    toast.success("Đã check-in thành công!", {
      description: `Thời gian: ${formatTime(new Date())}`,
    });
    setShowCheckInDialog(false);
  };

  const handleCheckOut = () => {
    setShift((prev) => ({ ...prev, checkOut: new Date() }));
    toast.success("Đã check-out thành công!", {
      description: `Tổng thời gian làm việc: ${workingHours}h`,
    });
    setShowCheckOutDialog(false);
  };

  return (
    <div className="flex flex-col">
      <SalesHeader title="Quản lý ca làm" />

      <div className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Check-in/Check-out Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Current Status */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Ca làm việc hôm nay</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date().toLocaleDateString("vi-VN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Info */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="text-2xl font-bold">
                    {shift.checkIn ? formatTime(shift.checkIn) : "--:--"}
                  </p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Thời gian làm</p>
                  <p className="text-2xl font-bold text-primary">{workingHours}h</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="text-2xl font-bold">
                    {shift.checkOut ? formatTime(shift.checkOut) : "--:--"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!shift.checkIn ? (
                  <Button
                    size="lg"
                    className="bg-success hover:bg-success/90"
                    onClick={() => setShowCheckInDialog(true)}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Check-in
                  </Button>
                ) : !shift.checkOut ? (
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => setShowCheckOutDialog(true)}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Check-out
                  </Button>
                ) : (
                  <Badge className="text-lg py-2 px-4 bg-success">
                    Đã kết thúc ca
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Doanh số</span>
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(shift.totalSales)}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +12% so với hôm qua
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Đơn hàng</span>
                <ShoppingCart className="h-4 w-4 text-info" />
              </div>
              <p className="text-2xl font-bold">{shift.ordersCount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                ~{formatCurrency(Math.round(shift.totalSales / shift.ordersCount))}
                /đơn
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Hoa hồng</span>
                <Award className="h-4 w-4 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">
                {formatCurrency(shift.commission)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                1% doanh số
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">KPI</span>
                <Target className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-2xl font-bold">{kpiPercentage}%</p>
              <Progress value={kpiPercentage} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Doanh số theo giờ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="hour"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000000}tr`}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelStyle={{ color: "var(--foreground)" }}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* KPI Progress */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Tiến độ KPI tháng này
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="h-32 w-32">
                      <circle
                        className="text-secondary"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        strokeDasharray={`${kpiPercentage * 3.52} 352`}
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold">
                      {kpiPercentage}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xs text-muted-foreground">Đã đạt</p>
                    <p className="font-bold text-primary">
                      {formatCurrency(shift.kpiAchieved)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xs text-muted-foreground">Mục tiêu</p>
                    <p className="font-bold">
                      {formatCurrency(shift.kpiTarget)}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm text-center">
                    Còn{" "}
                    <span className="font-bold text-warning">
                      {formatCurrency(shift.kpiTarget - shift.kpiAchieved)}
                    </span>{" "}
                    để đạt KPI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shift History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <History className="h-5 w-5" />
              Lịch sử ca làm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {shiftHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-medium">{item.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.checkIn} - {item.checkOut}
                      </p>
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div className="text-center">
                      <p className="font-medium">{item.hours}</p>
                      <p className="text-xs text-muted-foreground">Giờ làm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-medium">{item.orders} đơn</p>
                      <p className="text-xs text-muted-foreground">Đơn hàng</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-primary">
                        {formatCurrency(item.sales)}
                      </p>
                      <p className="text-xs text-muted-foreground">Doanh số</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-warning">
                        {formatCurrency(item.commission)}
                      </p>
                      <p className="text-xs text-muted-foreground">Hoa hồng</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Dialog */}
      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận Check-in</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn bắt đầu ca làm việc?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-10 w-10 text-success" />
            </div>
            <p className="text-3xl font-bold">{formatTime(new Date())}</p>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCheckInDialog(false)}
            >
              Hủy
            </Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleCheckIn}>
              <LogIn className="mr-2 h-4 w-4" />
              Xác nhận Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check-out Dialog */}
      <Dialog open={showCheckOutDialog} onOpenChange={setShowCheckOutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận Check-out</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn kết thúc ca làm việc?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-4">
              <div className="h-20 w-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                <LogOut className="h-10 w-10 text-destructive" />
              </div>
              <p className="text-3xl font-bold">{formatTime(new Date())}</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thời gian làm</span>
                <span className="font-medium">{workingHours} giờ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doanh số</span>
                <span className="font-medium text-primary">
                  {formatCurrency(shift.totalSales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số đơn</span>
                <span className="font-medium">{shift.ordersCount} đơn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hoa hồng dự kiến</span>
                <span className="font-medium text-warning">
                  {formatCurrency(shift.commission)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCheckOutDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleCheckOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Xác nhận Check-out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
