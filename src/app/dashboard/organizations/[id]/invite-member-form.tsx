"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { showToast } from "@/components/ui/toast"

export default function InviteMemberForm({ organizationId }: { organizationId: string }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("DOCTOR")
  const [loading, setLoading] = useState(false)

  const handleInvite = async () => {
    if (!email) return
    setLoading(true)
    try {
      const { inviteMember } = await import("@/modules/organization/actions")
      await inviteMember({ organizationId, email, role })
      showToast(`Invitation sent to ${email}`, "success")
      setEmail("")
      router.refresh()
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-sm font-medium">Invite Member</CardTitle></CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            className="flex-1"
          />
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="DOCTOR">Doctor</option>
            <option value="PHARMACIST">Pharmacist</option>
            <option value="MEDICAL_ASSISTANT">Medical Assistant</option>
            <option value="ORG_OPERATOR">Operator</option>
          </select>
          <Button onClick={handleInvite} disabled={loading || !email}>
            {loading ? "Inviting..." : "Invite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
