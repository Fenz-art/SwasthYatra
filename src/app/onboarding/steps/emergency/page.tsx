"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function EmergencyStep() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", phone: "", relation: "" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
        <CardDescription>Who should we contact in case of an emergency?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Name</label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 123-4567" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Relation</label>
          <Input value={form.relation} onChange={e => setForm({ ...form, relation: e.target.value })} placeholder="e.g., Spouse, Parent, Sibling" />
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/onboarding/steps/insurance")}>Back</Button>
          <Button onClick={() => router.push("/onboarding/steps/complete")}>Review</Button>
        </div>
      </CardContent>
    </Card>
  )
}
