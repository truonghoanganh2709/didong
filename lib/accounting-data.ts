// Mock Data for Accounting System

import type {
  Invoice,
  Transaction,
  Debt,
  Expense,
  Receipt,
  RefundRequest,
  DashboardMetrics,
  ChartData,
} from './accounting-types'

export const dashboardMetrics: DashboardMetrics = {
  todayRevenue: 245680000,
  monthRevenue: 8547230000,
  estimatedProfit: 1284500000,
  totalExpenses: 2156780000,
  receivables: 456780000,
  payables: 234560000,
  paidOrders: 1247,
  unpaidOrders: 23,
}

export const revenueChartData: ChartData[] = [
  { date: '01/05', revenue: 285000000, expenses: 78000000, profit: 42000000 },
  { date: '02/05', revenue: 312000000, expenses: 85000000, profit: 45000000 },
  { date: '03/05', revenue: 278000000, expenses: 72000000, profit: 41000000 },
  { date: '04/05', revenue: 345000000, expenses: 92000000, profit: 50000000 },
  { date: '05/05', revenue: 289000000, expenses: 76000000, profit: 42000000 },
  { date: '06/05', revenue: 356000000, expenses: 95000000, profit: 52000000 },
  { date: '07/05', revenue: 378000000, expenses: 98000000, profit: 56000000 },
  { date: '08/05', revenue: 325000000, expenses: 88000000, profit: 47000000 },
  { date: '09/05', revenue: 412000000, expenses: 105000000, profit: 61000000 },
  { date: '10/05', revenue: 389000000, expenses: 99000000, profit: 58000000 },
  { date: '11/05', revenue: 367000000, expenses: 94000000, profit: 54000000 },
  { date: '12/05', revenue: 423000000, expenses: 108000000, profit: 63000000 },
  { date: '13/05', revenue: 445000000, expenses: 112000000, profit: 66000000 },
  { date: '14/05', revenue: 398000000, expenses: 102000000, profit: 59000000 },
]

export const expensesByCategory = [
  { category: 'Nhập hàng', amount: 1250000000, percentage: 58 },
  { category: 'Lương nhân viên', amount: 450000000, percentage: 21 },
  { category: 'Mặt bằng', amount: 180000000, percentage: 8 },
  { category: 'Marketing', amount: 120000000, percentage: 6 },
  { category: 'Vận chuyển', amount: 95000000, percentage: 4 },
  { category: 'Bảo hành', amount: 61780000, percentage: 3 },
]

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceCode: 'HD-2024-001234',
    orderCode: 'DH-2024-005678',
    customerName: 'Nguyễn Văn An',
    customerPhone: '0901234567',
    createdAt: new Date('2024-05-14T10:30:00'),
    total: 25990000,
    vat: 2599000,
    status: 'paid',
    items: [
      { id: '1', productName: 'iPhone 15 Pro Max 256GB', quantity: 1, unitPrice: 25990000, total: 25990000 },
    ],
  },
  {
    id: '2',
    invoiceCode: 'HD-2024-001235',
    orderCode: 'DH-2024-005679',
    customerName: 'Trần Thị Bình',
    customerPhone: '0912345678',
    createdAt: new Date('2024-05-14T11:15:00'),
    total: 18490000,
    vat: 1849000,
    status: 'paid',
    items: [
      { id: '2', productName: 'Samsung Galaxy S24 Ultra', quantity: 1, unitPrice: 18490000, total: 18490000 },
    ],
  },
  {
    id: '3',
    invoiceCode: 'HD-2024-001236',
    orderCode: 'DH-2024-005680',
    customerName: 'Lê Hoàng Cường',
    customerPhone: '0923456789',
    createdAt: new Date('2024-05-14T14:20:00'),
    total: 12990000,
    vat: 1299000,
    status: 'unpaid',
    items: [
      { id: '3', productName: 'OPPO Find X6 Pro', quantity: 1, unitPrice: 12990000, total: 12990000 },
    ],
  },
  {
    id: '4',
    invoiceCode: 'HD-2024-001237',
    orderCode: 'DH-2024-005681',
    customerName: 'Phạm Minh Đức',
    customerPhone: '0934567890',
    createdAt: new Date('2024-05-14T15:45:00'),
    total: 8990000,
    vat: 899000,
    status: 'refunded',
    items: [
      { id: '4', productName: 'Xiaomi 14 Ultra', quantity: 1, unitPrice: 8990000, total: 8990000 },
    ],
  },
  {
    id: '5',
    invoiceCode: 'HD-2024-001238',
    orderCode: 'DH-2024-005682',
    customerName: 'Hoàng Thị Mai',
    customerPhone: '0945678901',
    createdAt: new Date('2024-05-14T16:30:00'),
    total: 32990000,
    vat: 3299000,
    status: 'paid',
    items: [
      { id: '5', productName: 'iPhone 15 Pro 512GB', quantity: 1, unitPrice: 32990000, total: 32990000 },
    ],
  },
  {
    id: '6',
    invoiceCode: 'HD-2024-001239',
    orderCode: 'DH-2024-005683',
    customerName: 'Vũ Quang Huy',
    customerPhone: '0956789012',
    createdAt: new Date('2024-05-13T09:15:00'),
    total: 15490000,
    vat: 1549000,
    status: 'cancelled',
    items: [
      { id: '6', productName: 'Samsung Galaxy Z Fold5', quantity: 1, unitPrice: 15490000, total: 15490000 },
    ],
  },
  {
    id: '7',
    invoiceCode: 'HD-2024-001240',
    orderCode: 'DH-2024-005684',
    customerName: 'Đỗ Thanh Hằng',
    customerPhone: '0967890123',
    createdAt: new Date('2024-05-13T10:45:00'),
    total: 22490000,
    vat: 2249000,
    status: 'paid',
    items: [
      { id: '7', productName: 'iPhone 15 256GB', quantity: 1, unitPrice: 22490000, total: 22490000 },
    ],
  },
  {
    id: '8',
    invoiceCode: 'HD-2024-001241',
    orderCode: 'DH-2024-005685',
    customerName: 'Bùi Văn Kiên',
    customerPhone: '0978901234',
    createdAt: new Date('2024-05-13T13:20:00'),
    total: 9990000,
    vat: 999000,
    status: 'unpaid',
    items: [
      { id: '8', productName: 'Vivo X100 Pro', quantity: 1, unitPrice: 9990000, total: 9990000 },
    ],
  },
]

export const transactions: Transaction[] = [
  {
    id: '1',
    orderCode: 'DH-2024-005678',
    amount: 25990000,
    paymentMethod: 'transfer',
    status: 'success',
    createdAt: new Date('2024-05-14T10:32:00'),
    confirmedAt: new Date('2024-05-14T10:35:00'),
    confirmedBy: 'Nguyễn Thị Lan',
  },
  {
    id: '2',
    orderCode: 'DH-2024-005679',
    amount: 18490000,
    paymentMethod: 'qr_banking',
    status: 'success',
    createdAt: new Date('2024-05-14T11:17:00'),
    confirmedAt: new Date('2024-05-14T11:20:00'),
    confirmedBy: 'Trần Văn Nam',
  },
  {
    id: '3',
    orderCode: 'DH-2024-005680',
    amount: 12990000,
    paymentMethod: 'cod',
    status: 'pending',
    createdAt: new Date('2024-05-14T14:22:00'),
  },
  {
    id: '4',
    orderCode: 'DH-2024-005681',
    amount: 8990000,
    paymentMethod: 'ewallet',
    status: 'failed',
    createdAt: new Date('2024-05-14T15:47:00'),
    note: 'Giao dịch bị từ chối bởi ví điện tử',
  },
  {
    id: '5',
    orderCode: 'DH-2024-005682',
    amount: 32990000,
    paymentMethod: 'cash',
    status: 'success',
    createdAt: new Date('2024-05-14T16:32:00'),
    confirmedAt: new Date('2024-05-14T16:35:00'),
    confirmedBy: 'Nguyễn Thị Lan',
  },
  {
    id: '6',
    orderCode: 'DH-2024-005686',
    amount: 28500000,
    paymentMethod: 'transfer',
    status: 'mismatch',
    createdAt: new Date('2024-05-14T17:10:00'),
    note: 'Số tiền chuyển khoản thiếu 500.000đ',
  },
  {
    id: '7',
    orderCode: 'DH-2024-005687',
    amount: 15990000,
    paymentMethod: 'qr_banking',
    status: 'pending',
    createdAt: new Date('2024-05-14T17:45:00'),
  },
  {
    id: '8',
    orderCode: 'DH-2024-005688',
    amount: 42990000,
    paymentMethod: 'transfer',
    status: 'success',
    createdAt: new Date('2024-05-14T18:20:00'),
    confirmedAt: new Date('2024-05-14T18:25:00'),
    confirmedBy: 'Trần Văn Nam',
  },
]

export const debts: Debt[] = [
  {
    id: '1',
    entityCode: 'KH-001234',
    entityName: 'Công ty TNHH ABC Mobile',
    entityType: 'customer',
    amount: 156000000,
    paidAmount: 50000000,
    remainingAmount: 106000000,
    dueDate: new Date('2024-05-20'),
    status: 'current',
    createdAt: new Date('2024-04-20'),
    paymentHistory: [
      { id: '1', amount: 50000000, paidAt: new Date('2024-05-01'), method: 'transfer' },
    ],
  },
  {
    id: '2',
    entityCode: 'KH-001235',
    entityName: 'Cửa hàng Điện thoại Minh Châu',
    entityType: 'customer',
    amount: 89000000,
    paidAmount: 0,
    remainingAmount: 89000000,
    dueDate: new Date('2024-05-10'),
    status: 'overdue',
    createdAt: new Date('2024-04-10'),
    paymentHistory: [],
  },
  {
    id: '3',
    entityCode: 'NCC-000456',
    entityName: 'Apple Vietnam',
    entityType: 'supplier',
    amount: 2500000000,
    paidAmount: 1500000000,
    remainingAmount: 1000000000,
    dueDate: new Date('2024-05-25'),
    status: 'current',
    createdAt: new Date('2024-04-01'),
    paymentHistory: [
      { id: '2', amount: 1000000000, paidAt: new Date('2024-04-15'), method: 'transfer' },
      { id: '3', amount: 500000000, paidAt: new Date('2024-05-05'), method: 'transfer' },
    ],
  },
  {
    id: '4',
    entityCode: 'NCC-000457',
    entityName: 'Samsung Electronics Vietnam',
    entityType: 'supplier',
    amount: 1800000000,
    paidAmount: 1800000000,
    remainingAmount: 0,
    dueDate: new Date('2024-05-15'),
    status: 'paid',
    createdAt: new Date('2024-04-15'),
    paymentHistory: [
      { id: '4', amount: 1800000000, paidAt: new Date('2024-05-12'), method: 'transfer' },
    ],
  },
  {
    id: '5',
    entityCode: 'KH-001236',
    entityName: 'Đại lý Phú Thành',
    entityType: 'customer',
    amount: 245000000,
    paidAmount: 100000000,
    remainingAmount: 145000000,
    dueDate: new Date('2024-05-05'),
    status: 'overdue',
    createdAt: new Date('2024-04-05'),
    paymentHistory: [
      { id: '5', amount: 100000000, paidAt: new Date('2024-04-25'), method: 'transfer' },
    ],
  },
]

export const expenses: Expense[] = [
  {
    id: '1',
    category: 'inventory',
    description: 'Nhập lô iPhone 15 Pro Max - 50 máy',
    amount: 1299500000,
    createdAt: new Date('2024-05-14T08:00:00'),
    createdBy: 'Nguyễn Văn Mạnh',
  },
  {
    id: '2',
    category: 'salary',
    description: 'Lương tháng 4/2024 - Nhân viên bán hàng',
    amount: 285000000,
    createdAt: new Date('2024-05-05T09:00:00'),
    createdBy: 'Trần Thị Hồng',
  },
  {
    id: '3',
    category: 'rent',
    description: 'Tiền thuê mặt bằng tháng 5/2024 - CN Quận 1',
    amount: 85000000,
    createdAt: new Date('2024-05-01T08:00:00'),
    createdBy: 'Lê Hoàng Long',
  },
  {
    id: '4',
    category: 'marketing',
    description: 'Quảng cáo Facebook + Google Ads tháng 5',
    amount: 45000000,
    createdAt: new Date('2024-05-10T10:00:00'),
    createdBy: 'Phạm Minh Tuấn',
  },
  {
    id: '5',
    category: 'shipping',
    description: 'Chi phí vận chuyển GHN + GHTK tuần 2',
    amount: 12500000,
    createdAt: new Date('2024-05-14T11:00:00'),
    createdBy: 'Hoàng Thị Mai',
  },
  {
    id: '6',
    category: 'warranty',
    description: 'Chi phí sửa chữa bảo hành tháng 5',
    amount: 8750000,
    createdAt: new Date('2024-05-13T14:00:00'),
    createdBy: 'Vũ Quang Huy',
  },
  {
    id: '7',
    category: 'utilities',
    description: 'Tiền điện + nước tháng 4 - Tất cả chi nhánh',
    amount: 32000000,
    createdAt: new Date('2024-05-08T09:00:00'),
    createdBy: 'Trần Thị Hồng',
  },
  {
    id: '8',
    category: 'inventory',
    description: 'Nhập lô Samsung Galaxy S24 - 30 máy',
    amount: 554700000,
    createdAt: new Date('2024-05-12T08:00:00'),
    createdBy: 'Nguyễn Văn Mạnh',
  },
]

export const receipts: Receipt[] = [
  {
    id: '1',
    receiptCode: 'PT-2024-000123',
    type: 'income',
    amount: 50000000,
    reason: 'Thu công nợ từ Công ty ABC Mobile',
    createdAt: new Date('2024-05-14T09:00:00'),
    createdBy: 'Nguyễn Thị Lan',
    approvedBy: 'Trần Văn Hải',
    approvedAt: new Date('2024-05-14T09:15:00'),
    status: 'approved',
  },
  {
    id: '2',
    receiptCode: 'PC-2024-000456',
    type: 'expense',
    amount: 85000000,
    reason: 'Chi tiền thuê mặt bằng tháng 5/2024',
    createdAt: new Date('2024-05-01T08:30:00'),
    createdBy: 'Lê Hoàng Long',
    approvedBy: 'Trần Văn Hải',
    approvedAt: new Date('2024-05-01T09:00:00'),
    status: 'approved',
  },
  {
    id: '3',
    receiptCode: 'PT-2024-000124',
    type: 'income',
    amount: 156000000,
    reason: 'Thu tiền bán hàng trả góp - Đợt 1',
    createdAt: new Date('2024-05-14T10:30:00'),
    createdBy: 'Nguyễn Thị Lan',
    status: 'pending',
  },
  {
    id: '4',
    receiptCode: 'PC-2024-000457',
    type: 'expense',
    amount: 45000000,
    reason: 'Chi phí marketing tháng 5/2024',
    createdAt: new Date('2024-05-10T11:00:00'),
    createdBy: 'Phạm Minh Tuấn',
    approvedBy: 'Trần Văn Hải',
    approvedAt: new Date('2024-05-10T14:00:00'),
    status: 'approved',
  },
  {
    id: '5',
    receiptCode: 'PC-2024-000458',
    type: 'expense',
    amount: 25000000,
    reason: 'Chi phí tiếp khách đối tác Apple',
    createdAt: new Date('2024-05-13T15:00:00'),
    createdBy: 'Nguyễn Văn Mạnh',
    status: 'rejected',
  },
]

export const refundRequests: RefundRequest[] = [
  {
    id: '1',
    orderCode: 'DH-2024-005681',
    customerName: 'Phạm Minh Đức',
    customerPhone: '0934567890',
    amount: 8990000,
    reason: 'Sản phẩm lỗi màn hình',
    refundMethod: 'transfer',
    status: 'completed',
    createdAt: new Date('2024-05-14T16:00:00'),
    processedAt: new Date('2024-05-14T17:30:00'),
    processedBy: 'Nguyễn Thị Lan',
  },
  {
    id: '2',
    orderCode: 'DH-2024-005690',
    customerName: 'Lê Văn Hùng',
    customerPhone: '0987654321',
    amount: 15990000,
    reason: 'Khách đổi ý không mua nữa',
    refundMethod: 'transfer',
    status: 'pending',
    createdAt: new Date('2024-05-14T14:00:00'),
  },
  {
    id: '3',
    orderCode: 'DH-2024-005691',
    customerName: 'Trần Thị Hoa',
    customerPhone: '0976543210',
    amount: 22990000,
    reason: 'Sản phẩm không đúng mô tả',
    refundMethod: 'cash',
    status: 'approved',
    createdAt: new Date('2024-05-13T10:00:00'),
    processedAt: new Date('2024-05-13T15:00:00'),
    processedBy: 'Trần Văn Nam',
  },
  {
    id: '4',
    orderCode: 'DH-2024-005692',
    customerName: 'Nguyễn Hoàng Nam',
    customerPhone: '0965432109',
    amount: 5990000,
    reason: 'Không rõ nguồn gốc sản phẩm',
    refundMethod: 'ewallet',
    status: 'rejected',
    createdAt: new Date('2024-05-12T09:00:00'),
    processedAt: new Date('2024-05-12T16:00:00'),
    processedBy: 'Nguyễn Thị Lan',
  },
  {
    id: '5',
    orderCode: 'DH-2024-005693',
    customerName: 'Phạm Văn Tùng',
    customerPhone: '0954321098',
    amount: 18490000,
    reason: 'Máy bị lỗi pin sau 2 ngày sử dụng',
    refundMethod: 'transfer',
    status: 'pending',
    createdAt: new Date('2024-05-14T11:00:00'),
  },
]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    cash: 'Tiền mặt',
    transfer: 'Chuyển khoản',
    qr_banking: 'QR Banking',
    ewallet: 'Ví điện tử',
    cod: 'COD',
  }
  return labels[method] || method
}

export function getInvoiceStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    paid: 'Đã thanh toán',
    unpaid: 'Chưa thanh toán',
    refunded: 'Đã hoàn tiền',
    cancelled: 'Đã hủy',
  }
  return labels[status] || status
}

export function getExpenseCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    inventory: 'Nhập hàng',
    shipping: 'Vận chuyển',
    marketing: 'Marketing',
    salary: 'Lương nhân viên',
    rent: 'Mặt bằng',
    warranty: 'Bảo hành',
    utilities: 'Điện nước',
    other: 'Khác',
  }
  return labels[category] || category
}
