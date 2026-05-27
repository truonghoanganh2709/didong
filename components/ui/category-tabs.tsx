"use client"

import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface CategoryTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function CategoryTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: CategoryTabsProps) {
  return (
    <div className={cn("flex overflow-x-auto gap-1 pb-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
