"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { month: "Jan", revenue: 1200000000, orders: 890 },
  { month: "Feb", revenue: 1450000000, orders: 1020 },
  { month: "Mar", revenue: 1380000000, orders: 980 },
  { month: "Apr", revenue: 1680000000, orders: 1150 },
  { month: "May", revenue: 1920000000, orders: 1320 },
  { month: "Jun", revenue: 2100000000, orders: 1480 },
  { month: "Jul", revenue: 1950000000, orders: 1380 },
  { month: "Aug", revenue: 2250000000, orders: 1560 },
  { month: "Sep", revenue: 2456780000, orders: 1680 },
  { month: "Oct", revenue: 2380000000, orders: 1620 },
  { month: "Nov", revenue: 2680000000, orders: 1850 },
  { month: "Dec", revenue: 2950000000, orders: 2020 },
];

function formatCurrency(value: number) {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B ₫`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M ₫`;
  }
  return `${value.toLocaleString()} ₫`;
}

export function RevenueChart() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Revenue Analytics</CardTitle>
        <Select defaultValue="year">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.92 0.005 17)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "oklch(0.45 0.01 17)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(0.45 0.01 17)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid oklch(0.92 0.005 17)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.55 0.22 25)"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
