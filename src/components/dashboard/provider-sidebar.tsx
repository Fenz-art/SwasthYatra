"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Inbox, ClipboardList, MessageSquare, Calendar, BarChart3, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const navItems = [
  { href: "/provider", label: "Overview", icon: LayoutDashboard },
  { href: "/provider/inbox", label: "Inbox", icon: Inbox },
  { href: "/provider/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/provider/responses", label: "Responses", icon: MessageSquare },
  { href: "/provider/availability", label: "Availability", icon: Calendar },
  { href: "/provider/analytics", label: "Analytics", icon: BarChart3 },
]

export function ProviderSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="text-lg font-semibold">Provider OS</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
        <div className="mt-2 text-xs text-muted-foreground px-3">Provider OS v1.0</div>
      </div>
    </aside>
  )
}
