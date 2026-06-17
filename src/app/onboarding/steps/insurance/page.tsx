"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function InsuranceStep() {
  const router = useRouter()
  const [form, setForm] = useState({ provider: "", policyNumber: "" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Information</CardTitle>
        <CardDescription>Add your travel or health insurance details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Insurance Provider</label>
          <Input value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} placeholder="e.g., AXA, Allianz, Blue Cross" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Policy Number (optional)</label>
          <Input value={form.policyNumber} onChange={e => setForm({ ...form, policyNumber: e.target.value })} placeholder="Policy number" />
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/onboarding/steps/allergies")}>Back</Button>
          <Button onClick={() => router.push("/onboarding/steps/emergency")}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}
