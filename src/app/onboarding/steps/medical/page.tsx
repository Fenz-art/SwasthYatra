"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function MedicalStep() {
  const router = useRouter()
  const [form, setForm] = useState({ conditions: "" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription>Tell us about any existing medical conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Existing Conditions</label>
          <Textarea
            value={form.conditions}
            onChange={e => setForm({ ...form, conditions: e.target.value })}
            placeholder="e.g., Type 2 Diabetes, Hypertension (one per line)"
            rows={4}
          />
          <p className="text-xs text-muted-foreground">List any chronic conditions you have</p>
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/onboarding/steps/profile")}>Back</Button>
          <Button onClick={() => router.push("/onboarding/steps/allergies")}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}
