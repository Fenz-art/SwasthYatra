"use client"

import { useState, useEffect, useRef, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronRight, Sparkles, Stethoscope, Pill, MessageCircle, MapPin, User, Settings, FileText, HelpCircle, LogOut, Building2 } from "lucide-react"

interface CommandPaletteContext {
  open: boolean
  setOpen: (open: boolean) => void
}

const CommandPaletteContext = createContext<CommandPaletteContext>({ open: false, setOpen: () => {} })

export const useCommandPalette = () => useContext(CommandPaletteContext)

interface CommandDef {
  id: string
  title: string
  subtitle: string
  category: "Actions" | "Navigation" | "Settings" | "Help"
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  shortcut?: string
  route: string
}

const commandDefs: CommandDef[] = [
  { id: "care-journey", title: "Start a Care Journey", subtitle: "Initiate a new medical travel case", category: "Actions", icon: Sparkles, iconColor: "var(--accent-cyan)", shortcut: "J", route: "/demo/agent-workspace" },
  { id: "find-provider", title: "Find Provider", subtitle: "Locate doctors, clinics, and pharmacies worldwide", category: "Actions", icon: Stethoscope, shortcut: "P", route: "/demo/provider-ranking" },
  { id: "search-medication", title: "Search Medication", subtitle: "Look up equivalents and local ingredients", category: "Actions", icon: Pill, shortcut: "M", route: "/demo/pharmacist" },
  { id: "request-interpreter", title: "Request Interpreter", subtitle: "Prepare translation support for care", category: "Actions", icon: MessageCircle, shortcut: "I", route: "/demo/doctor" },
  { id: "emergency", title: "Emergency Services", subtitle: "Find urgent care and emergency contacts", category: "Actions", icon: MapPin, iconColor: "var(--accent-red)", shortcut: "E", route: "/demo/scenarios" },
  { id: "dashboard", title: "Open Dashboard", subtitle: "View your personalized healthcare dashboard", category: "Navigation", icon: Building2, shortcut: "D", route: "/demo/patient" },
  { id: "agent-workspace", title: "Open Agent Workspace", subtitle: "Watch live AI coordination progress", category: "Navigation", icon: Sparkles, iconColor: "var(--accent-cyan)", shortcut: "A", route: "/demo/agent-workspace" },
  { id: "view-profile", title: "View Profile", subtitle: "Review your traveler profile and history", category: "Navigation", icon: User, route: "/demo/patient" },
  { id: "settings", title: "Settings", subtitle: "Configure preferences and account settings", category: "Settings", icon: Settings, shortcut: ",", route: "/demo/docs" },
  { id: "documentation", title: "Documentation", subtitle: "Guides, examples, and API references", category: "Help", icon: FileText, route: "/demo/docs" },
  { id: "get-help", title: "Get Help", subtitle: "Contact support or view FAQs", category: "Help", icon: HelpCircle, route: "/demo/judge" },
]

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  )
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette()
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  interface CommandItem extends CommandDef {
    action: () => void
  }

  const items: CommandItem[] = commandDefs.map(def => ({
    ...def,
    action: () => router.push(def.route),
  }))

  const query = search.toLowerCase()
  const filtered = items.filter(
    item =>
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query),
  )

  const categories = Array.from(new Set(filtered.map(item => item.category)))
  let flatIndex = 0

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
    if (!open) {
      setSearch("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(!open)
        return
      }
      if (!open) return
      if (e.key === "Escape") {
        e.preventDefault()
        setOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const item = filtered[selectedIndex]
        if (item) {
          item.action()
          setOpen(false)
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, filtered, selectedIndex, setOpen])

  useEffect(() => {
    if (listRef.current) {
      const el = listRef.current.querySelector('[data-active="true"]')
      if (el) el.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  const select = (idx: number) => {
    const item = filtered[idx]
    if (item) {
      item.action()
      setOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          backgroundColor: "rgba(7, 8, 10, 0.7)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 150ms ease",
        }}
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "15vh",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--hairline)",
            borderRadius: "12px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            overflow: "hidden",
            transform: open ? "scale(1) translateY(0)" : "scale(0.96) translateY(-8px)",
            opacity: open ? 1 : 0,
            transition: "transform 150ms ease, opacity 120ms ease",
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              borderBottom: "1px solid var(--hairline)",
            }}
          >
            <Search size={16} style={{ color: "var(--mute)", flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setSelectedIndex(0)
              }}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "var(--ink)",
              }}
            />
            <kbd style={{
              display: "inline-flex",
              alignItems: "center",
              height: "20px",
              padding: "0 6px",
              borderRadius: "4px",
              border: "1px solid var(--hairline)",
              background: "var(--surface-card)",
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--mute)",
              letterSpacing: "0.5px",
            }}>
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div
            ref={listRef}
            style={{
              maxHeight: "340px",
              overflowY: "auto",
              padding: "8px",
            }}
          >
            {filtered.length === 0 ? (
              <div style={{ padding: "32px 16px", textAlign: "center", fontSize: "13px", color: "var(--mute)" }}>
                No commands found.
              </div>
            ) : (
              categories.map(category => {
                const catItems = filtered.filter(item => item.category === category)
                return (
                  <div key={category} style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        padding: "6px 12px 4px",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--ash)",
                      }}
                    >
                      {category}
                    </div>
                    {catItems.map(item => {
                      const idx = flatIndex++
                      const active = idx === selectedIndex
                      return (
                        <button
                          key={item.id}
                          data-active={active}
                          onClick={() => select(idx)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: active ? "var(--surface-card)" : "transparent",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 70ms ease",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                background: active ? "var(--surface-elevated)" : "var(--surface-card)",
                              }}
                            >
                              <item.icon
                                className="w-3.5 h-3.5"
                              />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "13px", fontWeight: 500, color: active ? "var(--ink)" : "var(--body)", lineHeight: 1.3 }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: "11px", color: "var(--ash)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                            {item.shortcut && (
                              <kbd style={{
                                display: "inline-flex",
                                alignItems: "center",
                                height: "18px",
                                padding: "0 5px",
                                borderRadius: "4px",
                                border: "1px solid var(--hairline)",
                                background: "linear-gradient(180deg, var(--key-bg-start), var(--key-bg-end))",
                                fontSize: "10px",
                                fontFamily: "monospace",
                                color: "var(--mute)",
                              }}>
                                {item.shortcut === "," ? "," : item.shortcut}
                              </kbd>
                            )}
                            {active && (
                              <ChevronRight size={14} style={{ color: "var(--mute)" }} />
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

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              borderTop: "1px solid var(--hairline)",
              fontSize: "10px",
              color: "var(--ash)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span><kbd style={kbdStyle}>&uarr;</kbd> <kbd style={kbdStyle}>&darr;</kbd> navigate</span>
              <span>&bull;</span>
              <span><kbd style={kbdStyle}>&crarr;</kbd> select</span>
              <span>&bull;</span>
              <span><kbd style={kbdStyle}>ESC</kbd> close</span>
            </div>
            <span>SwasthYatra</span>
          </div>
        </div>
      </div>
    </>
  )
}

const kbdStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  height: "16px",
  padding: "0 4px",
  borderRadius: "3px",
  border: "1px solid var(--hairline)",
  background: "linear-gradient(180deg, var(--key-bg-start), var(--key-bg-end))",
  fontSize: "9px",
  fontFamily: "monospace",
  color: "var(--mute)",
  lineHeight: 1,
}
