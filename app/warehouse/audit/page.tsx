"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/warehouse/status-badge"
import { auditSessions, formatDate } from "@/lib/warehouse-data"
import {
  Plus,
  Search,
  ClipboardCheck,
  Eye,
  Barcode,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<typeof auditSessions[0] | null>(null)
  const [barcodeInput, setBarcodeInput] = useState("")
  const [actualQty, setActualQty] = useState<number>(0)

  const filteredSessions = auditSessions.filter((session) => {
    const matchesSearch = session.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleScanBarcode = () => {
    if (barcodeInput) {
      toast.success("Đã quét sản phẩm", {
        description: `IMEI: ${barcodeInput}`
      })
      setBarcodeInput("")
    }
  }

  const handleCreateSession = () => {
    toast.success("Tạo phiên kiểm kho thành công", {
      description: "Phiên kiểm kho KK-2024-000091 đã được tạo"
    })
    setIsCreateOpen(false)
  }

  const handleCompleteAudit = (sessionId: string) => {
    toast.success("Hoàn thành kiểm kho", {
      description: "Phiên kiểm kho đã được hoàn thành và lưu báo cáo"
    })
  }

  const handleExportReport = (sessionId: string) => {
    toast.info("Đang xuất báo cáo...", {
      description: "Báo cáo kiểm kho sẽ được tải xuống trong giây lát"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kiểm kho</h1>
          <p className="text-muted-foreground">Quản lý phiên kiểm kho và đối chiếu tồn kho</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo phiên kiểm kho
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Tạo phiên kiểm kho mới</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 p-1">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Mã phiên kiểm kho</Label>
                    <Input value="KK-2024-000091" disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày kiểm kho</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <Separator />

                {/* Barcode Scanner */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Quét barcode kiểm kho</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Quét IMEI/mã sản phẩm..."
                        className="pl-10"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleScanBarcode()}
                      />
                    </div>
                    <Input
                      type="number"
                      placeholder="SL thực tế"
                      className="w-32"
                      value={actualQty || ""}
                      onChange={(e) => setActualQty(parseInt(e.target.value) || 0)}
                    />
                    <Button onClick={handleScanBarcode}>Thêm</Button>
                  </div>
                </div>

                {/* Sample Audit Items */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Danh sách kiểm kho</Label>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>IMEI</TableHead>
                          <TableHead className="text-center">SL hệ thống</TableHead>
                          <TableHead className="text-center">SL thực tế</TableHead>
                          <TableHead className="text-center">Chênh lệch</TableHead>
                          <TableHead>Lý do</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            Quét barcode để bắt đầu kiểm kho
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea placeholder="Nhập ghi chú cho phiên kiểm kho..." />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button variant="secondary" onClick={handleCreateSession}>Lưu nháp</Button>
              <Button onClick={handleCreateSession}>Bắt đầu kiểm kho</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm mã phiên kiểm kho..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant={statusFilter === "all" ? "secondary" : "outline"} onClick={() => setStatusFilter("all")}>
              Tất cả
            </Button>
            <Button variant={statusFilter === "in_progress" ? "secondary" : "outline"} onClick={() => setStatusFilter("in_progress")}>
              Đang kiểm
            </Button>
            <Button variant={statusFilter === "completed" ? "secondary" : "outline"} onClick={() => setStatusFilter("completed")}>
              Hoàn thành
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Danh sách phiên kiểm kho ({filteredSessions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Mã phiên</TableHead>
                <TableHead>Ngày kiểm</TableHead>
                <TableHead>Người kiểm</TableHead>
                <TableHead className="text-center">Số SP kiểm</TableHead>
                <TableHead className="text-center">Chênh lệch</TableHead>
                <TableHead>Tiến độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => {
                const totalDifference = session.items.reduce((sum, item) => sum + Math.abs(item.difference), 0)
                const progress = session.status === "completed" ? 100 : 65
                return (
                  <TableRow key={session.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono font-medium text-primary">{session.code}</TableCell>
                    <TableCell>{formatDate(session.createdAt)}</TableCell>
                    <TableCell>{session.createdBy}</TableCell>
                    <TableCell className="text-center">{session.items.length}</TableCell>
                    <TableCell className="text-center">
                      {totalDifference > 0 ? (
                        <span className="flex items-center justify-center gap-1 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {totalDifference}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          0
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2 w-20" />
                        <span className="text-xs text-muted-foreground">{progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={session.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedSession(session)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          {session.status === "in_progress" && (
                            <DropdownMenuItem onClick={() => handleCompleteAudit(session.id)}>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Hoàn thành kiểm kho
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleExportReport(session.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Xuất báo cáo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Detail Modal */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chi tiết phiên kiểm kho {selectedSession?.code}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-muted-foreground">Ngày kiểm</Label>
                  <p>{formatDate(selectedSession.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Người kiểm</Label>
                  <p className="font-medium">{selectedSession.createdBy}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Số sản phẩm</Label>
                  <p className="font-medium">{selectedSession.items.length}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedSession.status} />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base font-medium">Kết quả kiểm kho</Label>
                <div className="rounded-lg border mt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>IMEI</TableHead>
                        <TableHead className="text-center">SL hệ thống</TableHead>
                        <TableHead className="text-center">SL thực tế</TableHead>
                        <TableHead className="text-center">Chênh lệch</TableHead>
                        <TableHead>Lý do</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedSession.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
                          <TableCell className="font-mono text-sm">{item.imei}</TableCell>
                          <TableCell className="text-center">{item.systemQty}</TableCell>
                          <TableCell className="text-center">{item.actualQty}</TableCell>
                          <TableCell className="text-center">
                            <span className={
                              item.difference === 0 ? "text-green-600" :
                              item.difference > 0 ? "text-blue-600" : "text-red-600"
                            }>
                              {item.difference > 0 ? `+${item.difference}` : item.difference}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.reason || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => handleExportReport(selectedSession.id)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất báo cáo
                </Button>
                {selectedSession.status === "in_progress" && (
                  <Button onClick={() => handleCompleteAudit(selectedSession.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Hoàn thành kiểm kho
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
