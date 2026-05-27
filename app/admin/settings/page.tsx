"use client";

import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Store,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Save,
  Upload,
  Mail,
  Building,
  MapPin,
  Phone,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout
      title="Cai dat"
      description="Quan ly cai dat tai khoan va cua hang"
    >
      <div className="max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Ho so
            </TabsTrigger>
            <TabsTrigger value="store" className="gap-2">
              <Store className="h-4 w-4" />
              Cua hang
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Thong bao
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Bao mat
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Giao dien
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thong tin ca nhan</CardTitle>
                <CardDescription>Cap nhat thong tin ca nhan cua ban</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">AD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Tai anh len
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG hoac GIF. Toi da 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ho</Label>
                    <Input id="firstName" defaultValue="Nguyen Van" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Ten</Label>
                    <Input id="lastName" defaultValue="Admin" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue="admin@didongviet.vn" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">So dien thoai</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" defaultValue="0901234567" className="pl-9" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Luu thay doi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Store Tab */}
          <TabsContent value="store" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thong tin cua hang</CardTitle>
                <CardDescription>Cap nhat thong tin doanh nghiep</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Ten cua hang</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="storeName" defaultValue="Di Dong Viet" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Ten cong ty</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="company" defaultValue="Cong ty TNHH Di Dong Viet" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Ma so thue</Label>
                  <Input id="taxId" defaultValue="0123456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dia chi</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" defaultValue="123 Nguyen Hue, Quan 1, TP. Ho Chi Minh" className="pl-9" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email cua hang</Label>
                    <Input id="storeEmail" type="email" defaultValue="contact@didongviet.vn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Hotline</Label>
                    <Input id="storePhone" defaultValue="1800 6018" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Luu thay doi
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cai dat thanh toan</CardTitle>
                <CardDescription>Quan ly phuong thuc thanh toan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Thanh toan COD</p>
                      <p className="text-sm text-muted-foreground">Thanh toan khi nhan hang</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Chuyen khoan ngan hang</p>
                      <p className="text-sm text-muted-foreground">VietcomBank, Techcombank, BIDV</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">The tin dung / Ghi no</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thong bao Email</CardTitle>
                <CardDescription>Chon loai thong bao ban muon nhan qua email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Don hang moi</p>
                    <p className="text-sm text-muted-foreground">Nhan thong bao khi co don hang moi</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ton kho thap</p>
                    <p className="text-sm text-muted-foreground">Canh bao khi san pham sap het hang</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Danh gia tu khach hang</p>
                    <p className="text-sm text-muted-foreground">Nhan thong bao khi co danh gia moi</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bao cao hang tuan</p>
                    <p className="text-sm text-muted-foreground">Nhan bao cao tong hop moi tuan</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thong bao day</CardTitle>
                <CardDescription>Quan ly thong bao tren trinh duyet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bat thong bao day</p>
                    <p className="text-sm text-muted-foreground">Nhan thong bao ngay tren trinh duyet</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Am thanh thong bao</p>
                    <p className="text-sm text-muted-foreground">Phat am thanh khi co thong bao moi</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Doi mat khau</CardTitle>
                <CardDescription>Cap nhat mat khau dang nhap</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mat khau hien tai</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mat khau moi</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xac nhan mat khau moi</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Cap nhat mat khau</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Xac thuc 2 yeu to</CardTitle>
                <CardDescription>Bao mat tai khoan voi xac thuc 2 buoc</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Xac thuc qua SMS</p>
                    <p className="text-sm text-muted-foreground">Nhan ma OTP qua so dien thoai</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Ung dung Authenticator</p>
                    <p className="text-sm text-muted-foreground">Su dung Google Authenticator hoac tuong tu</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Giao dien</CardTitle>
                <CardDescription>Tuy chinh giao dien dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Che do hien thi</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Sang</SelectItem>
                      <SelectItem value="dark">Toi</SelectItem>
                      <SelectItem value="system">Theo he thong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ngon ngu</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger>
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tieng Viet</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dinh dang ngay</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mui gio</Label>
                  <Select defaultValue="asia_hcm">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia_hcm">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                      <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                      <SelectItem value="asia_singapore">Asia/Singapore (GMT+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Luu cai dat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
