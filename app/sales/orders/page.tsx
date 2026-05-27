"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Phone,
  MessageSquare,
  Printer,
  MoreVertical,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  Volume2,
  VolumeX,
  RefreshCw,
  Eye,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockOrders,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "@/lib/mock-data/sales";
import type { Order, OrderStatus } from "@/lib/types/sales";
import { toast } from "sonner";

const orderStatusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Simulate realtime new order notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (soundEnabled && Math.random() > 0.9) {
        toast.info("Có đơn hàng mới!", {
          description: "Đơn hàng DH240327006 vừa được tạo",
          action: {
            label: "Xem",
            onClick: () => {},
          },
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );
    toast.success(`Đã cập nhật trạng thái đơn hàng thành "${getStatusLabel(newStatus)}"`);
  };

  const handleConfirmOrder = (order: Order) => {
    handleStatusChange(order.id, "confirmed");
  };

  const handleCancelOrder = (order: Order) => {
    handleStatusChange(order.id, "cancelled");
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const shippingCount = orders.filter((o) => o.status === "shipping").length;

  return (
    <div className="flex flex-col">
      <SalesHeader title="Quản lý đơn hàng Online" />

      <div className="flex-1 p-4 lg:p-6 space-y-4">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-warning/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Chờ xác nhận</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-info/10">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-info" />
              <div>
                <p className="text-2xl font-bold">{confirmedCount}</p>
                <p className="text-xs text-muted-foreground">Đã xác nhận</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-primary/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{shippingCount}</p>
                <p className="text-xs text-muted-foreground">Đang giao</p>
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
                  {orderStatusFilters.map((filter) => (
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

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Tìm mã đơn, tên, SĐT..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-0 shadow-sm">
          <ScrollArea className="h-[calc(100vh-380px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="hidden md:table-cell">Sản phẩm</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Thanh toán
                  </TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">
                        Không có đơn hàng nào
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className={`cursor-pointer hover:bg-secondary/50 ${
                        order.status === "pending"
                          ? "bg-warning/5 animate-pulse-dot"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetail(true);
                      }}
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <span>{order.orderNumber}</span>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.customer.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item) => (
                            <p
                              key={item.id}
                              className="text-sm truncate max-w-48"
                            >
                              {item.product.name} x{item.quantity}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{order.items.length - 2} sản phẩm khác
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(
                              order.paymentMethod
                            )}`}
                          >
                            {getStatusLabel(order.paymentMethod)}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              order.paymentStatus
                            )}`}
                          >
                            {getStatusLabel(order.paymentStatus)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setShowOrderDetail(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.info(`Đang gọi ${order.customer.phone}`);
                              }}
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Gọi khách
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Chat với khách
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Printer className="mr-2 h-4 w-4" />
                              In hóa đơn
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {order.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleConfirmOrder(order);
                                  }}
                                  className="text-success"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Xác nhận đơn
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelOrder(order);
                                  }}
                                  className="text-destructive"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Hủy đơn
                                </DropdownMenuItem>
                              </>
                            )}
                            {order.status === "confirmed" && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(order.id, "shipping");
                                }}
                              >
                                <Truck className="mr-2 h-4 w-4" />
                                Chuyển sang giao hàng
                              </DropdownMenuItem>
                            )}
                            {order.status === "shipping" && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(order.id, "completed");
                                }}
                                className="text-success"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Hoàn thành đơn
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Chi tiết đơn hàng {selectedOrder.orderNumber}</span>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {getStatusLabel(selectedOrder.status)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold mb-2">Thông tin khách hàng</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Họ tên</p>
                        <p className="font-medium">
                          {selectedOrder.customer.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Số điện thoại</p>
                        <p className="font-medium">
                          {selectedOrder.customer.phone}
                        </p>
                      </div>
                      {selectedOrder.shippingAddress && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Địa chỉ giao</p>
                          <p className="font-medium">
                            {selectedOrder.shippingAddress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Products */}
                  <div>
                    <h4 className="font-semibold mb-2">Sản phẩm</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                {item.product.brand.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                SKU: {item.product.sku}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatCurrency(item.price)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              x{item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-semibold mb-2">Thanh toán</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giảm giá</span>
                        <span className="text-destructive">
                          -{formatCurrency(selectedOrder.discount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT (10%)</span>
                        <span>{formatCurrency(selectedOrder.vat)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Tổng cộng</span>
                        <span className="text-primary">
                          {formatCurrency(selectedOrder.total)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(
                            selectedOrder.paymentMethod
                          )}
                        >
                          {getStatusLabel(selectedOrder.paymentMethod)}
                        </Badge>
                        <Badge
                          className={getStatusColor(
                            selectedOrder.paymentStatus
                          )}
                        >
                          {getStatusLabel(selectedOrder.paymentStatus)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Status Change */}
                  {selectedOrder.status !== "completed" &&
                    selectedOrder.status !== "cancelled" && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">
                            Cập nhật trạng thái
                          </h4>
                          <Select
                            value={selectedOrder.status}
                            onValueChange={(value) =>
                              handleStatusChange(
                                selectedOrder.id,
                                value as OrderStatus
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">
                                Chờ xác nhận
                              </SelectItem>
                              <SelectItem value="confirmed">
                                Đã xác nhận
                              </SelectItem>
                              <SelectItem value="shipping">Đang giao</SelectItem>
                              <SelectItem value="completed">
                                Hoàn thành
                              </SelectItem>
                              <SelectItem value="cancelled">Đã hủy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                </div>
              </ScrollArea>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => toast.info("Đang gọi...")}>
                  <Phone className="mr-2 h-4 w-4" />
                  Gọi khách
                </Button>
                <Button variant="outline" onClick={() => toast.info("Đang in...")}>
                  <Printer className="mr-2 h-4 w-4" />
                  In hóa đơn
                </Button>
                {selectedOrder.status === "pending" && (
                  <Button
                    onClick={() => {
                      handleConfirmOrder(selectedOrder);
                      setShowOrderDetail(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Xác nhận đơn
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
