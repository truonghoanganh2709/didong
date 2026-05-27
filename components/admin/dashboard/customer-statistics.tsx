"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, UserCheck, TrendingUp } from "lucide-react";

const customerData = [
  { name: "New", value: 234, color: "oklch(0.55 0.22 25)" },
  { name: "Returning", value: 456, color: "oklch(0.65 0.18 25)" },
  { name: "VIP", value: 89, color: "oklch(0.75 0.14 25)" },
  { name: "Inactive", value: 123, color: "oklch(0.85 0.10 25)" },
];

const customerStats = [
  {
    label: "Total Customers",
    value: "5,678",
    change: "+15.3%",
    icon: Users,
  },
  {
    label: "New This Month",
    value: "234",
    change: "+22.1%",
    icon: UserPlus,
  },
  {
    label: "Active Users",
    value: "4,532",
    change: "+8.7%",
    icon: UserCheck,
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "+0.4%",
    icon: TrendingUp,
  },
];

export function CustomerStatistics() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Customer Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {customerStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{stat.value}</p>
                    <span className="text-xs text-success">{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid oklch(0.92 0.005 17)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  `${value} customers`,
                  name,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
