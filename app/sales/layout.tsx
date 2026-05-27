import type { Metadata } from "next";
import { SalesSidebar } from "@/components/sales/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Di Động Việt - Nhân viên bán hàng",
  description: "Hệ thống quản lý bán hàng Di Động Việt",
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SalesSidebar />
      <main className="lg:pl-64">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
