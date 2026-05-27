"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const lowStockItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    sku: "IP15PM-256-BK",
    stock: 3,
    minStock: 10,
    category: "Apple",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    sku: "SGS24U-512-GR",
    stock: 5,
    minStock: 15,
    category: "Samsung",
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    sku: "XM14P-256-WH",
    stock: 2,
    minStock: 8,
    category: "Xiaomi",
  },
  {
    id: 4,
    name: "OPPO Find X7 Ultra",
    sku: "OFX7U-512-BL",
    stock: 4,
    minStock: 10,
    category: "OPPO",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    sku: "APP2-USB-C",
    stock: 8,
    minStock: 20,
    category: "Accessories",
  },
];

export function LowStockAlerts() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle className="text-lg font-semibold">Low Stock Alerts</CardTitle>
        </div>
        <Badge variant="secondary" className="bg-warning/10 text-warning">
          {lowStockItems.length} items
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => {
            const stockPercentage = (item.stock / item.minStock) * 100;
            const isCritical = stockPercentage <= 30;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    SKU: {item.sku}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={stockPercentage}
                      className={`h-2 w-24 ${isCritical ? "[&>div]:bg-destructive" : "[&>div]:bg-warning"}`}
                    />
                    <span
                      className={`text-xs font-medium ${isCritical ? "text-destructive" : "text-warning"}`}
                    >
                      {item.stock}/{item.minStock}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="ml-4 shrink-0">
                  Restock
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
