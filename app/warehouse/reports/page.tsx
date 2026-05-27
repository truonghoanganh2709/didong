"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { WarehouseHeader } from "@/components/warehouse/warehouse-header";
import { FileText, Download, Eye, Printer, Calendar, Filter, Search } from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: "inventory" | "import" | "export" | "audit" | "defective";
  createdAt: string;
  createdBy: string;
  period: string;
  status: "completed" | "processing" | "failed";
  fileSize: string;
}

const mockReports: Report[] = [
  {
    id: "RPT001",
    name: "Báo cáo tồn kho tháng 01/2024",
    type: "inventory",
    createdAt: "2024-01-31",
    createdBy: "Nguyễn Văn A",
    period: "01/2024",
    status: "completed",
    fileSize: "2.5 MB",
  },
  {
    id: "RPT002",
    name: "Báo cáo nhập hàng Q1/2024",
    type: "import",
    createdAt: "2024-03-31",
    createdBy: "Trần Thị B",
    period: "Q1/2024",
    status: "completed",
    fileSize: "5.2 MB",
  },
  {
    id: "RPT003",
    name: "Báo cáo xuất hàng tháng 02/2024",
    type: "export",
    createdAt: "2024-02-29",
    createdBy: "Lê Văn C",
    period: "02/2024",
    status: "completed",
    fileSize: "3.1 MB",
  },
  {
    id: "RPT004",
    name: "Báo cáo kiểm kê kho HCM",
    type: "audit",
    createdAt: "2024-01-15",
    createdBy: "Phạm Thị D",
    period: "01/2024",
    status: "completed",
    fileSize: "1.8 MB",
  },
  {
    id: "RPT005",
    name: "Báo cáo hàng lỗi Q1/2024",
    type: "defective",
    createdAt: "2024-03-31",
    createdBy: "Hoàng Văn E",
    period: "Q1/2024",
    status: "completed",
    fileSize: "890 KB",
  },
  {
    id: "RPT006",
    name: "Báo cáo tồn kho realtime",
    type: "inventory",
    createdAt: "2024-01-20",
    createdBy: "System",
    period: "20/01/2024",
    status: "processing",
    fileSize: "-",
  },
];

const reportTypeLabels: Record<string, string> = {
  inventory: "Tồn kho",
  import: "Nhập hàng",
  export: "Xuất hàng",
  audit: "Kiểm kê",
  defective: "Hàng lỗi",
};

const reportTypeColors: Record<string, string> = {
  inventory: "bg-blue-100 text-blue-700",
  import: "bg-green-100 text-green-700",
  export: "bg-orange-100 text-orange-700",
  audit: "bg-purple-100 text-purple-700",
  defective: "bg-red-100 text-red-700",
};

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    type: "",
    period: "",
    warehouse: "",
  });

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateReport = () => {
    console.log("Creating report:", newReport);
    setIsCreateDialogOpen(false);
    setNewReport({ type: "", period: "", warehouse: "" });
  };

  return (
    <div className="flex flex-col h-full">
      <WarehouseHeader
        title="Báo Cáo"
        description="Tạo và quản lý các báo cáo kho hàng"
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng báo cáo</p>
                  <p className="text-2xl font-bold">{mockReports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hoàn thành</p>
                  <p className="text-2xl font-bold">
                    {mockReports.filter((r) => r.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <FileText className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Đang xử lý</p>
                  <p className="text-2xl font-bold">
                    {mockReports.filter((r) => r.status === "processing").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tháng này</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Danh Sách Báo Cáo</CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <FileText className="h-4 w-4 mr-2" />
                    Tạo Báo Cáo Mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tạo Báo Cáo Mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Loại báo cáo</Label>
                      <Select
                        value={newReport.type}
                        onValueChange={(value) =>
                          setNewReport({ ...newReport, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại báo cáo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inventory">Báo cáo tồn kho</SelectItem>
                          <SelectItem value="import">Báo cáo nhập hàng</SelectItem>
                          <SelectItem value="export">Báo cáo xuất hàng</SelectItem>
                          <SelectItem value="audit">Báo cáo kiểm kê</SelectItem>
                          <SelectItem value="defective">Báo cáo hàng lỗi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Kỳ báo cáo</Label>
                      <Select
                        value={newReport.period}
                        onValueChange={(value) =>
                          setNewReport({ ...newReport, period: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn kỳ báo cáo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Hàng ngày</SelectItem>
                          <SelectItem value="weekly">Hàng tuần</SelectItem>
                          <SelectItem value="monthly">Hàng tháng</SelectItem>
                          <SelectItem value="quarterly">Hàng quý</SelectItem>
                          <SelectItem value="yearly">Hàng năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Kho hàng</Label>
                      <Select
                        value={newReport.warehouse}
                        onValueChange={(value) =>
                          setNewReport({ ...newReport, warehouse: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn kho hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả kho</SelectItem>
                          <SelectItem value="hcm">Kho HCM</SelectItem>
                          <SelectItem value="hn">Kho Hà Nội</SelectItem>
                          <SelectItem value="dn">Kho Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm báo cáo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="inventory">Tồn kho</SelectItem>
                  <SelectItem value="import">Nhập hàng</SelectItem>
                  <SelectItem value="export">Xuất hàng</SelectItem>
                  <SelectItem value="audit">Kiểm kê</SelectItem>
                  <SelectItem value="defective">Hàng lỗi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reports Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Mã BC</TableHead>
                    <TableHead>Tên báo cáo</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Kỳ báo cáo</TableHead>
                    <TableHead>Người tạo</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Dung lượng</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {report.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={reportTypeColors[report.type]}
                        >
                          {reportTypeLabels[report.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.createdBy}</TableCell>
                      <TableCell>{report.createdAt}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "completed"
                              ? "default"
                              : report.status === "processing"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            report.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : report.status === "processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : ""
                          }
                        >
                          {report.status === "completed"
                            ? "Hoàn thành"
                            : report.status === "processing"
                            ? "Đang xử lý"
                            : "Lỗi"}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.fileSize}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Xem">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Tải xuống"
                            disabled={report.status !== "completed"}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="In"
                            disabled={report.status !== "completed"}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
