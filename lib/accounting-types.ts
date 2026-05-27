// Accounting System Types for Di Dong Viet

export type PaymentMethod = 'cash' | 'transfer' | 'qr_banking' | 'ewallet' | 'cod'

export type InvoiceStatus = 'paid' | 'unpaid' | 'refunded' | 'cancelled'

export type DebtType = 'customer' | 'supplier'

export type DebtStatus = 'current' | 'overdue' | 'paid'

export type RefundStatus = 'pending' | 'approved' | 'completed' | 'rejected'

export type ReceiptType = 'income' | 'expense'

export type ReceiptStatus = 'pending' | 'approved' | 'rejected'

export type ExpenseCategory = 
  | 'inventory' 
  | 'shipping' 
  | 'marketing' 
  | 'salary' 
  | 'rent' 
  | 'warranty' 
  | 'utilities' 
  | 'other'

export interface Invoice {
  id: string
  invoiceCode: string
  orderCode: string
  customerName: string
  customerPhone: string
  createdAt: Date
  total: number
  vat: number
  status: InvoiceStatus
  items: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Transaction {
  id: string
  orderCode: string
  amount: number
  paymentMethod: PaymentMethod
  status: 'success' | 'pending' | 'failed' | 'mismatch'
  createdAt: Date
  confirmedAt?: Date
  confirmedBy?: string
  proofUrl?: string
  note?: string
}

export interface Debt {
  id: string
  entityCode: string
  entityName: string
  entityType: DebtType
  amount: number
  paidAmount: number
  remainingAmount: number
  dueDate: Date
  status: DebtStatus
  createdAt: Date
  paymentHistory: PaymentRecord[]
}

export interface PaymentRecord {
  id: string
  amount: number
  paidAt: Date
  method: PaymentMethod
  note?: string
}

export interface Expense {
  id: string
  category: ExpenseCategory
  description: string
  amount: number
  createdAt: Date
  createdBy: string
  note?: string
}

export interface Receipt {
  id: string
  receiptCode: string
  type: ReceiptType
  amount: number
  reason: string
  createdAt: Date
  createdBy: string
  approvedBy?: string
  approvedAt?: Date
  status: ReceiptStatus
}

export interface RefundRequest {
  id: string
  orderCode: string
  customerName: string
  customerPhone: string
  amount: number
  reason: string
  refundMethod: PaymentMethod
  status: RefundStatus
  createdAt: Date
  processedAt?: Date
  processedBy?: string
}

export interface DashboardMetrics {
  todayRevenue: number
  monthRevenue: number
  estimatedProfit: number
  totalExpenses: number
  receivables: number
  payables: number
  paidOrders: number
  unpaidOrders: number
}

export interface ChartData {
  date: string
  revenue: number
  expenses: number
  profit: number
}

export interface ReportFilter {
  startDate: Date
  endDate: Date
  type: 'daily' | 'monthly' | 'quarterly' | 'yearly'
}
