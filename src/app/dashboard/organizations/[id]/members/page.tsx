"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import InviteMemberForm from "../invite-member-form"

export default async function OrgMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const org = await prisma.organization.findUnique({
    where: { id },
    include: {
      members: {
        include: { user: { select: { name: true, email: true, image: true } } },
        orderBy: { createdAt: "asc" }
      },
      invitations: { where: { status: "PENDING" } }
    }
  })
  if (!org) notFound()

  const myMembership = org.members.find(m => m.userId === session.user.id)
  if (!myMembership?.isActive) notFound()

  const canManage = ["ORG_ADMIN", "SUPER_ADMIN"].includes(myMembership.role)

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/dashboard/organizations/${org.id}`} className="text-sm text-muted-foreground hover:text-foreground">← Back to {org.name}</Link>
        <h1 className="text-2xl font-bold mt-1">Members</h1>
        <p className="text-muted-foreground">{org.members.length} members</p>
      </div>

      {canManage && <InviteMemberForm organizationId={org.id} />}

      <Card>
        <CardHeader><CardTitle>All Members</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {org.members.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    {(m.user.name || m.user.email || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.user.name || "Unnamed"}</p>
                    <p className="text-xs text-muted-foreground">{m.user.email}</p>
                    {m.specialization && <p className="text-xs text-muted-foreground">{m.specialization}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{m.role}</Badge>
                  {canManage && m.userId !== session.user.id && (
                    <form action={async () => {
                      "use server"
                      const { removeMember } = await import("@/modules/organization/actions")
                      await removeMember(org.id, m.id)
                    }}>
                      <Button type="submit" variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {org.invitations.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Pending Invitations</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {org.invitations.map(inv => (
                <div key={inv.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{inv.email}</p>
                    <p className="text-xs text-muted-foreground">{inv.role} • Expires {inv.expiresAt.toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
