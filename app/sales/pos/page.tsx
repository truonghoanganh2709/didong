"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  User,
  Tag,
  CreditCard,
  Banknote,
  QrCode,
  Wallet,
  CheckCircle,
  Printer,
  X,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockProducts,
  mockCustomers,
  formatCurrency,
} from "@/lib/mock-data/sales";
import type { Product, Customer, PaymentMethod } from "@/lib/types/sales";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
}

const categories = [
  "Tất cả",
  "Điện thoại",
  "Phụ kiện",
  "Đồng hồ",
  "Máy tính bảng",
];

const paymentMethods: { value: PaymentMethod; label: string; icon: typeof Banknote }[] = [
  { value: "cash", label: "Tiền mặt", icon: Banknote },
  { value: "bank_transfer", label: "Chuyển khoản", icon: CreditCard },
  { value: "qr_code", label: "QR Code", icon: QrCode },
  { value: "e_wallet", label: "Ví điện tử", icon: Wallet },
];

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerSelect, setShowCustomerSelect] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Focus barcode input on mount
  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const vatAmount = Math.round(subtotal * 0.1);
  const total = subtotal + vatAmount - discountAmount;
  const cashReceivedNum = parseInt(cashReceived) || 0;
  const change = cashReceivedNum - total;

  // Filter products
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      category === "Tất cả" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Filter customers
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone.includes(customerSearch)
  );

  // Handle barcode scan
  const handleBarcodeScan = (barcode: string) => {
    const product = mockProducts.find((p) => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setSearchQuery("");
      toast.success(`Đã thêm ${product.name}`);
    } else {
      toast.error("Không tìm thấy sản phẩm với mã barcode này");
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "SALE10") {
      setDiscountAmount(Math.round(subtotal * 0.1));
      toast.success("Đã áp dụng mã giảm giá 10%");
    } else if (discountCode.toUpperCase() === "SALE500K") {
      setDiscountAmount(500000);
      toast.success("Đã áp dụng mã giảm 500,000đ");
    } else {
      toast.error("Mã giảm giá không hợp lệ");
    }
  };

  const handlePayment = () => {
    if (selectedPayment === "cash" && cashReceivedNum < total) {
      toast.error("Số tiền khách đưa không đủ");
      return;
    }
    setShowPayment(false);
    setShowSuccess(true);
  };

  const resetPOS = () => {
    setCart([]);
    setSelectedCustomer(null);
    setDiscountCode("");
    setDiscountAmount(0);
    setCashReceived("");
    setShowSuccess(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <SalesHeader title="Bán hàng tại quầy" showSearch={false} />

      <div className="flex-1 flex overflow-hidden">
        {/* Products Section */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Search & Categories */}
          <div className="space-y-3 mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={barcodeInputRef}
                  placeholder="Quét barcode hoặc tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery) {
                      handleBarcodeScan(searchQuery);
                    }
                  }}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={category} onValueChange={setCategory}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Products Grid */}
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:border-primary transition-colors border-0 shadow-sm"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-square bg-secondary rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {product.brand.slice(0, 2)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium line-clamp-2 leading-tight">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-primary">
                          {formatCurrency(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatCurrency(product.originalPrice)}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Kho: {product.stock}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Cart Section */}
        <Card className="w-96 lg:w-[420px] border-0 shadow-lg rounded-none flex flex-col">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Giỏ hàng</CardTitle>
              <Badge variant="secondary">{cart.length} sản phẩm</Badge>
            </div>
          </CardHeader>

          {/* Customer Selection */}
          <div className="px-4 py-3 border-b">
            {selectedCustomer ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {selectedCustomer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedCustomer.phone} - {selectedCustomer.points} điểm
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowCustomerSelect(true)}
              >
                <User className="mr-2 h-4 w-4" />
                Chọn khách hàng
              </Button>
            )}
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 px-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Barcode className="h-12 w-12 mb-2" />
                <p className="text-sm">Giỏ hàng trống</p>
                <p className="text-xs">Quét barcode hoặc chọn sản phẩm</p>
              </div>
            ) : (
              <div className="space-y-3 py-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start gap-3 p-2 rounded-lg bg-secondary/50"
                  >
                    <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-muted-foreground">
                        {item.product.brand.slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-primary font-semibold">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Discount Code */}
          <div className="px-4 py-3 border-t">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" onClick={applyDiscount}>
                Áp dụng
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="px-4 py-3 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">VAT (10%)</span>
              <span>{formatCurrency(vatAmount)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giảm giá</span>
                <span className="text-destructive">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="p-4 border-t">
            <Button
              className="w-full h-12 text-base"
              disabled={cart.length === 0}
              onClick={() => setShowPayment(true)}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Thanh toán
            </Button>
          </div>
        </Card>
      </div>

      {/* Customer Selection Dialog */}
      <Dialog open={showCustomerSelect} onOpenChange={setShowCustomerSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn khách hàng</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm tên hoặc số điện thoại..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerSelect(false);
                      setCustomerSearch("");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.phone}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{customer.points} điểm</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thanh toán</DialogTitle>
            <DialogDescription>
              Tổng tiền: <span className="font-bold text-primary text-lg">{formatCurrency(total)}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label>Phương thức thanh toán</Label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.value}
                    variant={
                      selectedPayment === method.value ? "default" : "outline"
                    }
                    className="h-16 flex-col gap-1"
                    onClick={() => setSelectedPayment(method.value)}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="text-xs">{method.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Cash Payment Input */}
            {selectedPayment === "cash" && (
              <div className="space-y-2">
                <Label>Tiền khách đưa</Label>
                <Input
                  type="number"
                  placeholder="Nhập số tiền"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  className="text-lg"
                />
                {cashReceivedNum > 0 && (
                  <div className="flex justify-between p-3 bg-secondary rounded-lg">
                    <span>Tiền thừa</span>
                    <span
                      className={`font-bold ${
                        change >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {formatCurrency(Math.max(0, change))}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* QR Code Display */}
            {selectedPayment === "qr_code" && (
              <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                <div className="h-48 w-48 bg-card border rounded-lg flex items-center justify-center mb-2">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Quét mã QR để thanh toán
                </p>
              </div>
            )}

            {/* Bank Transfer Info */}
            {selectedPayment === "bank_transfer" && (
              <div className="space-y-2 p-4 bg-secondary rounded-lg">
                <p className="font-medium">Thông tin chuyển khoản:</p>
                <div className="text-sm space-y-1">
                  <p>Ngân hàng: Vietcombank</p>
                  <p>Số TK: 1234567890</p>
                  <p>Chủ TK: DI DONG VIET</p>
                  <p className="font-semibold">
                    Nội dung: DH{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)}>
              Hủy
            </Button>
            <Button onClick={handlePayment}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Xác nhận thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm text-center">
          <div className="flex flex-col items-center py-6">
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Thanh toán thành công!
            </h3>
            <p className="text-muted-foreground mb-4">
              Đơn hàng đã được xử lý
            </p>
            <p className="text-2xl font-bold text-primary mb-6">
              {formatCurrency(total)}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast.info("Đang in hóa đơn...")}>
                <Printer className="mr-2 h-4 w-4" />
                In hóa đơn
              </Button>
              <Button onClick={resetPOS}>Đơn mới</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
