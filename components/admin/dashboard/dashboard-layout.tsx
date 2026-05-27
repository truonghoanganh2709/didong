"use client";

import { useState, createContext, useContext } from "react";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";
import { cn } from "@/lib/utils";

interface DashboardLayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextType>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export const useDashboardLayout = () => useContext(DashboardLayoutContext);

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({
  children,
  title,
  description,
  actions,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <DashboardLayoutContext.Provider
      value={{ sidebarCollapsed, setSidebarCollapsed }}
    >
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div
          className={cn(
            "transition-all duration-300",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          {/* Top Navbar */}
          <TopNavbar />

          {/* Page Content */}
          <main className="p-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                {description && (
                  <p className="text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {/* Page Body */}
            {children}
          </main>
        </div>
      </div>
    </DashboardLayoutContext.Provider>
  );
}
