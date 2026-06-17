"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"

export default async function MemoryPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const [memories, candidates] = await Promise.all([
    prisma.medicalMemory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" }
    }),
    prisma.medicalMemoryCandidate.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: { vaultDoc: { select: { fileName: true } } }
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medical Memory</h1>
        <p className="text-muted-foreground">Your verified healthcare knowledge base</p>
      </div>

      {candidates.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <span>Pending Review</span>
              <Badge variant="secondary">{candidates.length}</Badge>
            </CardTitle>
            <CardDescription>New medical records extracted from documents need your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{c.extractedType}</p>
                  <p className="text-xs text-muted-foreground">
                    From: {c.vaultDoc?.fileName || "Unknown document"}
                    {c.confidence ? ` • ${Math.round(c.confidence * 100)}% confidence` : ""}
                  </p>
                  <pre className="mt-1 text-xs text-muted-foreground bg-muted/50 rounded p-1">
                    {JSON.stringify(c.extractedData, null, 2)}
                  </pre>
                </div>
                <div className="flex gap-1">
                  <form action={async () => {
                    "use server"
                    const { approveCandidate } = await import("@/modules/memory/actions")
                    await approveCandidate(c.id)
                  }}>
                    <Button type="submit" size="sm">Approve</Button>
                  </form>
                  <form action={async () => {
                    "use server"
                    const { rejectCandidate } = await import("@/modules/memory/actions")
                    await rejectCandidate(c.id)
                  }}>
                    <Button type="submit" size="sm" variant="outline">Reject</Button>
                  </form>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Approved Memories</CardTitle>
          <CardDescription>{memories.length} verified medical records</CardDescription>
        </CardHeader>
        <CardContent>
          {memories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No memories yet. Upload documents to get started.</p>
          ) : (
            <div className="space-y-2">
              {memories.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Badge variant="outline" className="mb-1">{m.type}</Badge>
                    <pre className="text-xs text-muted-foreground">{JSON.stringify(m.data, null, 2)}</pre>
                    {m.confidence && <p className="text-xs text-muted-foreground mt-1">Confidence: {Math.round(m.confidence * 100)}%</p>}
                  </div>
                  {m.verifiedAt && (
                    <p className="text-xs text-muted-foreground">
                      Verified {m.verifiedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
