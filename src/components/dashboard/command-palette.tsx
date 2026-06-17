"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Search,
  PlusCircle,
  MapPin,
  Pill,
  Bot,
  BarChart3,
  Building2,
  UserCheck,
  BookOpen,
  ArrowRightLeft,
  LifeBuoy
} from "lucide-react"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  action: () => void
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const listRef = useRef<HTMLDivElement>(null)

  const items: CommandItem[] = [
    {
      id: "create-journey",
      title: "Create Journey",
      subtitle: "Begin tracking a new medical case abroad",
      category: "Navigation",
      icon: PlusCircle,
      shortcut: "J",
      action: () => router.push("/dashboard/journeys/new")
    },
    {
      id: "find-provider",
      title: "Find Care",
      subtitle: "Locate doctors, clinics, and pharmacies",
      category: "Navigation",
      icon: MapPin,
      shortcut: "P",
      action: () => router.push("/dashboard/providers")
    },
    {
      id: "search-medication",
      title: "Search Medication",
      subtitle: "Look up equivalents and local active ingredients",
      category: "Navigation",
      icon: Pill,
      shortcut: "M",
      action: () => router.push("/dashboard/medications")
    },
    {
      id: "open-interpreter",
      title: "Open Interpreter",
      subtitle: "Prepare translation support for care coordination",
      category: "Navigation",
      icon: UserCheck,
      shortcut: "I",
      action: () => router.push("/dashboard/interpreter")
    },
    {
      id: "open-provider-network",
      title: "Open Provider Network",
      subtitle: "View network availability and care options",
      category: "Navigation",
      icon: MapPin,
      action: () => router.push("/dashboard/providers")
    },
    {
      id: "agent-workspace",
      title: "Open Navigation Assistant",
      subtitle: "Watch live coordination progress",
      category: "Workspace",
      icon: Bot,
      shortcut: "A",
      action: () => router.push("/dashboard/agent")
    },
    {
      id: "care-outcomes",
      title: "Review Care Outcomes",
      subtitle: "Analytics, history, and verified learnings",
      category: "Workspace",
      icon: BarChart3,
      shortcut: "O",
      action: () => router.push("/dashboard/outcomes")
    },
    {
      id: "open-escalations",
      title: "Open Escalations",
      subtitle: "Review journeys needing additional support",
      category: "Workspace",
      icon: LifeBuoy,
      action: () => router.push("/admin/escalations")
    },
    {
      id: "switch-organization",
      title: "Switch Organization",
      subtitle: "Select a different travel support provider",
      category: "Preferences",
      icon: Building2,
      action: () => router.push("/dashboard/organizations")
    },
    {
      id: "switch-role",
      title: "Switch User Role",
      subtitle: "Toggle between Traveler, Practitioner, and Operator modes",
      category: "Preferences",
      icon: ArrowRightLeft,
      shortcut: "R",
      action: () => {
        // Toggle view role demo
        router.push("/dashboard/settings")
      }
    },
    {
      id: "platform-docs",
      title: "Open Documentation",
      subtitle: "Guides, examples, and integration references",
      category: "Help",
      icon: BookOpen,
      action: () => router.push("/demo/docs")
    }
  ]

  // Filter items
  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen(prev => !prev)
        setSearch("")
        setSelectedIndex(0)
      }

      // Quick hotkeys when palette is closed
      if (!isOpen && e.altKey) {
        const matchingItem = items.find(item => item.shortcut && item.shortcut.toLowerCase() === e.key.toLowerCase())
        if (matchingItem) {
          e.preventDefault()
          matchingItem.action()
        }
      }

      if (!isOpen) return

      if (e.key === "Escape") {
        e.preventDefault()
        setIsOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action()
          setIsOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filtered, selectedIndex])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]')
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  // Custom global event listener so other components can trigger the palette
  useEffect(() => {
    const handleOpenCommandPalette = () => {
      setIsOpen(true)
      setSearch("")
      setSelectedIndex(0)
    }
    window.addEventListener("open-command-palette", handleOpenCommandPalette)
    return () => window.removeEventListener("open-command-palette", handleOpenCommandPalette)
  }, [])

  if (!isOpen) return null

  // Group by category
  const categories = Array.from(new Set(filtered.map(item => item.category)))

  let itemAccumulator = 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080A]/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-lg border border-white/[0.08] bg-[#0D1015] shadow-2xl transition-all animate-in fade-in-0 zoom-in-95 duration-100">
        {/* Search input */}
        <div className="flex items-center border-b border-white/[0.08] px-4 py-3">
          <Search className="h-4 w-4 mr-3 text-white/45 shrink-0" />
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent text-sm text-white/95 placeholder-white/45 outline-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 font-mono text-[10px] font-medium text-white/45">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div
          ref={listRef}
          className="max-h-[330px] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-white/45">
              No results found.
            </div>
          ) : (
            categories.map(category => {
              const categoryItems = filtered.filter(item => item.category === category)
              return (
                <div key={category} className="space-y-1 mb-3">
                  <h3 className="px-3 text-[11px] font-semibold text-white/45 uppercase tracking-wider">
                    {category}
                  </h3>
                  {categoryItems.map(item => {
                    const currentIndex = itemAccumulator++
                    const isActive = currentIndex === selectedIndex

                    return (
                      <button
                        key={item.id}
                        data-active={isActive}
                        className={cn(
                          "w-full flex items-center justify-between rounded px-3 py-2 text-left transition-colors duration-70",
                          isActive
                            ? "bg-white/[0.08] text-white/95"
                            : "text-white/65 hover:bg-white/[0.03] hover:text-white/95"
                        )}
                        onClick={() => {
                          item.action()
                          setIsOpen(false)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#00E5FF]" : "text-white/45")} />
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            {item.subtitle && (
                              <p className="text-xs text-white/45 line-clamp-1">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.shortcut && (
                            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 font-mono text-[9px] font-medium text-white/45">
                              ⌥{item.shortcut}
                            </kbd>
                          )}
                          {isActive && (
                            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 font-mono text-[9px] font-medium text-white/45">
                              ↵ Enter
                            </kbd>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
        
        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[10px] text-white/45">
          <div className="flex items-center gap-2">
            <span>Use <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to navigate</span>
            <span>•</span>
            <span><kbd className="font-mono">↵</kbd> to select</span>
          </div>
          <span>SwasthYatra OS Commands</span>
        </div>
      </div>
    </div>
  )
}
