"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockNotifications, formatTime } from "@/lib/mock-data/sales";

interface SalesHeaderProps {
  title: string;
  showSearch?: boolean;
}

export function SalesHeader({ title, showSearch = true }: SalesHeaderProps) {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      {/* Title - Hidden on mobile to make room for menu button */}
      <div className="hidden lg:block">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      {/* Mobile Title with padding for menu */}
      <div className="ml-12 lg:hidden">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      {showSearch && (
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              className="w-64 pl-9 bg-secondary border-0"
            />
          </div>
        </div>
      )}

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1.5 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold">Thông báo</span>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              Đánh dấu đã đọc
            </Button>
          </div>
          <ScrollArea className="h-80">
            {mockNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-1 px-4 py-3 cursor-pointer ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm flex-1">
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {notification.message}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(notification.createdAt)}
                </span>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
