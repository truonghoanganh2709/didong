"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Gift,
  ShoppingBag,
  Star,
  Calendar,
  Edit,
  Plus,
  History,
  Ticket,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockCustomers,
  mockOrders,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "@/lib/mock-data/sales";
import type { Customer } from "@/lib/types/sales";
import { toast } from "sonner";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [customerNotes, setCustomerNotes] = useState("");

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCustomerOrders = (customerId: string) => {
    return mockOrders.filter((order) => order.customer.id === customerId);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerNotes(customer.notes || "");
    setShowCustomerDetail(true);
  };

  const handleSaveNotes = () => {
    toast.success("Đã lưu ghi chú");
    setEditMode(false);
  };

  // Stats
  const totalCustomers = mockCustomers.length;
  const vipCustomers = mockCustomers.filter((c) => c.points >= 2000).length;
  const newCustomers = mockCustomers.filter(
    (c) =>
      new Date().getTime() - new Date(c.createdAt).getTime() <
      30 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="flex flex-col">
      <SalesHeader title="Quản lý khách hàng" />

      <div className="flex-1 p-4 lg:p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCustomers}</p>
                <p className="text-xs text-muted-foreground">Tổng khách hàng</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vipCustomers}</p>
                <p className="text-xs text-muted-foreground">Khách VIP</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Plus className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{newCustomers}</p>
                <p className="text-xs text-muted-foreground">Khách mới tháng</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Actions */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm tên, số điện thoại, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => setShowAddCustomer(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm khách
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="border-0 shadow-sm">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Điểm tích lũy
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Số lần mua
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Mua gần nhất
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">
                        Không tìm thấy khách hàng
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-secondary/50"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            {customer.points >= 2000 && (
                              <Badge
                                variant="outline"
                                className="text-xs text-warning border-warning"
                              >
                                <Star className="h-3 w-3 mr-1" />
                                VIP
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {customer.phone}
                          </div>
                          {customer.email && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Gift className="h-4 w-4 text-primary" />
                          <span className="font-semibold">
                            {customer.points.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            điểm
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                          <span>{customer.totalPurchases} lần</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {customer.lastPurchase ? (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(customer.lastPurchase).split(",")[0]}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCustomer(customer);
                          }}
                        >
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

      {/* Customer Detail Dialog */}
      <Dialog open={showCustomerDetail} onOpenChange={setShowCustomerDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="flex items-center gap-2">
                      {selectedCustomer.name}
                      {selectedCustomer.points >= 2000 && (
                        <Badge
                          variant="outline"
                          className="text-xs text-warning border-warning"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Khách hàng từ{" "}
                      {formatDate(selectedCustomer.createdAt).split(",")[0]}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">
                    Thông tin
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex-1">
                    Lịch sử mua
                  </TabsTrigger>
                  <TabsTrigger value="vouchers" className="flex-1">
                    Voucher
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-6 pr-4">
                      {/* Contact Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            Số điện thoại
                          </p>
                          <p className="font-medium">{selectedCustomer.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            Email
                          </p>
                          <p className="font-medium">
                            {selectedCustomer.email || "-"}
                          </p>
                        </div>
                        <div className="col-span-2 space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Địa chỉ
                          </p>
                          <p className="font-medium">
                            {selectedCustomer.address || "-"}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="border">
                          <CardContent className="p-4 text-center">
                            <Gift className="h-6 w-6 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">
                              {selectedCustomer.points.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Điểm tích lũy
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border">
                          <CardContent className="p-4 text-center">
                            <ShoppingBag className="h-6 w-6 text-info mx-auto mb-2" />
                            <p className="text-2xl font-bold">
                              {selectedCustomer.totalPurchases}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Lần mua
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border">
                          <CardContent className="p-4 text-center">
                            <Ticket className="h-6 w-6 text-warning mx-auto mb-2" />
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-xs text-muted-foreground">
                              Voucher
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <Separator />

                      {/* Notes */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold">Ghi chú</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditMode(!editMode)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {editMode ? "Hủy" : "Sửa"}
                          </Button>
                        </div>
                        {editMode ? (
                          <div className="space-y-2">
                            <Textarea
                              value={customerNotes}
                              onChange={(e) => setCustomerNotes(e.target.value)}
                              placeholder="Thêm ghi chú về khách hàng..."
                              rows={3}
                            />
                            <Button size="sm" onClick={handleSaveNotes}>
                              Lưu
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                            {selectedCustomer.notes || "Chưa có ghi chú"}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="orders" className="mt-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-2 pr-4">
                      {getCustomerOrders(selectedCustomer.id).length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Chưa có lịch sử mua hàng</p>
                        </div>
                      ) : (
                        getCustomerOrders(selectedCustomer.id).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                          >
                            <div>
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.createdAt)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.items.length} sản phẩm
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {formatCurrency(order.total)}
                              </p>
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusLabel(order.status)}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="vouchers" className="mt-4">
                  <ScrollArea className="h-80">
                    <div className="space-y-2 pr-4">
                      {/* Sample vouchers */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-primary bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Ticket className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">Giảm 10%</p>
                            <p className="text-xs text-muted-foreground">
                              Đơn từ 5 triệu
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">VIP10</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            HSD: 30/04/2024
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-success bg-success/5">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-success/20 flex items-center justify-center">
                            <Gift className="h-6 w-6 text-success" />
                          </div>
                          <div>
                            <p className="font-semibold">Giảm 500K</p>
                            <p className="text-xs text-muted-foreground">
                              Đổi 1000 điểm
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="border-success">
                            POINT500
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            HSD: 31/05/2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input id="name" placeholder="Nhập họ tên" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input id="phone" placeholder="Nhập số điện thoại" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Nhập email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Textarea id="address" placeholder="Nhập địa chỉ" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea id="notes" placeholder="Ghi chú về khách hàng..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCustomer(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                toast.success("Đã thêm khách hàng mới");
                setShowAddCustomer(false);
              }}
            >
              Thêm khách
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
