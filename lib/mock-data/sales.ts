import type { 
  Customer, 
  Product, 
  Order, 
  ChatSession, 
  WarrantyTicket, 
  Delivery, 
  Shift, 
  StaffNotification,
  DashboardStats 
} from "@/lib/types/sales";

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "an.nguyen@email.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    points: 2500,
    totalPurchases: 5,
    notes: "Khách VIP, thích iPhone",
    createdAt: new Date("2024-01-15"),
    lastPurchase: new Date("2024-03-20"),
  },
  {
    id: "c2",
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "binh.tran@email.com",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    points: 1200,
    totalPurchases: 3,
    createdAt: new Date("2024-02-01"),
    lastPurchase: new Date("2024-03-18"),
  },
  {
    id: "c3",
    name: "Lê Minh Châu",
    phone: "0923456789",
    email: "chau.le@email.com",
    address: "789 Điện Biên Phủ, Q.10, TP.HCM",
    points: 800,
    totalPurchases: 2,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "c4",
    name: "Phạm Hoàng Dũng",
    phone: "0934567890",
    address: "321 Cách Mạng Tháng 8, Q.Tân Bình, TP.HCM",
    points: 3500,
    totalPurchases: 8,
    notes: "Hay mua phụ kiện",
    createdAt: new Date("2023-11-20"),
    lastPurchase: new Date("2024-03-22"),
  },
  {
    id: "c5",
    name: "Hoàng Thị Em",
    phone: "0945678901",
    email: "em.hoang@email.com",
    address: "654 Trường Chinh, Q.12, TP.HCM",
    points: 500,
    totalPurchases: 1,
    createdAt: new Date("2024-03-01"),
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro Max 256GB",
    sku: "IP15PM256",
    barcode: "8901234567890",
    price: 34990000,
    originalPrice: 36990000,
    stock: 15,
    category: "Điện thoại",
    brand: "Apple",
    image: "/products/iphone15promax.jpg",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    sku: "SGS24U512",
    barcode: "8901234567891",
    price: 33990000,
    originalPrice: 35990000,
    stock: 12,
    category: "Điện thoại",
    brand: "Samsung",
    image: "/products/s24ultra.jpg",
  },
  {
    id: "p3",
    name: "OPPO Find X7 Ultra 256GB",
    sku: "OPX7U256",
    barcode: "8901234567892",
    price: 24990000,
    stock: 8,
    category: "Điện thoại",
    brand: "OPPO",
    image: "/products/findx7.jpg",
  },
  {
    id: "p4",
    name: "Xiaomi 14 Ultra 512GB",
    sku: "XM14U512",
    barcode: "8901234567893",
    price: 27990000,
    originalPrice: 29990000,
    stock: 10,
    category: "Điện thoại",
    brand: "Xiaomi",
    image: "/products/xiaomi14.jpg",
  },
  {
    id: "p5",
    name: "AirPods Pro 2",
    sku: "APP2",
    barcode: "8901234567894",
    price: 6290000,
    stock: 25,
    category: "Phụ kiện",
    brand: "Apple",
    image: "/products/airpodspro2.jpg",
  },
  {
    id: "p6",
    name: "Samsung Galaxy Buds3 Pro",
    sku: "SGB3P",
    barcode: "8901234567895",
    price: 5490000,
    originalPrice: 5990000,
    stock: 18,
    category: "Phụ kiện",
    brand: "Samsung",
    image: "/products/buds3pro.jpg",
  },
  {
    id: "p7",
    name: "Apple Watch Series 9 45mm",
    sku: "AWS945",
    barcode: "8901234567896",
    price: 11990000,
    stock: 20,
    category: "Đồng hồ",
    brand: "Apple",
    image: "/products/watch9.jpg",
  },
  {
    id: "p8",
    name: "iPad Pro M4 11inch 256GB",
    sku: "IPDM4256",
    barcode: "8901234567897",
    price: 28990000,
    stock: 7,
    category: "Máy tính bảng",
    brand: "Apple",
    image: "/products/ipadpro.jpg",
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "o1",
    orderNumber: "DH240327001",
    customer: mockCustomers[0],
    items: [
      { id: "i1", product: mockProducts[0], quantity: 1, price: 34990000 },
      { id: "i2", product: mockProducts[4], quantity: 1, price: 6290000 },
    ],
    status: "pending",
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    subtotal: 41280000,
    discount: 500000,
    vat: 4078000,
    total: 44858000,
    shippingAddress: "123 Nguyễn Huệ, Q.1, TP.HCM",
    createdAt: new Date(Date.now() - 5 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
    staffId: "staff1",
  },
  {
    id: "o2",
    orderNumber: "DH240327002",
    customer: mockCustomers[1],
    items: [
      { id: "i3", product: mockProducts[1], quantity: 1, price: 33990000 },
    ],
    status: "confirmed",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    subtotal: 33990000,
    discount: 0,
    vat: 3399000,
    total: 37389000,
    shippingAddress: "456 Lê Lợi, Q.3, TP.HCM",
    createdAt: new Date(Date.now() - 30 * 60000),
    updatedAt: new Date(Date.now() - 15 * 60000),
    staffId: "staff1",
  },
  {
    id: "o3",
    orderNumber: "DH240327003",
    customer: mockCustomers[2],
    items: [
      { id: "i4", product: mockProducts[2], quantity: 1, price: 24990000 },
      { id: "i5", product: mockProducts[5], quantity: 1, price: 5490000 },
    ],
    status: "shipping",
    paymentMethod: "qr_code",
    paymentStatus: "paid",
    subtotal: 30480000,
    discount: 300000,
    vat: 3018000,
    total: 33198000,
    shippingAddress: "789 Điện Biên Phủ, Q.10, TP.HCM",
    createdAt: new Date(Date.now() - 2 * 3600000),
    updatedAt: new Date(Date.now() - 1 * 3600000),
    staffId: "staff1",
  },
  {
    id: "o4",
    orderNumber: "DH240327004",
    customer: mockCustomers[3],
    items: [
      { id: "i6", product: mockProducts[6], quantity: 1, price: 11990000 },
    ],
    status: "completed",
    paymentMethod: "cash",
    paymentStatus: "paid",
    subtotal: 11990000,
    discount: 0,
    vat: 1199000,
    total: 13189000,
    createdAt: new Date(Date.now() - 4 * 3600000),
    updatedAt: new Date(Date.now() - 3 * 3600000),
    staffId: "staff1",
  },
  {
    id: "o5",
    orderNumber: "DH240327005",
    customer: mockCustomers[4],
    items: [
      { id: "i7", product: mockProducts[3], quantity: 1, price: 27990000 },
    ],
    status: "pending",
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    subtotal: 27990000,
    discount: 1000000,
    vat: 2699000,
    total: 29689000,
    shippingAddress: "654 Trường Chinh, Q.12, TP.HCM",
    createdAt: new Date(Date.now() - 10 * 60000),
    updatedAt: new Date(Date.now() - 10 * 60000),
    staffId: "staff1",
  },
];

// Mock Chat Sessions
export const mockChatSessions: ChatSession[] = [
  {
    id: "chat1",
    customer: mockCustomers[0],
    status: "online",
    unreadCount: 2,
    lastMessage: "Em muốn hỏi về iPhone 15 Pro Max",
    lastMessageTime: new Date(Date.now() - 2 * 60000),
    messages: [
      {
        id: "m1",
        senderId: mockCustomers[0].id,
        senderName: mockCustomers[0].name,
        content: "Chào shop, em muốn hỏi về iPhone 15 Pro Max",
        type: "text",
        timestamp: new Date(Date.now() - 5 * 60000),
        isStaff: false,
      },
      {
        id: "m2",
        senderId: "staff1",
        senderName: "Nhân viên",
        content: "Dạ chào anh/chị, em có thể hỗ trợ gì cho anh/chị ạ?",
        type: "text",
        timestamp: new Date(Date.now() - 4 * 60000),
        isStaff: true,
      },
      {
        id: "m3",
        senderId: mockCustomers[0].id,
        senderName: mockCustomers[0].name,
        content: "Em muốn hỏi về iPhone 15 Pro Max",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 60000),
        isStaff: false,
      },
    ],
  },
  {
    id: "chat2",
    customer: mockCustomers[1],
    status: "online",
    unreadCount: 0,
    lastMessage: "Dạ em cảm ơn ạ",
    lastMessageTime: new Date(Date.now() - 30 * 60000),
    messages: [
      {
        id: "m4",
        senderId: mockCustomers[1].id,
        senderName: mockCustomers[1].name,
        content: "Shop còn Galaxy S24 Ultra màu đen không ạ?",
        type: "text",
        timestamp: new Date(Date.now() - 35 * 60000),
        isStaff: false,
      },
      {
        id: "m5",
        senderId: "staff1",
        senderName: "Nhân viên",
        content: "Dạ shop còn hàng ạ. Anh/chị có cần em tư vấn thêm không ạ?",
        type: "text",
        timestamp: new Date(Date.now() - 32 * 60000),
        isStaff: true,
      },
      {
        id: "m6",
        senderId: mockCustomers[1].id,
        senderName: mockCustomers[1].name,
        content: "Dạ em cảm ơn ạ",
        type: "text",
        timestamp: new Date(Date.now() - 30 * 60000),
        isStaff: false,
      },
    ],
  },
  {
    id: "chat3",
    customer: mockCustomers[2],
    status: "offline",
    unreadCount: 1,
    lastMessage: "Bao giờ có hàng lại vậy shop?",
    lastMessageTime: new Date(Date.now() - 2 * 3600000),
    messages: [
      {
        id: "m7",
        senderId: mockCustomers[2].id,
        senderName: mockCustomers[2].name,
        content: "Bao giờ có hàng lại vậy shop?",
        type: "text",
        timestamp: new Date(Date.now() - 2 * 3600000),
        isStaff: false,
      },
    ],
  },
];

// Mock Warranty Tickets
export const mockWarrantyTickets: WarrantyTicket[] = [
  {
    id: "w1",
    ticketNumber: "BH240327001",
    customer: mockCustomers[0],
    product: mockProducts[0],
    imei: "123456789012345",
    issue: "Màn hình bị đơ, không phản hồi",
    status: "diagnosing",
    warrantyExpiry: new Date("2025-03-20"),
    createdAt: new Date(Date.now() - 2 * 24 * 3600000),
    updatedAt: new Date(Date.now() - 1 * 24 * 3600000),
    notes: "Đã tiếp nhận máy, đang kiểm tra",
  },
  {
    id: "w2",
    ticketNumber: "BH240327002",
    customer: mockCustomers[1],
    product: mockProducts[1],
    imei: "234567890123456",
    issue: "Pin tụt nhanh",
    status: "repairing",
    warrantyExpiry: new Date("2025-02-15"),
    createdAt: new Date(Date.now() - 5 * 24 * 3600000),
    updatedAt: new Date(Date.now() - 12 * 3600000),
    notes: "Đang thay pin mới",
  },
  {
    id: "w3",
    ticketNumber: "BH240327003",
    customer: mockCustomers[3],
    product: mockProducts[4],
    imei: "345678901234567",
    issue: "Tai nghe trái không có âm thanh",
    status: "ready",
    warrantyExpiry: new Date("2024-12-01"),
    createdAt: new Date(Date.now() - 7 * 24 * 3600000),
    updatedAt: new Date(Date.now() - 6 * 3600000),
    notes: "Đã sửa xong, chờ khách lấy",
  },
];

// Mock Deliveries
export const mockDeliveries: Delivery[] = [
  {
    id: "d1",
    order: mockOrders[0],
    status: "pending",
    estimatedDelivery: new Date(Date.now() + 24 * 3600000),
  },
  {
    id: "d2",
    order: mockOrders[2],
    shipper: {
      id: "sh1",
      name: "Trần Văn Giao",
      phone: "0961234567",
    },
    status: "in_transit",
    estimatedDelivery: new Date(Date.now() + 2 * 3600000),
  },
  {
    id: "d3",
    order: mockOrders[4],
    status: "pending",
    estimatedDelivery: new Date(Date.now() + 48 * 3600000),
  },
];

// Mock Current Shift
export const mockCurrentShift: Shift = {
  id: "shift1",
  staffId: "staff1",
  staffName: "Nguyễn Văn Nhân Viên",
  checkIn: new Date(Date.now() - 4 * 3600000),
  totalSales: 128547000,
  ordersCount: 8,
  commission: 1285470,
  kpiTarget: 200000000,
  kpiAchieved: 128547000,
};

// Mock Notifications
export const mockNotifications: StaffNotification[] = [
  {
    id: "n1",
    title: "Đơn hàng mới",
    message: "Đơn hàng DH240327001 vừa được tạo",
    type: "order",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "n2",
    title: "Tin nhắn mới",
    message: "Khách hàng Nguyễn Văn An gửi tin nhắn",
    type: "chat",
    read: false,
    createdAt: new Date(Date.now() - 10 * 60000),
  },
  {
    id: "n3",
    title: "Thông báo từ quản lý",
    message: "Họp giao ban lúc 17:00 hôm nay",
    type: "manager",
    read: true,
    createdAt: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: "n4",
    title: "Bảo hành hoàn thành",
    message: "Phiếu BH240327003 đã sửa xong",
    type: "warranty",
    read: true,
    createdAt: new Date(Date.now() - 6 * 3600000),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  todayOrders: 12,
  consultingCustomers: 3,
  personalRevenue: 128547000,
  pendingOrders: 4,
  deliveryOrders: 2,
  topProducts: [
    { product: mockProducts[0], sold: 5 },
    { product: mockProducts[1], sold: 4 },
    { product: mockProducts[4], sold: 8 },
    { product: mockProducts[6], sold: 3 },
  ],
};

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-warning text-warning-foreground",
    confirmed: "bg-info text-info-foreground",
    shipping: "bg-info text-info-foreground",
    completed: "bg-success text-success-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
    unpaid: "bg-warning text-warning-foreground",
    paid: "bg-success text-success-foreground",
    refunded: "bg-muted text-muted-foreground",
    online: "bg-success text-success-foreground",
    offline: "bg-muted text-muted-foreground",
    away: "bg-warning text-warning-foreground",
    received: "bg-muted text-muted-foreground",
    diagnosing: "bg-info text-info-foreground",
    repairing: "bg-warning text-warning-foreground",
    ready: "bg-success text-success-foreground",
    returned: "bg-muted text-muted-foreground",
    picked_up: "bg-info text-info-foreground",
    in_transit: "bg-warning text-warning-foreground",
    delivered: "bg-success text-success-foreground",
    failed: "bg-destructive text-destructive-foreground",
  };
  return colors[status] || "bg-muted text-muted-foreground";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    unpaid: "Chưa thanh toán",
    paid: "Đã thanh toán",
    refunded: "Đã hoàn tiền",
    cod: "COD",
    bank_transfer: "Chuyển khoản",
    qr_code: "QR Code",
    cash: "Tiền mặt",
    e_wallet: "Ví điện tử",
    online: "Trực tuyến",
    offline: "Ngoại tuyến",
    away: "Vắng mặt",
    received: "Đã tiếp nhận",
    diagnosing: "Đang kiểm tra",
    repairing: "Đang sửa chữa",
    ready: "Sẵn sàng trả",
    returned: "Đã trả khách",
    picked_up: "Đã lấy hàng",
    in_transit: "Đang vận chuyển",
    delivered: "Đã giao",
    failed: "Giao thất bại",
  };
  return labels[status] || status;
}
