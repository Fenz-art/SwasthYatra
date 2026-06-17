"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function PassportPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const passport = await prisma.healthPassport.findUnique({
    where: { userId: session.user.id },
    include: {
      shareLinks: {
        where: { revoked: false, expiresAt: { gt: new Date() } },
        include: { accessLogs: true }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Health Passport</h1>
          <p className="text-muted-foreground">Your portable healthcare identity</p>
        </div>
        {!passport && (
          <form action={async () => {
            "use server"
            const { generatePassport } = await import("@/modules/passport/actions")
            await generatePassport()
          }}>
            <Button type="submit">Generate Passport</Button>
          </form>
        )}
      </div>

      {!passport ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Generate your health passport to share your medical information with providers.</p>
            <form action={async () => {
              "use server"
              const { generatePassport } = await import("@/modules/passport/actions")
              await generatePassport()
            }}>
              <Button type="submit">Create Passport</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Conditions</CardTitle></CardHeader>
              <CardContent>
                {(passport.data as any)?.conditions?.length > 0 ? (
                  <div className="space-y-2">
                    {(passport.data as any).conditions.map((c: any, i: number) => (
                      <div key={i} className="rounded-lg border p-2 text-sm">{c.name || JSON.stringify(c)}</div>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No conditions listed</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Allergies</CardTitle></CardHeader>
              <CardContent>
                {(passport.data as any)?.allergies?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(passport.data as any).allergies.map((a: any, i: number) => (
                      <Badge key={i} variant="destructive">{a.allergen || JSON.stringify(a)}</Badge>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No allergies listed</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Medications</CardTitle></CardHeader>
              <CardContent>
                {(passport.data as any)?.medications?.length > 0 ? (
                  <div className="space-y-2">
                    {(passport.data as any).medications.map((m: any, i: number) => (
                      <div key={i} className="rounded-lg border p-2 text-sm">
                        {m.medication || m.name} — {m.dosage || ""}
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No medications listed</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Emergency Contact</CardTitle></CardHeader>
              <CardContent>
                {(passport.data as any)?.emergencyContact ? (
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {(passport.data as any).emergencyContact.name}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {(passport.data as any).emergencyContact.phone}</p>
                  </div>
                ) : <p className="text-sm text-muted-foreground">No emergency contact</p>}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Share Passport</CardTitle>
              <CardDescription>Generate a secure link to share with healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              {passport.shareLinks.length > 0 ? (
                <div className="space-y-2">
                  {passport.shareLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="text-sm">
                        <p className="font-medium">Active Share Link</p>
                        <p className="text-xs text-muted-foreground">
                          Expires {new Date(link.expiresAt).toLocaleDateString()}
                          {' • '}{link.accessLogs.length} access{link.accessLogs.length !== 1 ? "es" : ""}
                        </p>
                      </div>
                      <form action={async () => {
                        "use server"
                        const { revokePassportShare } = await import("@/modules/passport/actions")
                        await revokePassportShare(link.id)
                      }}>
                        <Button type="submit" variant="ghost" size="sm">Revoke</Button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <form action={async () => {
                  "use server"
                  const { sharePassport } = await import("@/modules/passport/actions")
                  const result = await sharePassport(passport.id)
                  // In real implementation, copy to clipboard
                }}>
                  <Button type="submit">Generate Share Link</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
