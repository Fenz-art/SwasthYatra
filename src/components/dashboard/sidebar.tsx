"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Heart,
  Shield,
  Brain,
  Stethoscope,
  Pill,
  MapPin,
  Languages,
  BarChart3,
  Building2,
  Bot,
  ChevronLeft,
  ChevronRight,
  Search,
  Pin,
  Activity,
  PlusCircle,
  LifeBuoy
} from "lucide-react"
import { useState, useEffect } from "react"
import { getRecentJourneys } from "@/modules/session/actions"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/passport", label: "Health Passport", icon: Shield },
  { href: "/dashboard/vault", label: "Health Vault", icon: Heart },
  { href: "/dashboard/memory", label: "Medical Memory", icon: Brain },
  { href: "/dashboard/journeys", label: "Healthcare Journeys", icon: Stethoscope },
  { href: "/dashboard/medications", label: "Medication Guide", icon: Pill },
  { href: "/dashboard/providers", label: "Provider Network", icon: MapPin },
  { href: "/dashboard/interpreter", label: "Interpreter Support", icon: Languages },
  { href: "/dashboard/outcomes", label: "Care Outcomes", icon: BarChart3 },
  { href: "/dashboard/organizations", label: "Organizations", icon: Building2 },
  { href: "/dashboard/agent", label: "Navigation Assistant", icon: Bot },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [recentJourneys, setRecentJourneys] = useState<any[]>([])

  // Fetch recent journeys for the sidebar quick links
  useEffect(() => {
    getRecentJourneys()
      .then(data => setRecentJourneys(data))
      .catch(err => console.error("Error fetching sidebar journeys", err))
  }, [pathname])

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const showExpanded = !collapsed || isHovered
  const currentActiveJourney = recentJourneys.find(j => j.status === "ACTIVE")

  return (
    <div
      className={cn(
        "relative h-screen shrink-0 transition-all duration-300 z-30",
        collapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <aside
        className={cn(
          "absolute left-0 top-0 h-full flex flex-col border-r border-white/[0.08] bg-[#0D1015] transition-all duration-300 overflow-hidden shadow-xl",
          showExpanded ? "w-64" : "w-16"
        )}
      >
        {/* Top Header */}
        <div className="flex h-14 items-center justify-between border-b border-white/[0.08] px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold text-white/95">
            <svg className="h-5 w-5 text-[#00E5FF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {showExpanded && (
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">
                SwasthYatra
              </span>
            )}
          </Link>

          {showExpanded && (
            <button
              onClick={() => setCollapsed(prev => !prev)}
              className="rounded p-1 text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Command Input Trigger */}
        <div className="p-3">
          {showExpanded ? (
            <button
              onClick={handleOpenSearch}
              className="flex w-full items-center justify-between rounded border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-left text-xs text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>Search commands...</span>
              </div>
              <kbd className="font-mono text-[9px] border border-white/[0.1] bg-white/[0.05] px-1 rounded">
                ⌘K
              </kbd>
            </button>
          ) : (
            <button
              onClick={handleOpenSearch}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/[0.08] bg-white/[0.03] mx-auto text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
              title="Search commands (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 text-xs transition-colors duration-100",
                  isActive
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] font-medium"
                    : "text-white/65 hover:bg-white/[0.04] hover:text-white/95",
                  !showExpanded && "justify-center px-2"
                )}
                title={!showExpanded ? item.label : undefined}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#00E5FF]" : "text-white/45")} />
                {showExpanded && <span>{item.label}</span>}
              </Link>
            )
          })}

          {showExpanded && (
            <div className="mt-4 pt-4 border-t border-white/[0.08] px-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/45 uppercase tracking-wider mb-2">
                <Pin className="h-3 w-3" />
                <span>Pinned</span>
              </div>
              <Link
                href="/dashboard/providers"
                className="flex items-center gap-2 rounded px-2 py-1.5 text-[11px] text-white/65 hover:bg-white/[0.04] hover:text-white/95 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-white/45" />
                <span>Pinned Providers</span>
              </Link>
              <Link
                href="/dashboard/journeys/new"
                className="flex items-center gap-2 rounded px-2 py-1.5 text-[11px] text-white/65 hover:bg-white/[0.04] hover:text-white/95 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5 text-white/45" />
                <span>Start Journey</span>
              </Link>
              <Link
                href="/admin/escalations"
                className="flex items-center gap-2 rounded px-2 py-1.5 text-[11px] text-white/65 hover:bg-white/[0.04] hover:text-white/95 transition-colors"
              >
                <LifeBuoy className="h-3.5 w-3.5 text-white/45" />
                <span>Open Escalations</span>
              </Link>
            </div>
          )}

          {/* Recent Journeys Section */}
          {showExpanded && recentJourneys.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/[0.08] px-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/45 uppercase tracking-wider mb-2">
                <Activity className="h-3 w-3" />
                <span>Recent Journeys</span>
              </div>
              <div className="space-y-1">
                {recentJourneys.map(j => (
                  <Link
                    key={j.id}
                    href={`/dashboard/journeys/${j.id}`}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-[11px] text-white/65 hover:bg-white/[0.04] hover:text-white/95 transition-colors"
                  >
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      j.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-white/20"
                    )} />
                    <span className="truncate">{j.city}, {j.country}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer & Status Bar */}
        <div className="border-t border-white/[0.08] bg-white/[0.01] p-3 space-y-2">
          {showExpanded ? (
            <>
              {/* Traveler Status Panel */}
              <div className="rounded border border-white/[0.06] bg-white/[0.02] p-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full bg-[#11151C] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/65">
                      TR
                    </div>
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#0D1015] bg-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white/95 truncate">Sarah Jenkins</p>
                    <p className="text-[9px] text-white/45 truncate">
                      {currentActiveJourney
                        ? `Tokyo, Japan • Active`
                        : "No active journeys"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-white/40">Suggested next step</p>
                <p className="mt-1 text-[11px] text-white/80">Review latest provider response</p>
              </div>

              <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-white/40">Current role</p>
                <p className="mt-1 text-[11px] text-white/80">Traveler</p>
              </div>

              <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-white/40">Keyboard hints</p>
                <p className="mt-1 text-[11px] text-white/80">Ctrl+K commands · Alt+J new journey</p>
              </div>

              {/* Bottom Utility Items */}
              <div className="flex items-center justify-between text-[10px] text-white/45 px-1">
                <span>v1.0.0</span>
                <button
                  onClick={() => setCollapsed(true)}
                  className="rounded p-1 hover:bg-white/[0.08] hover:text-white/95"
                  title="Collapse Sidebar"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span className="relative h-2 w-2 rounded-full bg-green-500" title="System Status: Online" />
              <button
                onClick={() => setCollapsed(false)}
                className="rounded p-1 text-white/45 hover:bg-white/[0.08] hover:text-white/95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
