'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Building,
  User,
  Bell,
  Shield,
  CreditCard,
  FileText,
  Printer,
  Mail,
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt hệ thống kế toán
        </p>
      </div>

      <div className="grid gap-6">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Thông tin công ty</CardTitle>
            </div>
            <CardDescription>
              Cấu hình thông tin công ty hiển thị trên hóa đơn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tên công ty</Label>
                <Input defaultValue="Công ty TNHH Di Động Việt" />
              </div>
              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <Input defaultValue="0312345678" />
              </div>
              <div className="space-y-2">
                <Label>Địa chỉ</Label>
                <Input defaultValue="123 Nguyễn Văn Linh, Quận 7, TP.HCM" />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input defaultValue="1800 6018" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="ketoan@didongviet.vn" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input defaultValue="https://didongviet.vn" />
              </div>
            </div>
            <Button>Lưu thay đổi</Button>
          </CardContent>
        </Card>

        {/* User Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Tài khoản</CardTitle>
            </div>
            <CardDescription>
              Quản lý thông tin tài khoản kế toán
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input defaultValue="Nguyễn Thị Lan" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="lan.nguyen@didongviet.vn" />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input defaultValue="0901234567" />
              </div>
              <div className="space-y-2">
                <Label>Chức vụ</Label>
                <Input defaultValue="Kế toán trưởng" />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Đổi mật khẩu</Label>
              <div className="grid gap-4 md:grid-cols-3">
                <Input type="password" placeholder="Mật khẩu hiện tại" />
                <Input type="password" placeholder="Mật khẩu mới" />
                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
              </div>
            </div>
            <Button>Cập nhật tài khoản</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Thông báo</CardTitle>
            </div>
            <CardDescription>
              Cấu hình nhận thông báo từ hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo công nợ quá hạn</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có công nợ vượt quá hạn thanh toán
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo giao dịch lệch tiền</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi phát hiện giao dịch có số tiền không khớp
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo yêu cầu hoàn tiền</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có yêu cầu hoàn tiền mới
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo phiếu chờ duyệt</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có phiếu thu/chi chờ duyệt
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Gửi báo cáo hàng ngày qua email</p>
                <p className="text-sm text-muted-foreground">
                  Nhận email tổng kết doanh thu và các chỉ số quan trọng mỗi ngày
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Hóa đơn</CardTitle>
            </div>
            <CardDescription>
              Cấu hình mẫu và định dạng hóa đơn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tiền tố mã hóa đơn</Label>
                <Input defaultValue="HD" />
              </div>
              <div className="space-y-2">
                <Label>Thuế suất VAT mặc định</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="8">8%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Định dạng số</Label>
                <Select defaultValue="vn">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vn">1.234.567 (Việt Nam)</SelectItem>
                    <SelectItem value="us">1,234,567 (Quốc tế)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mẫu hóa đơn</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Mẫu mặc định</SelectItem>
                    <SelectItem value="modern">Mẫu hiện đại</SelectItem>
                    <SelectItem value="classic">Mẫu cổ điển</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tự động gửi hóa đơn qua email</p>
                <p className="text-sm text-muted-foreground">
                  Gửi hóa đơn điện tử cho khách hàng sau khi tạo
                </p>
              </div>
              <Switch />
            </div>
            <Button>Lưu cài đặt</Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Thanh toán</CardTitle>
            </div>
            <CardDescription>
              Cấu hình phương thức và tài khoản thanh toán
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Ngân hàng chính</Label>
                <Input defaultValue="Vietcombank" />
              </div>
              <div className="space-y-2">
                <Label>Số tài khoản</Label>
                <Input defaultValue="0071000123456" />
              </div>
              <div className="space-y-2">
                <Label>Chủ tài khoản</Label>
                <Input defaultValue="CÔNG TY TNHH DI ĐỘNG VIỆT" />
              </div>
              <div className="space-y-2">
                <Label>Chi nhánh</Label>
                <Input defaultValue="TP. Hồ Chí Minh" />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Phương thức thanh toán được chấp nhận</Label>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="cash" />
                  <Label htmlFor="cash">Tiền mặt</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="transfer" />
                  <Label htmlFor="transfer">Chuyển khoản</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="qr" />
                  <Label htmlFor="qr">QR Banking</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="ewallet" />
                  <Label htmlFor="ewallet">Ví điện tử</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="cod" />
                  <Label htmlFor="cod">COD</Label>
                </div>
              </div>
            </div>
            <Button>Lưu cài đặt</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
