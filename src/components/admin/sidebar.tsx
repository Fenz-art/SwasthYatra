"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Network, Users, PhoneCall, MessageSquare, BarChart3, LayoutDashboard, AlertTriangle, Activity, XCircle, UserCog } from "lucide-react"

const navItems = [
  { href: "/admin/provider-network", label: "Network Overview", icon: LayoutDashboard },
  { href: "/admin/provider-leads", label: "Provider Leads", icon: Users },
  { href: "/admin/provider-outreach", label: "Outreach Queue", icon: PhoneCall },
  { href: "/admin/provider-responses", label: "Responses", icon: MessageSquare },
  { href: "/admin/provider-metrics", label: "Metrics", icon: BarChart3 },
  { href: "/admin/escalations", label: "Escalations", icon: AlertTriangle },
  { href: "/admin/journeys", label: "Journeys", icon: Activity },
  { href: "/admin/failed-assignments", label: "Failed Assignments", icon: XCircle },
  { href: "/admin/operator-dashboard", label: "Operator Dashboard", icon: UserCog },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <Network className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Provider Ops</span>
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
        <Link href="/dashboard" className="block text-xs text-muted-foreground px-3 hover:text-foreground">
          ← Back to Dashboard
        </Link>
        <div className="mt-2 text-xs text-muted-foreground px-3">Admin Console v1.0</div>
      </div>
    </aside>
  )
}
