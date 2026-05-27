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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { warehouseActivities, formatDate } from "@/lib/warehouse-data"
import {
  Search,
  History,
  PackagePlus,
  PackageMinus,
  RefreshCw,
  ClipboardCheck,
  Truck,
  CalendarIcon,
  Download,
  Filter
} from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

const activityConfig = {
  import: { icon: PackagePlus, label: "Nhập kho", color: "bg-green-100 text-green-800" },
  export: { icon: PackageMinus, label: "Xuất kho", color: "bg-blue-100 text-blue-800" },
  adjust: { icon: RefreshCw, label: "Chỉnh tồn", color: "bg-yellow-100 text-yellow-800" },
  audit: { icon: ClipboardCheck, label: "Kiểm kho", color: "bg-purple-100 text-purple-800" },
  transfer: { icon: Truck, label: "Chuyển kho", color: "bg-orange-100 text-orange-800" }
}

// Extended mock data for history
const extendedActivities = [
  ...warehouseActivities,
  {
    id: "9",
    type: "import" as const,
    description: "Nhập hàng từ Xiaomi Vietnam",
    createdAt: "2024-01-13T11:00:00",
    createdBy: "Lê Văn Cường",
    details: "15 Xiaomi 14 Ultra, 20 Redmi Note 13 Pro"
  },
  {
    id: "10",
    type: "export" as const,
    description: "Xuất hàng cho đơn online #DH2024001220",
    createdAt: "2024-01-13T09:30:00",
    createdBy: "Phạm Thị Dung",
    details: "1 Samsung Galaxy S24 Ultra"
  },
  {
    id: "11",
    type: "adjust" as const,
    description: "Điều chỉnh tồn kho sau kiểm kê",
    createdAt: "2024-01-12T17:00:00",
    createdBy: "Nguyễn Văn An",
    details: "iPhone 15 Pro Max: -2 (mất hàng)"
  },
  {
    id: "12",
    type: "transfer" as const,
    description: "Chuyển hàng đến CH Lê Văn Sỹ",
    createdAt: "2024-01-12T14:00:00",
    createdBy: "Trần Thị Bình",
    details: "8 Samsung Galaxy S24 Ultra"
  },
  {
    id: "13",
    type: "audit" as const,
    description: "Hoàn thành kiểm kho định kỳ",
    createdAt: "2024-01-10T18:00:00",
    createdBy: "Nguyễn Văn An",
    details: "Phiên kiểm kho KK-2024-000089"
  },
  {
    id: "14",
    type: "import" as const,
    description: "Nhập hàng từ OPPO Vietnam",
    createdAt: "2024-01-10T10:00:00",
    createdBy: "Hoàng Văn Em",
    details: "10 OPPO Find X6 Pro"
  }
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [date, setDate] = useState<Date>()

  const employees = [...new Set(extendedActivities.map(a => a.createdBy))]

  const filteredActivities = extendedActivities.filter((activity) => {
    const matchesSearch =
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || activity.type === typeFilter
    const matchesEmployee = employeeFilter === "all" || activity.createdBy === employeeFilter
    const matchesDate = !date || activity.createdAt.startsWith(format(date, "yyyy-MM-dd"))
    return matchesSearch && matchesType && matchesEmployee && matchesDate
  })

  const handleExport = () => {
    toast.info("Đang xuất lịch sử...", {
      description: "File Excel sẽ được tải xuống trong giây lát"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lịch sử kho</h1>
          <p className="text-muted-foreground">Theo dõi tất cả hoạt động trong kho</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(activityConfig).map(([key, config]) => {
          const count = extendedActivities.filter(a => a.type === key).length
          return (
            <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTypeFilter(key)}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-lg p-2", config.color.split(" ")[0])}>
                    <config.icon className={cn("h-5 w-5", config.color.split(" ")[1])} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                    <p className="text-xl font-bold">{count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm hoạt động..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Loại thao tác" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                {Object.entries(activityConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Nhân viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhân viên</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {(typeFilter !== "all" || employeeFilter !== "all" || date) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setTypeFilter("all")
                  setEmployeeFilter("all")
                  setDate(undefined)
                }}
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <History className="h-5 w-5" />
            Lịch sử hoạt động ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[140px]">Loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Chi tiết</TableHead>
                <TableHead>Người thao tác</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => {
                const config = activityConfig[activity.type as keyof typeof activityConfig]
                return (
                  <TableRow key={activity.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Badge className={cn("gap-1", config.color)}>
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{activity.description}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[300px] truncate">
                      {activity.details}
                    </TableCell>
                    <TableCell>{activity.createdBy}</TableCell>
                    <TableCell>{formatDate(activity.createdAt)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
