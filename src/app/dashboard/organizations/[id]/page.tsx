"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function OrgDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const org = await prisma.organization.findUnique({
    where: { id },
    include: {
      members: {
        include: { user: { select: { name: true, email: true } } }
      }
    }
  })
  if (!org) notFound()

  const myMembership = org.members.find(m => m.userId === session.user.id)
  if (!myMembership?.isActive) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/organizations" className="text-sm text-muted-foreground hover:text-foreground">← Back to Organizations</Link>
        <h1 className="text-2xl font-bold mt-1">{org.name}</h1>
        <p className="text-muted-foreground">{org.type}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Members</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{org.members.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Your Role</CardTitle></CardHeader>
          <CardContent><Badge>{myMembership.role}</Badge></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Created</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{org.createdAt.toLocaleDateString()}</p></CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline"><Link href={`/dashboard/organizations/${org.id}/members`}>Manage Members</Link></Button>
        {["ORG_ADMIN", "SUPER_ADMIN"].includes(myMembership.role) && (
          <Button asChild variant="outline"><Link href={`/dashboard/organizations/${org.id}/invitations`}>Invitations</Link></Button>
        )}
        <Button asChild variant="outline"><Link href={`/dashboard/organizations/${org.id}/analytics`}>Analytics</Link></Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Members</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {org.members.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{m.user.name || m.user.email}</p>
                  <p className="text-xs text-muted-foreground">{m.user.email}</p>
                </div>
                <Badge>{m.role}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
