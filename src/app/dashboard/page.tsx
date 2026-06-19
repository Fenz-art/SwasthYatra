"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Activity,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
  Pill,
  Bot,
  MapPin,
  Clock,
  Compass,
  FileText,
  ChevronRight,
  Stethoscope,
  Globe,
  Heart,
} from "lucide-react"

function humanizeEvent(event: string, metadata: any): string {
  switch (event) {
    case "JOURNEY_CREATED":
      return `Started healthcare journey in ${metadata?.country || "abroad"}`
    case "PASSPORT_CREATED":
      return "Generated global Health Passport profile"
    case "PASSPORT_SHARED":
      return "Shared health passport via secure link"
    case "DOCUMENT_UPLOADED":
      return "Uploaded medical record to Health Vault"
    case "DOCUMENT_PROCESSED":
      return "Processed document classification and OCR"
    case "MEMORY_APPROVED":
      return "Approved clinical memory entry"
    case "PROVIDER_CONTACTED":
      return "Contacted recommended care provider"
    case "INTERPRETER_STARTED":
      return "Activated real-time language interpreter"
    case "SETTINGS_CHANGED":
      return "Updated account profile preferences"
    default:
      return event.replace(/_/g, " ").toLowerCase()
  }
}

export default async function DashboardOverview() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const [
    journeyCount,
    docCount,
    memoryCount,
    passport,
    activeJourney,
    recentJourneys,
    auditLogs,
  ] = await Promise.all([
    prisma.travelHealthSession.count({ where: { userId: session.user.id } }),
    prisma.vaultDocument.count({ where: { userId: session.user.id } }),
    prisma.medicalMemory.count({ where: { userId: session.user.id } }),
    prisma.healthPassport.findUnique({ where: { userId: session.user.id } }),
    prisma.travelHealthSession.findFirst({
      where: { userId: session.user.id, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      include: {
        timeline: { orderBy: { createdAt: "desc" }, take: 3 },
      },
    }),
    prisma.travelHealthSession.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.auditLog.findMany({
      where: { actorId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  const severityStyles: Record<string, string> = {
    LOW: "bg-green-500/10 text-green-400 border border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    CRITICAL: "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse",
  }

  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-xl font-semibold text-white/95">
            Good day{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-xs text-white/45">
            Your healthcare navigation workspace is active.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <Clock className="h-3.5 w-3.5" />
          <span>System updated 1m ago</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Journeys",
            value: journeyCount,
            icon: Stethoscope,
            href: "/dashboard/journeys",
          },
          {
            label: "Documents",
            value: docCount,
            icon: FileText,
            href: "/dashboard/vault",
          },
          {
            label: "Memory Records",
            value: memoryCount,
            icon: Globe,
            href: "/dashboard/memory",
          },
          {
            label: "Passport",
            value: passport ? "Active" : "Not set",
            icon: passport ? ShieldCheck : ShieldAlert,
            href: "/dashboard/passport",
            accent: passport ? "text-accent-green" : "text-accent-amber",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-white/[0.08] bg-[#0D1015] p-4 hover:bg-white/[0.03] hover:border-white/[0.12] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon
                className={`h-4 w-4 ${stat.accent || "text-white/35"} group-hover:text-[#00E5FF] transition-colors`}
              />
              <ChevronRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/45 transition-colors" />
            </div>
            <p
              className={`text-lg font-semibold ${stat.accent || "text-white/90"}`}
            >
              {stat.value}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-white/35 mt-0.5">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Columns (Primary Work Status) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Work Focus */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-sm font-medium text-white/90">Current Work Focus</p>
                <p className="text-xs text-white/40 mt-0.5">
                  Your active healthcare journey details
                </p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-normal">
                SYSTEM ACTIVE
              </Badge>
            </div>
            <div className="p-5">
              {activeJourney ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-lg bg-white/[0.02] border border-white/[0.06] p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white/90">
                        {activeJourney.city}, {activeJourney.country}
                      </p>
                      <p className="text-xs text-white/60">
                        Symptoms:{" "}
                        {(activeJourney.symptoms as string[] || []).join(", ")}
                      </p>
                      <p className="text-[10px] text-white/40">
                        Started{" "}
                        {new Date(activeJourney.createdAt).toLocaleDateString()} ·{" "}
                        {activeJourney.language} Support
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          severityStyles[activeJourney.severityLevel || "LOW"]
                        }`}
                      >
                        {activeJourney.severityLevel || "LOW"}
                      </span>
                      <Link
                        href={`/dashboard/journeys/${activeJourney.id}`}
                        className="flex items-center gap-1 text-xs text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors"
                      >
                        View details <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {activeJourney.timeline.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                        Latest Journey Activity
                      </p>
                      <div className="space-y-2.5">
                        {activeJourney.timeline.map((event) => (
                          <div key={event.id} className="flex gap-3 text-xs">
                            <div className="flex flex-col items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] mt-1.5" />
                              <div className="w-px flex-1 bg-white/[0.08]" />
                            </div>
                            <div className="flex-1 pb-2">
                              <p className="text-white/80 font-medium">
                                {event.eventType.replace(/_/g, " ")}
                              </p>
                              <p className="text-[10px] text-white/40">
                                {new Date(event.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Compass className="mx-auto h-8 w-8 text-white/15 mb-3" />
                  <p className="text-sm text-white/60 font-medium">
                    No active healthcare journeys
                  </p>
                  <p className="text-xs text-white/40 max-w-sm mx-auto mt-1 mb-4">
                    If you are currently traveling and wake up feeling unwell or need
                    local medications, start a journey.
                  </p>
                  <Button asChild size="sm">
                    <Link
                      href="/dashboard/journeys/new"
                      className="flex items-center gap-1.5"
                    >
                      <PlusCircle className="h-4 w-4" /> Start Travel Journey
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Journey Ledger */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <p className="text-sm font-medium text-white/90">Journey Ledger</p>
              <p className="text-xs text-white/40 mt-0.5">
                Archived and recent healthcare support history
              </p>
            </div>
            <div className="p-2">
              {recentJourneys.length === 0 ? (
                <p className="text-xs text-white/40 py-6 text-center">
                  No journey logs found
                </p>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {recentJourneys.map((j) => (
                    <Link
                      key={j.id}
                      href={`/dashboard/journeys/${j.id}`}
                      className="flex items-center justify-between py-3 px-3 hover:bg-white/[0.02] rounded-md transition-colors group"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-white/75 group-hover:text-white/90">
                          {j.city}, {j.country}
                        </p>
                        <p className="text-[10px] text-white/40 truncate max-w-md">
                          {(j.symptoms as string[] || []).join(", ") ||
                            "No symptom list"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[9px] rounded-full px-1.5 py-0.5 font-medium ${
                            severityStyles[j.severityLevel || "LOW"]
                          }`}
                        >
                          {j.severityLevel || "LOW"}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] border-white/[0.08] bg-white/[0.02] text-white/55"
                        >
                          {j.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="space-y-4">
          {/* Command Actions Panel */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
              Command Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/dashboard/journeys/new", icon: PlusCircle, label: "Start Journey" },
                { href: "/dashboard/agent", icon: Bot, label: "Assistant" },
                { href: "/dashboard/medications", icon: Pill, label: "Med Guide" },
                { href: "/dashboard/providers", icon: MapPin, label: "Find Provider" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
                >
                  <action.icon className="h-4 w-4 text-[#00E5FF] mb-1.5" />
                  <span className="text-[11px] font-medium text-white/75">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Passport Status */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Passport Security
              </p>
              {passport ? (
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-amber-500" />
              )}
            </div>
            <div className="space-y-2 mb-3">
              <p className="text-xs font-medium text-white/85">
                {passport ? "Passport Profile Activated" : "Passport Missing"}
              </p>
              <p className="text-[11px] text-white/40 leading-relaxed">
                {passport
                  ? "Your portable global clinical profile is encrypted and ready to share with international clinics."
                  : "Create your portable profile to easily share medications and records abroad."}
              </p>
            </div>
            <Link
              href="/dashboard/passport"
              className="btn-secondary text-xs w-full justify-center"
            >
              {passport ? "Manage Profile" : "Activate Passport"}
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
              Recent Activity
            </p>
            {auditLogs.length === 0 ? (
              <p className="text-[11px] text-white/40 py-2">No activity recorded</p>
            ) : (
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex gap-2.5 text-[11px] items-start"
                  >
                    <Activity className="h-3.5 w-3.5 text-white/35 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/75 font-medium leading-tight">
                        {humanizeEvent(log.event, log.metadata)}
                      </p>
                      <p className="text-[9px] text-white/35 mt-0.5">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Travel Context */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
              Travel Context
            </p>
            <div className="space-y-3">
              {[
                { icon: MapPin, label: "Location", value: activeJourney ? `${activeJourney.city}, ${activeJourney.country}` : "Not traveling" },
                { icon: Globe, label: "Language", value: activeJourney?.language || "Not set" },
                { icon: Heart, label: "Passport", value: passport ? "Active" : "Not configured" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-3.5 w-3.5 text-white/35 shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/35">{item.label}</p>
                    <p className="text-[13px] text-white/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
