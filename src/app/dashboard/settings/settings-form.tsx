"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  user: {
    name?: string | null
    phoneNumber?: string | null
    bloodType?: string | null
    emergencyContact?: any
    insuranceInfo?: any
  } | null
}

export default function SettingsForm({ user }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Mock save
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Display Name</label>
        <Input defaultValue={user?.name || ""} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <Input defaultValue={user?.phoneNumber || ""} placeholder="+1 (555) 123-4567" />
      </div>
      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
