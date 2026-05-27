"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const recentOrders = [
  {
    id: "#ORD-12345",
    customer: { name: "Nguyen Van A", avatar: "", initials: "NA" },
    product: "iPhone 15 Pro Max 256GB",
    quantity: 1,
    total: "₫34,990,000",
    status: "Completed",
    date: "2024-01-15 14:30",
  },
  {
    id: "#ORD-12344",
    customer: { name: "Tran Thi B", avatar: "", initials: "TB" },
    product: "Samsung Galaxy S24 Ultra",
    quantity: 1,
    total: "₫31,990,000",
    status: "Processing",
    date: "2024-01-15 13:45",
  },
  {
    id: "#ORD-12343",
    customer: { name: "Le Van C", avatar: "", initials: "LC" },
    product: "Xiaomi 14 Pro + AirPods",
    quantity: 2,
    total: "₫28,450,000",
    status: "Pending",
    date: "2024-01-15 12:20",
  },
  {
    id: "#ORD-12342",
    customer: { name: "Pham Thi D", avatar: "", initials: "PD" },
    product: "OPPO Find X7 Ultra",
    quantity: 1,
    total: "₫24,990,000",
    status: "Completed",
    date: "2024-01-15 11:10",
  },
  {
    id: "#ORD-12341",
    customer: { name: "Hoang Van E", avatar: "", initials: "HE" },
    product: "iPhone 15 128GB",
    quantity: 1,
    total: "₫22,490,000",
    status: "Cancelled",
    date: "2024-01-15 10:05",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-success/10 text-success border-success/20",
  Processing: "bg-primary/10 text-primary border-primary/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentOrders() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Product</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-secondary/50">
                <TableCell className="font-mono text-sm font-medium">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {order.customer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">
                      {order.customer.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {order.product}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {order.total}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`${statusStyles[order.status]} border`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Order</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
