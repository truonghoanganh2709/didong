// Types for Sales Staff System

export type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "shipping" 
  | "completed" 
  | "cancelled";

export type PaymentMethod = 
  | "cod" 
  | "bank_transfer" 
  | "qr_code" 
  | "cash" 
  | "e_wallet";

export type PaymentStatus = 
  | "unpaid" 
  | "paid" 
  | "refunded";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  points: number;
  totalPurchases: number;
  notes?: string;
  createdAt: Date;
  lastPurchase?: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  brand: string;
  image: string;
  imei?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  discount?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  shippingAddress?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  staffId: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  type: "text" | "image" | "invoice";
  timestamp: Date;
  isStaff: boolean;
}

export interface ChatSession {
  id: string;
  customer: Customer;
  messages: ChatMessage[];
  status: "online" | "offline" | "away";
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface WarrantyTicket {
  id: string;
  ticketNumber: string;
  customer: Customer;
  product: Product;
  imei: string;
  issue: string;
  status: "received" | "diagnosing" | "repairing" | "ready" | "returned";
  warrantyExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Delivery {
  id: string;
  order: Order;
  shipper?: {
    id: string;
    name: string;
    phone: string;
  };
  status: "pending" | "picked_up" | "in_transit" | "delivered" | "failed";
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
}

export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  checkIn?: Date;
  checkOut?: Date;
  totalSales: number;
  ordersCount: number;
  commission: number;
  kpiTarget: number;
  kpiAchieved: number;
}

export interface StaffNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "chat" | "warranty" | "system" | "manager";
  read: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  todayOrders: number;
  consultingCustomers: number;
  personalRevenue: number;
  pendingOrders: number;
  deliveryOrders: number;
  topProducts: { product: Product; sold: number }[];
}
