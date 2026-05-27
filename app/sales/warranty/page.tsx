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
  Shield,
  Smartphone,
  Plus,
  Clock,
  Wrench,
  CheckCircle,
  AlertCircle,
  History,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockWarrantyTickets,
  mockProducts,
  mockCustomers,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "@/lib/mock-data/sales";
import type { WarrantyTicket } from "@/lib/types/sales";
import { toast } from "sonner";

const warrantyStatusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "received", label: "Đã tiếp nhận" },
  { value: "diagnosing", label: "Đang kiểm tra" },
  { value: "repairing", label: "Đang sửa" },
  { value: "ready", label: "Sẵn sàng trả" },
  { value: "returned", label: "Đã trả" },
];

export default function WarrantyPage() {
  const [tickets, setTickets] = useState<WarrantyTicket[]>(mockWarrantyTickets);
  const [selectedTicket, setSelectedTicket] = useState<WarrantyTicket | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [imeiSearch, setImeiSearch] = useState("");
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showIMEICheck, setShowIMEICheck] = useState(false);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.imei.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleIMEICheck = () => {
    if (!imeiSearch) {
      toast.error("Vui lòng nhập số IMEI");
      return;
    }

    // Simulate IMEI check
    const warranty = {
      valid: true,
      product: mockProducts[0],
      purchaseDate: new Date("2024-01-15"),
      expiryDate: new Date("2025-01-15"),
    };

    toast.success("Tìm thấy thông tin bảo hành", {
      description: `Sản phẩm: ${warranty.product.name}`,
    });
  };

  // Stats
  const pendingCount = tickets.filter(
    (t) => t.status === "received" || t.status === "diagnosing"
  ).length;
  const repairingCount = tickets.filter(
    (t) => t.status === "repairing"
  ).length;
  const readyCount = tickets.filter((t) => t.status === "ready").length;

  return (
    <div className="flex flex-col">
      <SalesHeader title="Quản lý bảo hành" />

      <div className="flex-1 p-4 lg:p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Chờ xử lý</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{repairingCount}</p>
                <p className="text-xs text-muted-foreground">Đang sửa</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{readyCount}</p>
                <p className="text-xs text-muted-foreground">Sẵn sàng trả</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className="border-0 shadow-sm bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => setShowIMEICheck(true)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Tra cứu IMEI</p>
                <p className="text-xs text-muted-foreground">
                  Kiểm tra bảo hành
                </p>
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
                  {warrantyStatusFilters.map((filter) => (
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
                    placeholder="Tìm mã phiếu, tên, IMEI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button onClick={() => setShowCreateTicket(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo phiếu BH
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warranty Table */}
        <Card className="border-0 shadow-sm">
          <ScrollArea className="h-[calc(100vh-380px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Mã phiếu</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="hidden md:table-cell">IMEI</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Hạn BH
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">
                        Không có phiếu bảo hành nào
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer hover:bg-secondary/50"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowTicketDetail(true);
                      }}
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <span>{ticket.ticketNumber}</span>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(ticket.createdAt).split(",")[0]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{ticket.customer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {ticket.customer.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-36">
                            {ticket.product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs">
                        {ticket.imei}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(ticket.status)}`}
                        >
                          {getStatusLabel(ticket.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          {new Date() < ticket.warrantyExpiry ? (
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Còn hạn
                            </span>
                          ) : (
                            <span className="text-destructive flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Hết hạn
                            </span>
                          )}
                        </div>
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

      {/* Ticket Detail Dialog */}
      <Dialog open={showTicketDetail} onOpenChange={setShowTicketDetail}>
        <DialogContent className="max-w-2xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Phiếu bảo hành {selectedTicket.ticketNumber}</span>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {getStatusLabel(selectedTicket.status)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer & Product Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Khách hàng
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>{selectedTicket.customer.name}</p>
                      <p className="text-muted-foreground">
                        {selectedTicket.customer.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Sản phẩm
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>{selectedTicket.product.name}</p>
                      <p className="text-muted-foreground font-mono">
                        IMEI: {selectedTicket.imei}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Issue */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Lỗi / Triệu chứng
                  </h4>
                  <p className="text-sm bg-secondary/50 p-3 rounded-lg">
                    {selectedTicket.issue}
                  </p>
                </div>

                {/* Warranty Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Ngày tiếp nhận
                    </p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedTicket.createdAt).split(",")[0]}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Hạn bảo hành
                    </p>
                    <p
                      className={`font-medium flex items-center gap-1 ${
                        new Date() < selectedTicket.warrantyExpiry
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      {formatDate(selectedTicket.warrantyExpiry).split(",")[0]}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {selectedTicket.notes && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ghi chú xử lý
                    </h4>
                    <p className="text-sm bg-secondary/50 p-3 rounded-lg">
                      {selectedTicket.notes}
                    </p>
                  </div>
                )}

                {/* Status Update */}
                <div>
                  <h4 className="font-semibold mb-2">Cập nhật trạng thái</h4>
                  <Select defaultValue={selectedTicket.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Đã tiếp nhận</SelectItem>
                      <SelectItem value="diagnosing">Đang kiểm tra</SelectItem>
                      <SelectItem value="repairing">Đang sửa chữa</SelectItem>
                      <SelectItem value="ready">Sẵn sàng trả</SelectItem>
                      <SelectItem value="returned">Đã trả khách</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowTicketDetail(false)}
                >
                  Đóng
                </Button>
                <Button onClick={() => toast.success("Đã cập nhật phiếu bảo hành")}>
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* IMEI Check Dialog */}
      <Dialog open={showIMEICheck} onOpenChange={setShowIMEICheck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tra cứu bảo hành theo IMEI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Số IMEI</Label>
              <Input
                placeholder="Nhập số IMEI..."
                value={imeiSearch}
                onChange={(e) => setImeiSearch(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleIMEICheck}>
              <Search className="mr-2 h-4 w-4" />
              Tra cứu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Ticket Dialog */}
      <Dialog open={showCreateTicket} onOpenChange={setShowCreateTicket}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo phiếu bảo hành mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Số IMEI *</Label>
              <Input placeholder="Nhập số IMEI sản phẩm" />
            </div>
            <div className="space-y-2">
              <Label>Khách hàng *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khách hàng" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mô tả lỗi *</Label>
              <Textarea placeholder="Mô tả triệu chứng, lỗi của sản phẩm..." />
            </div>
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea placeholder="Ghi chú thêm..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateTicket(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                toast.success("Đã tạo phiếu bảo hành mới");
                setShowCreateTicket(false);
              }}
            >
              Tạo phiếu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
