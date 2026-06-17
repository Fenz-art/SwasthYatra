import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function ProviderAnalytics() {
  const session = await auth()
  if (!session?.user) return null

  const assignments = await prisma.providerAssignment.findMany({
    where: { providerId: session.user.id },
  })

  const totalAssignments = assignments.length
  const acceptedCount = assignments.filter((a) => a.status === "ACCEPTED" || a.status === "COMPLETED" || a.status === "ACTIVE" || a.status === "IN_PROGRESS").length
  const completedCount = assignments.filter((a) => a.status === "COMPLETED").length
  const pendingCount = assignments.filter((a) => a.status === "PENDING").length

  const journeyIds = assignments.map((a) => a.journeyId)
  const outcomes = await prisma.outcomeInsight.findMany({
    where: { travelHealthSessionId: { in: journeyIds } },
  })

  const avgRecovery = outcomes.length > 0
    ? Math.round(outcomes.reduce((s, o) => s + (o.recoveryTimeHours ?? 0), 0) / outcomes.length)
    : 0

  const avgRating = outcomes.length > 0
    ? Math.round((outcomes.reduce((s, o) => s + (o.rating ?? 0), 0) / outcomes.length) * 10) / 10
    : 0

  const acceptanceRate = totalAssignments > 0
    ? Math.round((acceptedCount / totalAssignments) * 100)
    : 0

  const completionRate = acceptedCount > 0
    ? Math.round((completedCount / acceptedCount) * 100)
    : 0

  const outcomeScore = outcomes.length > 0
    ? Math.round(outcomes.filter((o) => o.result === "RECOVERED").length / outcomes.length * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground">Your response metrics, outcome scores, and historical performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="p-4">
          <div className="text-2xl font-bold">{acceptanceRate}%</div>
          <div className="text-sm text-muted-foreground">Acceptance Rate</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{completionRate}%</div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{avgRating}</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{avgRecovery}h</div>
          <div className="text-sm text-muted-foreground">Avg Recovery</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{outcomeScore}%</div>
          <div className="text-sm text-muted-foreground">Outcome Score</div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Assignment Pipeline</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-medium">{totalAssignments}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pending</span>
              <span className="font-medium text-yellow-600">{pendingCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accepted</span>
              <span className="font-medium text-green-600">{acceptedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span className="font-medium text-blue-600">{completedCount}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Outcomes</h2>
          {outcomes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No outcomes recorded yet.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {outcomes.slice(0, 10).map((o) => (
                <div key={o.id} className="flex justify-between text-sm border-b pb-1">
                  <span>{o.symptoms.slice(0, 2).join(", ")}</span>
                  <span className="text-muted-foreground">
                    {o.result} · {o.recoveryTimeHours ?? "—"}h · ★{o.rating ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Assignment History</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {assignments.map((a) => (
            <div key={a.id} className="flex items-center justify-between text-sm border-b py-1.5">
              <span className="font-mono text-xs">{a.id.slice(0, 8)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                a.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                a.status === "ACCEPTED" || a.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                a.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                a.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}>{a.status}</span>
              <span className="text-muted-foreground">{a.createdAt.toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
