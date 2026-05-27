"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orderData = [
  { day: "Mon", orders: 145, completed: 138, pending: 7 },
  { day: "Tue", orders: 168, completed: 160, pending: 8 },
  { day: "Wed", orders: 192, completed: 185, pending: 7 },
  { day: "Thu", orders: 178, completed: 170, pending: 8 },
  { day: "Fri", orders: 210, completed: 200, pending: 10 },
  { day: "Sat", orders: 245, completed: 235, pending: 10 },
  { day: "Sun", orders: 189, completed: 180, pending: 9 },
];

const statusData = [
  { status: "Completed", count: 892, color: "bg-success" },
  { status: "Processing", count: 156, color: "bg-primary" },
  { status: "Pending", count: 89, color: "bg-warning" },
  { status: "Cancelled", count: 23, color: "bg-destructive" },
];

export function OrderStatistics() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Order Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Status Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {statusData.map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3"
            >
              <div className={`h-3 w-3 rounded-full ${item.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{item.status}</p>
                <p className="text-lg font-semibold">{item.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.92 0.005 17)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "oklch(0.45 0.01 17)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(0.45 0.01 17)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid oklch(0.92 0.005 17)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                {orderData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 5 ? "oklch(0.55 0.22 25)" : "oklch(0.75 0.14 25)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
