import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { escalationService } from "@/modules/escalation"
import Link from "next/link"

const SEVERITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
}

const STATUS_COLORS: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
}

export default async function AdminEscalations() {
  const session = await auth()
  if (!session?.user) return null

  const [cases, stats] = await Promise.all([
    escalationService.findAll(),
    escalationService.getStats(),
  ])

  const openCases = stats.byStatus["OPEN"] ?? 0
  const inProgress = stats.byStatus["IN_PROGRESS"] ?? 0
  const critical = stats.bySeverity["CRITICAL"] ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Escalation Center</h1>
        <p className="text-muted-foreground">Human oversight queue for failed automated processes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{openCases}</div>
          <div className="text-sm text-muted-foreground">Open Cases</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">{inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{critical}</div>
          <div className="text-sm text-muted-foreground">Critical</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Cases</div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-3">By Status</h2>
          <div className="space-y-1">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between text-sm">
                <span className={STATUS_COLORS[status]?.split(" ")[0]}>{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-3">By Severity</h2>
          <div className="space-y-1">
            {Object.entries(stats.bySeverity).map(([sev, count]) => (
              <div key={sev} className="flex justify-between text-sm">
                <span className={SEVERITY_COLORS[sev]?.split(" ")[0]}>{sev}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-3">By Reason</h2>
          <div className="space-y-1">
            {Object.entries(stats.byReason).map(([reason, count]) => (
              <div key={reason} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{reason.replace(/_/g, " ").toLowerCase()}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">Case</th>
              <th className="pb-3 font-medium">Journey</th>
              <th className="pb-3 font-medium">Severity</th>
              <th className="pb-3 font-medium">Reason</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Operator</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-muted/50">
                <td className="py-2.5 font-mono text-xs">{c.id.slice(0, 8)}</td>
                <td className="py-2.5 font-mono text-xs text-muted-foreground">{c.journeyId.slice(0, 8)}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${SEVERITY_COLORS[c.severity] ?? ""}`}>
                    {c.severity}
                  </span>
                </td>
                <td className="py-2.5 text-muted-foreground text-xs">{c.reason.replace(/_/g, " ")}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status] ?? ""}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-2.5 text-muted-foreground">{c.assignedOperatorId?.slice(0, 8) ?? "—"}</td>
                <td className="py-2.5 text-muted-foreground">{c.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {cases.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground">
                  No escalation cases. The system is running smoothly.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
