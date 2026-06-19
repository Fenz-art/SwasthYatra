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
  LifeBuoy,
  Globe,
  Command,
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  useEffect(() => {
    getRecentJourneys()
      .then((data) => setRecentJourneys(data))
      .catch((err) => console.error("Error fetching sidebar journeys", err))
  }, [pathname])

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"))
  }

  const showExpanded = !collapsed || isHovered
  const currentActiveJourney = recentJourneys.find((j) => j.status === "ACTIVE")

  return (
    <div
      className={cn(
        "relative h-screen shrink-0 transition-all duration-300 z-30",
        collapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.aside
        initial={false}
        animate={{ width: showExpanded ? 256 : 64 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-0 top-0 h-full flex flex-col border-r border-white/[0.08] bg-[#0D1015] overflow-hidden shadow-2xl"
      >
        {/* Top Header */}
        <div className="flex h-14 items-center justify-between border-b border-white/[0.08] px-4 flex-shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-white/95 min-w-0"
          >
            <Globe className="h-5 w-5 text-[#00E5FF] shrink-0" />
            <AnimatePresence>
              {showExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-semibold tracking-wider uppercase text-white/90 overflow-hidden whitespace-nowrap"
                >
                  SwasthYatra
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {showExpanded && (
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="rounded p-1 text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Trigger */}
        <div className="px-3 py-2 flex-shrink-0">
          {showExpanded ? (
            <button
              onClick={handleOpenSearch}
              className="flex w-full items-center justify-between rounded border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-left text-xs text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>Search commands...</span>
              </div>
              <div className="keycap text-[9px]">⌘K</div>
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

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1 min-h-0">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded px-3 py-2 text-xs transition-colors duration-100",
                  isActive
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] font-medium"
                    : "text-white/55 hover:bg-white/[0.04] hover:text-white/90",
                  !showExpanded && "justify-center px-2",
                  showExpanded ? "gap-3" : "gap-0"
                )}
                title={!showExpanded ? item.label : undefined}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-[#00E5FF]" : "text-white/40"
                  )}
                />
                <AnimatePresence>
                  {showExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}

          {/* Pinned section */}
          {showExpanded && (
            <div className="mt-4 pt-4 border-t border-white/[0.08] px-1 space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                <Pin className="h-3 w-3" />
                <span>Pinned</span>
              </div>
              <Link
                href="/dashboard/providers"
                className="flex items-center gap-2 rounded px-3 py-1.5 text-[11px] text-white/55 hover:bg-white/[0.04] hover:text-white/90 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-white/35" />
                <span>Pinned Providers</span>
              </Link>
              <Link
                href="/dashboard/journeys/new"
                className="flex items-center gap-2 rounded px-3 py-1.5 text-[11px] text-white/55 hover:bg-white/[0.04] hover:text-white/90 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5 text-white/35" />
                <span>Start Journey</span>
              </Link>
              <Link
                href="/admin/escalations"
                className="flex items-center gap-2 rounded px-3 py-1.5 text-[11px] text-white/55 hover:bg-white/[0.04] hover:text-white/90 transition-colors"
              >
                <LifeBuoy className="h-3.5 w-3.5 text-white/35" />
                <span>Open Escalations</span>
              </Link>
            </div>
          )}

          {/* Recent Journeys */}
          {showExpanded && recentJourneys.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/[0.08] px-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                <Activity className="h-3 w-3" />
                <span>Recent Journeys</span>
              </div>
              <div className="space-y-0.5">
                {recentJourneys.map((j) => (
                  <Link
                    key={j.id}
                    href={`/dashboard/journeys/${j.id}`}
                    className="flex items-center gap-2 rounded px-3 py-1.5 text-[11px] text-white/55 hover:bg-white/[0.04] hover:text-white/90 transition-colors"
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        j.status === "ACTIVE"
                          ? "bg-green-500 animate-pulse"
                          : "bg-white/20"
                      )}
                    />
                    <span className="truncate">
                      {j.city}, {j.country}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Footer Status Bar */}
        <div className="border-t border-white/[0.08] bg-white/[0.01] p-3 space-y-2 flex-shrink-0">
          {showExpanded ? (
            <>
              {/* Traveler Status Panel */}
              <div className="rounded border border-white/[0.06] bg-white/[0.02] p-2.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-[#11151C] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/60">
                      TR
                    </div>
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#0D1015] bg-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white/90 truncate">Sarah Jenkins</p>
                    <p className="text-[9px] text-white/40 truncate">
                      {currentActiveJourney ? "Tokyo, Japan · Active" : "No active journeys"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-white/35">Suggested next step</p>
                <p className="mt-1 text-[11px] text-white/75">Review latest provider response</p>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
                  <p className="text-[9px] uppercase tracking-wider text-white/35">Role</p>
                  <p className="mt-0.5 text-[11px] text-white/75">Traveler</p>
                </div>
                <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
                  <p className="text-[9px] uppercase tracking-wider text-white/35">Version</p>
                  <p className="mt-0.5 text-[11px] text-white/75">v1.0.0</p>
                </div>
              </div>

              <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-white/35">Keyboard</p>
                <p className="mt-1 text-[11px] text-white/75">⌘K commands · ⌥J new journey</p>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => setCollapsed(true)}
                  className="rounded p-1 text-white/35 hover:bg-white/[0.08] hover:text-white/90 transition-colors"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span
                className="relative h-2 w-2 rounded-full bg-green-500"
                title="System Status: Online"
              />
              <button
                onClick={() => setCollapsed(false)}
                className="rounded p-1 text-white/45 hover:bg-white/[0.08] hover:text-white/95 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </div>
  )
}
