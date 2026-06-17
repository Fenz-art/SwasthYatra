"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function JourneysPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const journeys = await prisma.travelHealthSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Healthcare Journeys</h1>
          <p className="text-muted-foreground">Track your healthcare experiences abroad</p>
        </div>
        <Button asChild><Link href="/dashboard/journeys/new">New Journey</Link></Button>
      </div>

      {journeys.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No healthcare journeys yet.</p>
            <Button asChild><Link href="/dashboard/journeys/new">Start Your First Journey</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {journeys.map((j) => (
            <Link key={j.id} href={`/dashboard/journeys/${j.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <p className="font-medium">{j.city}, {j.country}</p>
                    <p className="text-sm text-muted-foreground">
                      {(j.symptoms as string[] || []).join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(j.createdAt).toLocaleDateString()} • {j.language}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      j.severityLevel === "HIGH" || j.severityLevel === "CRITICAL" ? "destructive" :
                      j.severityLevel === "MEDIUM" ? "secondary" : "outline"
                    }>
                      {j.severityLevel || "Unknown"}
                    </Badge>
                    <Badge variant={j.status === "ACTIVE" ? "default" : "secondary"}>
                      {j.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
