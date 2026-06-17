"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ProfileStep() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", phoneNumber: "", bloodType: "" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Profile</CardTitle>
        <CardDescription>Let us know who you are</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} placeholder="+1 (555) 123-4567" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Blood Type</label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.bloodType} onChange={e => setForm({ ...form, bloodType: e.target.value })}>
            <option value="">Select blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={() => router.push("/onboarding/steps/medical")}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}
