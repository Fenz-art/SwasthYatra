import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function ProviderResponses() {
  const session = await auth()
  if (!session?.user) return null

  const assignments = await prisma.providerAssignment.findMany({
    where: { providerId: session.user.id },
  })
  const assignmentIds = assignments.map((a) => a.id)
  const contactAttempts = await prisma.providerContactAttempt.findMany({
    where: { assignmentId: { in: assignmentIds } },
  })
  const contactAttemptIds = contactAttempts.map((c) => c.id)

  const responses = await prisma.providerResponse.findMany({
    where: { contactAttemptId: { in: contactAttemptIds } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Responses</h1>
        <p className="text-muted-foreground">Your responses to patient inquiries and assignment requests.</p>
      </div>

      {responses.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No responses yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {responses.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{r.responseType.toLowerCase()}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  r.satisfied === true ? "bg-green-100 text-green-700" :
                  r.satisfied === false ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{r.satisfied === true ? "SATISFIED" : r.satisfied === false ? "UNSATISFIED" : "PENDING"}</span>
              </div>
              {r.responseText && <p className="text-sm text-muted-foreground mt-2">{r.responseText}</p>}
              {r.intent && <p className="text-xs text-muted-foreground mt-1">Intent: {r.intent}</p>}
              <p className="text-xs text-muted-foreground mt-1">{r.createdAt.toLocaleString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
