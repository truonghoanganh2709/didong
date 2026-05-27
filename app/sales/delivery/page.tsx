"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Truck,
  Package,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Navigation,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockDeliveries,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "@/lib/mock-data/sales";
import type { Delivery } from "@/lib/types/sales";
import { toast } from "sonner";

const deliveryStatusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ lấy" },
  { value: "picked_up", label: "Đã lấy" },
  { value: "in_transit", label: "Đang giao" },
  { value: "delivered", label: "Đã giao" },
  { value: "failed", label: "Thất bại" },
];

export default function DeliveryPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeliveryDetail, setShowDeliveryDetail] = useState(false);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesStatus =
      statusFilter === "all" || delivery.status === statusFilter;
    const matchesSearch =
      delivery.order.orderNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      delivery.order.customer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      delivery.shipper?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (deliveryId: string, newStatus: Delivery["status"]) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === deliveryId
          ? { ...d, status: newStatus, actualDelivery: newStatus === "delivered" ? new Date() : undefined }
          : d
      )
    );
    toast.success(`Đã cập nhật trạng thái thành "${getStatusLabel(newStatus)}"`);
  };

  // Stats
  const pendingCount = deliveries.filter((d) => d.status === "pending").length;
  const inTransitCount = deliveries.filter(
    (d) => d.status === "in_transit"
  ).length;
  const deliveredCount = deliveries.filter(
    (d) => d.status === "delivered"
  ).length;

  return (
    <div className="flex flex-col">
      <SalesHeader title="Quản lý giao hàng" />

      <div className="flex-1 p-4 lg:p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Chờ lấy hàng</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inTransitCount}</p>
                <p className="text-xs text-muted-foreground">Đang vận chuyển</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deliveredCount}</p>
                <p className="text-xs text-muted-foreground">Đã giao</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <Tabs
                value={statusFilter}
                onValueChange={setStatusFilter}
                className="w-full lg:w-auto"
              >
                <TabsList className="h-auto flex-wrap">
                  {deliveryStatusFilters.map((filter) => (
                    <TabsTrigger
                      key={filter.value}
                      value={filter.value}
                      className="text-xs"
                    >
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm mã đơn, tên khách, shipper..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries Table */}
        <Card className="border-0 shadow-sm">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Địa chỉ giao
                  </TableHead>
                  <TableHead>Shipper</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Dự kiến giao
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">
                        Không có đơn giao nào
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDeliveries.map((delivery) => (
                    <TableRow
                      key={delivery.id}
                      className="cursor-pointer hover:bg-secondary/50"
                      onClick={() => {
                        setSelectedDelivery(delivery);
                        setShowDeliveryDetail(true);
                      }}
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <span>{delivery.order.orderNumber}</span>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(delivery.order.total)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {delivery.order.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {delivery.order.customer.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-start gap-1 max-w-48">
                          <MapPin className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-sm truncate">
                            {delivery.order.shippingAddress || "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {delivery.shipper ? (
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-info/10 flex items-center justify-center">
                              <Truck className="h-4 w-4 text-info" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {delivery.shipper.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {delivery.shipper.phone}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Chưa phân công
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            delivery.status
                          )}`}
                        >
                          {getStatusLabel(delivery.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {delivery.estimatedDelivery ? (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDate(delivery.estimatedDelivery)}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>

      {/* Delivery Detail Dialog */}
      <Dialog open={showDeliveryDetail} onOpenChange={setShowDeliveryDetail}>
        <DialogContent className="max-w-lg">
          {selectedDelivery && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Chi tiết giao hàng</span>
                  <Badge className={getStatusColor(selectedDelivery.status)}>
                    {getStatusLabel(selectedDelivery.status)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Order Info */}
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      {selectedDelivery.order.orderNumber}
                    </span>
                    <span className="font-bold text-primary">
                      {formatCurrency(selectedDelivery.order.total)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedDelivery.order.items.length} sản phẩm
                  </p>
                </div>

                {/* Customer Info */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Khách hàng
                  </h4>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {selectedDelivery.order.customer.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedDelivery.order.customer.phone}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toast.info(
                            `Đang gọi ${selectedDelivery.order.customer.phone}`
                          )
                        }
                      >
                        Gọi
                      </Button>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{selectedDelivery.order.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Shipper Info */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Shipper
                  </h4>
                  {selectedDelivery.shipper ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-info" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {selectedDelivery.shipper.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedDelivery.shipper.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast.info(
                              `Đang gọi ${selectedDelivery.shipper?.phone}`
                            )
                          }
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Chưa phân công shipper</p>
                  )}
                </div>

                <Separator />

                {/* Status Actions */}
                <div>
                  <h4 className="font-semibold mb-2">Cập nhật trạng thái</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDelivery.status !== "delivered" &&
                      selectedDelivery.status !== "failed" && (
                        <>
                          {selectedDelivery.status === "pending" && (
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleUpdateStatus(
                                  selectedDelivery.id,
                                  "picked_up"
                                )
                              }
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Đã lấy hàng
                            </Button>
                          )}
                          {(selectedDelivery.status === "picked_up" ||
                            selectedDelivery.status === "pending") && (
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleUpdateStatus(
                                  selectedDelivery.id,
                                  "in_transit"
                                )
                              }
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Đang giao
                            </Button>
                          )}
                          <Button
                            className="bg-success hover:bg-success/90"
                            onClick={() => {
                              handleUpdateStatus(selectedDelivery.id, "delivered");
                              setShowDeliveryDetail(false);
                            }}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Giao thành công
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleUpdateStatus(selectedDelivery.id, "failed")
                            }
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Giao thất bại
                          </Button>
                        </>
                      )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeliveryDetail(false)}
                >
                  Đóng
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
