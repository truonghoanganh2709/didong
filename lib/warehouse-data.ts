// Types
export interface Product {
  id: string
  code: string
  name: string
  imei: string
  category: string
  quantity: number
  importPrice: number
  salePrice: number
  location: string
  status: "in_stock" | "low_stock" | "out_of_stock"
  image?: string
}

export interface Supplier {
  id: string
  name: string
  phone: string
  email: string
  address: string
  products: string[]
  debt: number
  totalOrders: number
}

export interface ImportOrder {
  id: string
  code: string
  supplierId: string
  supplierName: string
  products: ImportProduct[]
  totalAmount: number
  createdAt: string
  createdBy: string
  status: "draft" | "pending" | "completed"
  note?: string
}

export interface ImportProduct {
  productId: string
  productName: string
  imei: string
  quantity: number
  importPrice: number
}

export interface ExportOrder {
  id: string
  code: string
  type: "online" | "store" | "warranty"
  products: ExportProduct[]
  totalAmount: number
  createdAt: string
  createdBy: string
  receiver: string
  status: "pending" | "completed" | "cancelled"
  note?: string
}

export interface ExportProduct {
  productId: string
  productName: string
  imei: string
  quantity: number
  salePrice: number
}

export interface AuditSession {
  id: string
  code: string
  createdAt: string
  createdBy: string
  status: "in_progress" | "completed"
  items: AuditItem[]
}

export interface AuditItem {
  productId: string
  productName: string
  imei: string
  systemQty: number
  actualQty: number
  difference: number
  reason?: string
}

export interface TransferOrder {
  id: string
  code: string
  sourceWarehouse: string
  destWarehouse: string
  products: TransferProduct[]
  createdAt: string
  createdBy: string
  receiver?: string
  status: "pending" | "in_transit" | "received" | "cancelled"
}

export interface TransferProduct {
  productId: string
  productName: string
  imei: string
  quantity: number
}

export interface DefectiveProduct {
  id: string
  productId: string
  productCode: string
  productName: string
  imei: string
  defectType: string
  customerName?: string
  customerPhone?: string
  receivedAt: string
  status: "pending" | "processing" | "completed" | "returned"
  techNote?: string
}

export interface WarehouseActivity {
  id: string
  type: "import" | "export" | "adjust" | "audit" | "transfer"
  description: string
  createdAt: string
  createdBy: string
  details?: string
}

// Mock Data
export const products: Product[] = [
  {
    id: "1",
    code: "IP15PM-256-BK",
    name: "iPhone 15 Pro Max 256GB",
    imei: "353912100012345",
    category: "iPhone",
    quantity: 45,
    importPrice: 28500000,
    salePrice: 32990000,
    location: "Kệ A1-01",
    status: "in_stock"
  },
  {
    id: "2",
    code: "IP15PM-512-BL",
    name: "iPhone 15 Pro Max 512GB",
    imei: "353912100012346",
    category: "iPhone",
    quantity: 8,
    importPrice: 32000000,
    salePrice: 37990000,
    location: "Kệ A1-02",
    status: "low_stock"
  },
  {
    id: "3",
    code: "SS-S24U-256",
    name: "Samsung Galaxy S24 Ultra 256GB",
    imei: "354832100098765",
    category: "Samsung",
    quantity: 32,
    importPrice: 26000000,
    salePrice: 29990000,
    location: "Kệ B1-01",
    status: "in_stock"
  },
  {
    id: "4",
    code: "SS-ZF5-512",
    name: "Samsung Galaxy Z Fold 5 512GB",
    imei: "354832100098766",
    category: "Samsung",
    quantity: 0,
    importPrice: 35000000,
    salePrice: 41990000,
    location: "Kệ B1-02",
    status: "out_of_stock"
  },
  {
    id: "5",
    code: "XM-14U-256",
    name: "Xiaomi 14 Ultra 256GB",
    imei: "867322100054321",
    category: "Xiaomi",
    quantity: 15,
    importPrice: 18000000,
    salePrice: 22990000,
    location: "Kệ C1-01",
    status: "in_stock"
  },
  {
    id: "6",
    code: "OP-F6P-256",
    name: "OPPO Find X6 Pro 256GB",
    imei: "861234100067890",
    category: "OPPO",
    quantity: 5,
    importPrice: 19500000,
    salePrice: 23990000,
    location: "Kệ C2-01",
    status: "low_stock"
  },
  {
    id: "7",
    code: "IP14-128-BL",
    name: "iPhone 14 128GB",
    imei: "353912100023456",
    category: "iPhone",
    quantity: 62,
    importPrice: 17000000,
    salePrice: 19990000,
    location: "Kệ A2-01",
    status: "in_stock"
  },
  {
    id: "8",
    code: "SS-A54-128",
    name: "Samsung Galaxy A54 128GB",
    imei: "354832100087654",
    category: "Samsung",
    quantity: 0,
    importPrice: 8500000,
    salePrice: 10490000,
    location: "Kệ B2-01",
    status: "out_of_stock"
  },
  {
    id: "9",
    code: "IP15-256-PK",
    name: "iPhone 15 256GB Pink",
    imei: "353912100034567",
    category: "iPhone",
    quantity: 28,
    importPrice: 21000000,
    salePrice: 24990000,
    location: "Kệ A1-03",
    status: "in_stock"
  },
  {
    id: "10",
    code: "VV-V30-256",
    name: "Vivo V30 Pro 256GB",
    imei: "862543100012345",
    category: "Vivo",
    quantity: 3,
    importPrice: 11000000,
    salePrice: 13990000,
    location: "Kệ D1-01",
    status: "low_stock"
  }
]

export const suppliers: Supplier[] = [
  {
    id: "1",
    name: "Apple Vietnam Distribution",
    phone: "028 3820 1234",
    email: "contact@applevn.com",
    address: "Tầng 15, Bitexco Tower, Q.1, TP.HCM",
    products: ["iPhone 15 Pro Max", "iPhone 15", "iPhone 14"],
    debt: 2500000000,
    totalOrders: 156
  },
  {
    id: "2",
    name: "Samsung SEHC Vietnam",
    phone: "028 3821 5678",
    email: "b2b@samsung.vn",
    address: "KCN Yên Phong, Bắc Ninh",
    products: ["Galaxy S24 Ultra", "Galaxy Z Fold 5", "Galaxy A54"],
    debt: 1800000000,
    totalOrders: 142
  },
  {
    id: "3",
    name: "Xiaomi Vietnam Official",
    phone: "028 3822 9012",
    email: "wholesale@xiaomi.vn",
    address: "Tòa nhà Etown, Q. Tân Bình, TP.HCM",
    products: ["Xiaomi 14 Ultra", "Redmi Note 13 Pro"],
    debt: 450000000,
    totalOrders: 89
  },
  {
    id: "4",
    name: "OPPO Vietnam",
    phone: "028 3823 3456",
    email: "partner@oppo.vn",
    address: "Tầng 8, Vincom Center, Q.1, TP.HCM",
    products: ["OPPO Find X6 Pro", "OPPO Reno 10 Pro"],
    debt: 320000000,
    totalOrders: 67
  },
  {
    id: "5",
    name: "Vivo Vietnam Distribution",
    phone: "028 3824 7890",
    email: "sales@vivo.vn",
    address: "Tòa nhà Saigon Centre, Q.1, TP.HCM",
    products: ["Vivo V30 Pro", "Vivo Y100"],
    debt: 180000000,
    totalOrders: 45
  }
]

export const importOrders: ImportOrder[] = [
  {
    id: "1",
    code: "PN-2024-001245",
    supplierId: "1",
    supplierName: "Apple Vietnam Distribution",
    products: [
      { productId: "1", productName: "iPhone 15 Pro Max 256GB", imei: "353912100099001", quantity: 20, importPrice: 28500000 },
      { productId: "7", productName: "iPhone 14 128GB", imei: "353912100099002", quantity: 15, importPrice: 17000000 }
    ],
    totalAmount: 825000000,
    createdAt: "2024-01-15T09:30:00",
    createdBy: "Nguyễn Văn An",
    status: "completed"
  },
  {
    id: "2",
    code: "PN-2024-001246",
    supplierId: "2",
    supplierName: "Samsung SEHC Vietnam",
    products: [
      { productId: "3", productName: "Samsung Galaxy S24 Ultra 256GB", imei: "354832100099001", quantity: 25, importPrice: 26000000 }
    ],
    totalAmount: 650000000,
    createdAt: "2024-01-15T14:20:00",
    createdBy: "Trần Thị Bình",
    status: "completed"
  },
  {
    id: "3",
    code: "PN-2024-001247",
    supplierId: "1",
    supplierName: "Apple Vietnam Distribution",
    products: [
      { productId: "2", productName: "iPhone 15 Pro Max 512GB", imei: "353912100099003", quantity: 10, importPrice: 32000000 }
    ],
    totalAmount: 320000000,
    createdAt: "2024-01-16T08:00:00",
    createdBy: "Nguyễn Văn An",
    status: "pending"
  },
  {
    id: "4",
    code: "PN-2024-001248",
    supplierId: "3",
    supplierName: "Xiaomi Vietnam Official",
    products: [
      { productId: "5", productName: "Xiaomi 14 Ultra 256GB", imei: "867322100099001", quantity: 30, importPrice: 18000000 }
    ],
    totalAmount: 540000000,
    createdAt: "2024-01-16T10:30:00",
    createdBy: "Lê Văn Cường",
    status: "draft"
  }
]

export const exportOrders: ExportOrder[] = [
  {
    id: "1",
    code: "PX-2024-002145",
    type: "online",
    products: [
      { productId: "1", productName: "iPhone 15 Pro Max 256GB", imei: "353912100012345", quantity: 1, salePrice: 32990000 }
    ],
    totalAmount: 32990000,
    createdAt: "2024-01-15T10:15:00",
    createdBy: "Phạm Thị Dung",
    receiver: "Khách hàng: Nguyễn Minh Tuấn",
    status: "completed"
  },
  {
    id: "2",
    code: "PX-2024-002146",
    type: "store",
    products: [
      { productId: "3", productName: "Samsung Galaxy S24 Ultra 256GB", imei: "354832100098765", quantity: 2, salePrice: 29990000 },
      { productId: "7", productName: "iPhone 14 128GB", imei: "353912100023456", quantity: 3, salePrice: 19990000 }
    ],
    totalAmount: 119950000,
    createdAt: "2024-01-15T11:30:00",
    createdBy: "Hoàng Văn Em",
    receiver: "CH Di Động Việt - Nguyễn Trãi",
    status: "completed"
  },
  {
    id: "3",
    code: "PX-2024-002147",
    type: "warranty",
    products: [
      { productId: "9", productName: "iPhone 15 256GB Pink", imei: "353912100034567", quantity: 1, salePrice: 0 }
    ],
    totalAmount: 0,
    createdAt: "2024-01-16T09:00:00",
    createdBy: "Phạm Thị Dung",
    receiver: "TTBH Apple VN - Q7",
    status: "pending"
  }
]

export const auditSessions: AuditSession[] = [
  {
    id: "1",
    code: "KK-2024-000089",
    createdAt: "2024-01-10T08:00:00",
    createdBy: "Nguyễn Văn An",
    status: "completed",
    items: [
      { productId: "1", productName: "iPhone 15 Pro Max 256GB", imei: "353912100012345", systemQty: 50, actualQty: 48, difference: -2, reason: "Thiếu 2 máy do giao nhầm" },
      { productId: "3", productName: "Samsung Galaxy S24 Ultra 256GB", imei: "354832100098765", systemQty: 30, actualQty: 32, difference: 2, reason: "Thừa 2 máy từ đợt kiểm trước" }
    ]
  },
  {
    id: "2",
    code: "KK-2024-000090",
    createdAt: "2024-01-16T07:30:00",
    createdBy: "Trần Thị Bình",
    status: "in_progress",
    items: [
      { productId: "5", productName: "Xiaomi 14 Ultra 256GB", imei: "867322100054321", systemQty: 15, actualQty: 15, difference: 0 },
      { productId: "6", productName: "OPPO Find X6 Pro 256GB", imei: "861234100067890", systemQty: 6, actualQty: 5, difference: -1, reason: "Đang xác minh" }
    ]
  }
]

export const transferOrders: TransferOrder[] = [
  {
    id: "1",
    code: "CK-2024-000345",
    sourceWarehouse: "Kho Tổng HCM",
    destWarehouse: "CH Nguyễn Trãi",
    products: [
      { productId: "1", productName: "iPhone 15 Pro Max 256GB", imei: "353912100012345", quantity: 5 },
      { productId: "7", productName: "iPhone 14 128GB", imei: "353912100023456", quantity: 10 }
    ],
    createdAt: "2024-01-14T14:00:00",
    createdBy: "Nguyễn Văn An",
    receiver: "Lê Văn Minh",
    status: "received"
  },
  {
    id: "2",
    code: "CK-2024-000346",
    sourceWarehouse: "Kho Tổng HCM",
    destWarehouse: "CH Lê Văn Sỹ",
    products: [
      { productId: "3", productName: "Samsung Galaxy S24 Ultra 256GB", imei: "354832100098765", quantity: 8 }
    ],
    createdAt: "2024-01-15T09:00:00",
    createdBy: "Trần Thị Bình",
    status: "in_transit"
  },
  {
    id: "3",
    code: "CK-2024-000347",
    sourceWarehouse: "Kho Tổng HCM",
    destWarehouse: "CH Quang Trung",
    products: [
      { productId: "5", productName: "Xiaomi 14 Ultra 256GB", imei: "867322100054321", quantity: 3 },
      { productId: "10", productName: "Vivo V30 Pro 256GB", imei: "862543100012345", quantity: 5 }
    ],
    createdAt: "2024-01-16T08:30:00",
    createdBy: "Lê Văn Cường",
    status: "pending"
  }
]

export const defectiveProducts: DefectiveProduct[] = [
  {
    id: "1",
    productId: "1",
    productCode: "IP15PM-256-BK",
    productName: "iPhone 15 Pro Max 256GB",
    imei: "353912100088001",
    defectType: "Lỗi màn hình",
    customerName: "Trần Văn Hùng",
    customerPhone: "0901234567",
    receivedAt: "2024-01-12T10:00:00",
    status: "processing",
    techNote: "Màn hình xuất hiện vệt xanh, đang chờ linh kiện thay thế"
  },
  {
    id: "2",
    productId: "3",
    productCode: "SS-S24U-256",
    productName: "Samsung Galaxy S24 Ultra 256GB",
    imei: "354832100088002",
    defectType: "Lỗi pin",
    customerName: "Nguyễn Thị Mai",
    customerPhone: "0912345678",
    receivedAt: "2024-01-14T15:30:00",
    status: "pending",
    techNote: "Pin chai nhanh, khách yêu cầu đổi máy mới"
  },
  {
    id: "3",
    productId: "5",
    productCode: "XM-14U-256",
    productName: "Xiaomi 14 Ultra 256GB",
    imei: "867322100088003",
    defectType: "Lỗi camera",
    receivedAt: "2024-01-10T09:00:00",
    status: "returned",
    techNote: "Camera chính không hoạt động, trả nhà cung cấp ngày 15/01"
  },
  {
    id: "4",
    productId: "7",
    productCode: "IP14-128-BL",
    productName: "iPhone 14 128GB",
    imei: "353912100088004",
    defectType: "Lỗi loa",
    customerName: "Phạm Đức Anh",
    customerPhone: "0923456789",
    receivedAt: "2024-01-15T11:00:00",
    status: "completed",
    techNote: "Đã thay loa ngoài, máy hoạt động bình thường"
  }
]

export const warehouseActivities: WarehouseActivity[] = [
  {
    id: "1",
    type: "import",
    description: "Nhập hàng từ Apple Vietnam",
    createdAt: "2024-01-16T10:30:00",
    createdBy: "Nguyễn Văn An",
    details: "20 iPhone 15 Pro Max, 15 iPhone 14"
  },
  {
    id: "2",
    type: "export",
    description: "Xuất hàng cho đơn online #DH2024001234",
    createdAt: "2024-01-16T10:15:00",
    createdBy: "Phạm Thị Dung",
    details: "1 iPhone 15 Pro Max 256GB"
  },
  {
    id: "3",
    type: "transfer",
    description: "Chuyển hàng đến CH Quang Trung",
    createdAt: "2024-01-16T08:30:00",
    createdBy: "Lê Văn Cường",
    details: "3 Xiaomi 14 Ultra, 5 Vivo V30 Pro"
  },
  {
    id: "4",
    type: "audit",
    description: "Bắt đầu kiểm kho định kỳ",
    createdAt: "2024-01-16T07:30:00",
    createdBy: "Trần Thị Bình",
    details: "Phiên kiểm kho KK-2024-000090"
  },
  {
    id: "5",
    type: "adjust",
    description: "Điều chỉnh tồn kho",
    createdAt: "2024-01-15T16:00:00",
    createdBy: "Nguyễn Văn An",
    details: "Samsung Galaxy A54: +5 (nhận hàng trả bảo hành)"
  },
  {
    id: "6",
    type: "import",
    description: "Nhập hàng từ Samsung SEHC",
    createdAt: "2024-01-15T14:20:00",
    createdBy: "Trần Thị Bình",
    details: "25 Samsung Galaxy S24 Ultra"
  },
  {
    id: "7",
    type: "export",
    description: "Xuất hàng cho CH Nguyễn Trãi",
    createdAt: "2024-01-15T11:30:00",
    createdBy: "Hoàng Văn Em",
    details: "2 Samsung Galaxy S24 Ultra, 3 iPhone 14"
  },
  {
    id: "8",
    type: "transfer",
    description: "Nhận hàng từ Kho Tổng HCM",
    createdAt: "2024-01-14T16:00:00",
    createdBy: "Lê Văn Minh",
    details: "5 iPhone 15 Pro Max, 10 iPhone 14"
  }
]

export const warehouses = [
  { id: "1", name: "Kho Tổng HCM", address: "123 Nguyễn Văn Linh, Q.7, TP.HCM" },
  { id: "2", name: "CH Nguyễn Trãi", address: "456 Nguyễn Trãi, Q.5, TP.HCM" },
  { id: "3", name: "CH Lê Văn Sỹ", address: "789 Lê Văn Sỹ, Q.3, TP.HCM" },
  { id: "4", name: "CH Quang Trung", address: "321 Quang Trung, Q.Gò Vấp, TP.HCM" },
  { id: "5", name: "Kho Tổng Hà Nội", address: "100 Trần Duy Hưng, Cầu Giấy, Hà Nội" }
]

export const categories = [
  "iPhone",
  "Samsung",
  "Xiaomi",
  "OPPO",
  "Vivo",
  "Realme",
  "Phụ kiện"
]

// Stats helpers
export const getWarehouseStats = () => {
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0)
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.importPrice), 0)
  const lowStockProducts = products.filter(p => p.status === "low_stock").length
  const outOfStockProducts = products.filter(p => p.status === "out_of_stock").length
  const todayImports = importOrders.filter(o => 
    o.createdAt.startsWith("2024-01-16") && o.status === "completed"
  ).length
  const todayExports = exportOrders.filter(o => 
    o.createdAt.startsWith("2024-01-16") && o.status === "completed"
  ).length

  return {
    totalProducts,
    totalValue,
    lowStockProducts,
    outOfStockProducts,
    todayImports,
    todayExports
  }
}

export const monthlyData = [
  { month: "T1", import: 1250, export: 1180 },
  { month: "T2", import: 980, export: 920 },
  { month: "T3", import: 1420, export: 1350 },
  { month: "T4", import: 1100, export: 1050 },
  { month: "T5", import: 1380, export: 1290 },
  { month: "T6", import: 1520, export: 1480 },
  { month: "T7", import: 1680, export: 1590 },
  { month: "T8", import: 1450, export: 1380 },
  { month: "T9", import: 1320, export: 1250 },
  { month: "T10", import: 1580, export: 1520 },
  { month: "T11", import: 1750, export: 1680 },
  { month: "T12", import: 2100, export: 2050 }
]

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)
}

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    // Product status
    in_stock: "bg-green-100 text-green-800",
    low_stock: "bg-yellow-100 text-yellow-800",
    out_of_stock: "bg-red-100 text-red-800",
    // Order status
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    // Transfer status
    in_transit: "bg-blue-100 text-blue-800",
    received: "bg-green-100 text-green-800",
    // Audit status
    in_progress: "bg-blue-100 text-blue-800",
    // Defective status
    processing: "bg-blue-100 text-blue-800",
    returned: "bg-purple-100 text-purple-800"
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

export const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    in_stock: "Còn hàng",
    low_stock: "Sắp hết",
    out_of_stock: "Hết hàng",
    draft: "Nháp",
    pending: "Chờ duyệt",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    in_transit: "Đang vận chuyển",
    received: "Đã nhận",
    in_progress: "Đang kiểm",
    processing: "Đang xử lý",
    returned: "Đã trả NCC"
  }
  return texts[status] || status
}

export const getActivityIcon = (type: string): string => {
  const icons: Record<string, string> = {
    import: "PackagePlus",
    export: "PackageMinus",
    adjust: "RefreshCw",
    audit: "ClipboardCheck",
    transfer: "Truck"
  }
  return icons[type] || "Activity"
}
