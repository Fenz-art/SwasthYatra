"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { showToast } from "@/components/ui/toast"

export default function CreateOrgButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", slug: "", type: "HOSPITAL", country: "", city: "", description: "" })
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const { createOrganization } = await import("@/modules/organization/actions")
      await createOrganization(form)
      showToast("Organization created!", "success")
      setOpen(false)
      router.refresh()
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>Set up a new healthcare organization</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., TravelWell Clinic" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="travelwell-clinic" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="HOSPITAL">Hospital</option>
              <option value="CLINIC">Clinic</option>
              <option value="PHARMACY">Pharmacy</option>
              <option value="TELEMEDICINE">Telemedicine</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Country" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" />
            </div>
          </div>
          <Button onClick={handleCreate} className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
