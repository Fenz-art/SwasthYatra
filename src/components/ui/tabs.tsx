"use client"

import { cn } from "@/lib/utils"

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-border", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            "hover:text-foreground",
            activeTab === tab.id
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground border-b-2 border-transparent"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
