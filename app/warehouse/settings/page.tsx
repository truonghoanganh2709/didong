"use client";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WarehouseHeader } from "@/components/warehouse/warehouse-header";
import {
  User,
  Bell,
  Shield,
  Palette,
  Building2,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    lowStock: true,
    newImport: true,
    exportComplete: false,
    auditReminder: true,
  });
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@didongviet.vn",
    phone: "0901234567",
    position: "Nhân viên kho",
    warehouse: "Kho HCM - Quận 1",
    employeeId: "NV001",
  });

  return (
    <div className="flex flex-col h-full">
      <WarehouseHeader
        title="Cài Đặt"
        description="Quản lý tài khoản và cài đặt hệ thống"
      />

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-xl grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Hồ sơ</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Thông báo</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Bảo mật</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Giao diện</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Picture */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Ảnh đại diện</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                      NA
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Thay đổi ảnh
                  </Button>
                  <div className="text-center">
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.position}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mã NV: {profile.employeeId}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Mã nhân viên</Label>
                      <Input
                        id="employeeId"
                        value={profile.employeeId}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      <Select defaultValue={profile.position}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nhân viên kho">
                            Nhân viên kho
                          </SelectItem>
                          <SelectItem value="Trưởng kho">Trưởng kho</SelectItem>
                          <SelectItem value="Quản lý kho">Quản lý kho</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse">Kho làm việc</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="warehouse"
                          value={profile.warehouse}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cài đặt thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Phương thức nhận thông báo</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo qua Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Nhận thông báo qua email công ty
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo đẩy</Label>
                      <p className="text-sm text-muted-foreground">
                        Nhận thông báo trực tiếp trên trình duyệt
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Loại thông báo</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cảnh báo tồn kho thấp</Label>
                      <p className="text-sm text-muted-foreground">
                        Thông báo khi sản phẩm sắp hết hàng
                      </p>
                    </div>
                    <Switch
                      checked={notifications.lowStock}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, lowStock: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nhập hàng mới</Label>
                      <p className="text-sm text-muted-foreground">
                        Thông báo khi có phiếu nhập mới
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newImport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newImport: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Xuất hàng hoàn tất</Label>
                      <p className="text-sm text-muted-foreground">
                        Thông báo khi phiếu xuất được xử lý xong
                      </p>
                    </div>
                    <Switch
                      checked={notifications.exportComplete}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          exportComplete: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nhắc nhở kiểm kê</Label>
                      <p className="text-sm text-muted-foreground">
                        Thông báo khi đến lịch kiểm kê định kỳ
                      </p>
                    </div>
                    <Switch
                      checked={notifications.auditReminder}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          auditReminder: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cài đặt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Đổi mật khẩu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>
                      <Shield className="h-4 w-4 mr-2" />
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Phiên đăng nhập</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Chrome - Windows</p>
                        <p className="text-sm text-muted-foreground">
                          TP. Hồ Chí Minh, Việt Nam
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Phiên hiện tại
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      Đang hoạt động
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <MapPin className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Safari - iPhone</p>
                        <p className="text-sm text-muted-foreground">
                          TP. Hồ Chí Minh, Việt Nam
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Đăng xuất
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Giao diện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Chế độ hiển thị</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-primary rounded-lg p-4 cursor-pointer">
                      <div className="aspect-video bg-white border rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Light</span>
                      </div>
                      <p className="text-sm font-medium text-center">Sáng</p>
                    </div>
                    <div className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary/50">
                      <div className="aspect-video bg-gray-900 border rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-400">Dark</span>
                      </div>
                      <p className="text-sm font-medium text-center">Tối</p>
                    </div>
                    <div className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary/50">
                      <div className="aspect-video bg-gradient-to-r from-white to-gray-900 border rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Auto</span>
                      </div>
                      <p className="text-sm font-medium text-center">Tự động</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label>Ngôn ngữ</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label>Kích thước font chữ</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Nhỏ</SelectItem>
                      <SelectItem value="medium">Vừa</SelectItem>
                      <SelectItem value="large">Lớn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cài đặt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
