import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  ACTIVE: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  RESOLVED: "bg-gray-100 text-gray-700",
  ESCALATED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-500",
}

export default async function ProviderAssignments() {
  const session = await auth()
  if (!session?.user) return null

  const assignments = await prisma.providerAssignment.findMany({
    where: { providerId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  const pendingCount = assignments.filter((a) => a.status === "PENDING").length
  const activeCount = assignments.filter((a) => a.status === "ACCEPTED" || a.status === "ACTIVE" || a.status === "IN_PROGRESS").length
  const completedCount = assignments.filter((a) => a.status === "COMPLETED").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Patient cases assigned to you by the agent system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 border-l-4 border-l-yellow-400">
          <div className="text-2xl font-bold">{pendingCount}</div>
          <div className="text-sm text-muted-foreground">Pending Response</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-400">
          <div className="text-2xl font-bold">{activeCount}</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-400">
          <div className="text-2xl font-bold">{completedCount}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </Card>
      </div>

      {assignments.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          <p className="text-lg font-medium mb-1">No assignments yet</p>
          <p className="text-sm">When travelers in your area need care, assignments will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <Card key={a.id} className={`p-4 ${a.status === "PENDING" ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Assignment</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[a.status] ?? "bg-gray-100"}`}>
                    {a.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{a.createdAt.toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Priority: {a.priority} · Journey: {a.journeyId.slice(0, 8)}
              </p>
              {a.resolvedAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Resolved: {a.resolvedAt.toLocaleDateString()}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                {a.status === "PENDING" && (
                  <>
                    <Link
                      href={`/provider/conversations?assignmentId=${a.id}`}
                      className="text-xs px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Accept
                    </Link>
                    <Link
                      href={`/provider/conversations?assignmentId=${a.id}`}
                      className="text-xs px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Decline
                    </Link>
                  </>
                )}
                {a.status === "ACCEPTED" && (
                  <Link
                    href={`/provider/conversations?assignmentId=${a.id}`}
                    className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Open Conversation
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
