"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import CreateOrgButton from "./create-org-button"

export default async function OrganizationsPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const memberships = await prisma.organizationMember.findMany({
    where: { userId: session.user.id, isActive: true },
    include: { organization: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Organizations</h1>
          <p className="text-muted-foreground">Manage your healthcare organizations</p>
        </div>
        <CreateOrgButton />
      </div>

      {memberships.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No organizations yet.</p>
            <p className="text-sm text-muted-foreground">Create an organization to manage providers, clinics, or hospitals.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {memberships.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{m.organization.name}</span>
                  <Badge>{m.role}</Badge>
                </CardTitle>
                <CardDescription>
                  {m.organization.type} • {m.organization.country || "Global"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/organizations/${m.organizationId}`}>Dashboard</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/organizations/${m.organizationId}/members`}>Members</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
