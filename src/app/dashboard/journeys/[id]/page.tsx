"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  Compass,
  MapPin,
  Stethoscope,
  Activity,
  Heart,
  Calendar,
  Languages,
  UserCheck,
  CheckCircle,
  HelpCircle
} from "lucide-react"

export default async function JourneyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const journey = await prisma.travelHealthSession.findFirst({
    where: { id, userId: session.user.id },
    include: {
      timeline: { orderBy: { createdAt: "asc" } },
      interpreterSessions: {
        include: { messages: { take: 5, orderBy: { createdAt: "desc" } } }
      }
    }
  })

  if (!journey) notFound()

  const severityStyles: Record<string, string> = {
    LOW: "bg-green-500/10 text-green-400 border border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    CRITICAL: "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse",
  }

  // Humanize event types for the timeline
  const humanizeEventTitle = (type: string) => {
    switch (type) {
      case "SYMPTOM_ADDED":
        return "Symptom Logging Completed"
      case "SEVERITY_CALCULATED":
        return "Urgency Assessment Completed"
      case "PROVIDER_ROUTED":
        return "Provider Routing Configured"
      case "OUTCOME_RECORDED":
        return "Journey Resolution Captured"
      default:
        return type.replace(/_/g, " ")
    }
  }

  const humanizeEventDesc = (type: string, data: any) => {
    switch (type) {
      case "SYMPTOM_ADDED":
        return `Reported symptoms: ${(data?.symptoms as string[] || []).join(", ")}`
      case "SEVERITY_CALCULATED":
        return `Triage priority established as ${data?.severity || "LOW"} level.`
      case "OUTCOME_RECORDED":
        return `Learnings recorded: ${data?.result || "Resolved successfully"}`
      default:
        return "System operation recorded successfully."
    }
  }

  return (
    <div className="space-y-6">
      {/* Back & Title Bar */}
      <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/journeys"
            className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white/95 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Journeys
          </Link>
          <h1 className="text-xl font-semibold text-white/95 flex items-center gap-2">
            Journey in {journey.city}, {journey.country}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityStyles[journey.severityLevel || "LOW"]}`}>
            {journey.severityLevel || "LOW"} Urgency
          </span>
          <Badge variant="outline" className="border-white/[0.08] text-white/65 bg-white/[0.01]">
            {journey.status}
          </Badge>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Columns: Operations Timeline & Actions */}
        <div className="md:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/90">Case Timeline</CardTitle>
              <CardDescription className="text-xs text-white/45">
                Sequential operational stages verified by the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-4 space-y-6 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-white/[0.08]">
                {journey.timeline.map((event, i) => {
                  const isLast = i === journey.timeline.length - 1
                  return (
                    <div key={event.id} className="relative space-y-1 animate-in fade-in duration-200">
                      {/* Timeline dot */}
                      <span className="absolute -left-[18.5px] top-1.5 h-2 w-2 rounded-full border border-[#0D1015] bg-[#00E5FF]" />
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-xs font-semibold text-white/90">
                          {humanizeEventTitle(event.eventType)}
                        </p>
                        <span className="text-[10px] text-white/30 font-mono">
                          {new Date(event.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/45 pr-6">
                        {humanizeEventDesc(event.eventType, event.data)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action trigger footer */}
          {journey.status === "ACTIVE" && (
            <div className="flex flex-wrap gap-2.5">
              <Button asChild className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#07080A] font-semibold text-xs h-9 px-4 transition-colors">
                <Link href={`/dashboard/interpreter?sessionId=${journey.id}`} className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4" /> Activate Translation Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/[0.08] hover:bg-white/[0.04] text-white/95 text-xs h-9 px-4 transition-colors">
                <Link href={`/dashboard/providers?country=${journey.country}&city=${journey.city}`} className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Match Care Providers
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Metadata details */}
        <div className="space-y-6">
          {/* Profile details */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Session Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <span className="text-white/45">Country</span>
                <span className="font-medium text-white/90">{journey.country}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <span className="text-white/45">City</span>
                <span className="font-medium text-white/90">{journey.city}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <span className="text-white/45">Language Code</span>
                <span className="font-medium text-white/90">{journey.language}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <span className="text-white/45">Case Duration</span>
                <span className="font-medium text-white/90">{journey.duration || "Unspecified"}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-white/45">Registry Status</span>
                <span className="font-medium text-white/90 uppercase tracking-wider text-[10px]">{journey.status}</span>
              </div>
            </CardContent>
          </Card>

          {/* Reported Symptoms */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Reported Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {(journey.symptoms as string[] || []).map((s: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 text-xs text-white/80 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
