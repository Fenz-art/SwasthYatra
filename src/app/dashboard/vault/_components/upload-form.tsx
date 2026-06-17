"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { showToast } from "@/components/ui/toast"

export function VaultUploadForm() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ type: "PRESCRIPTION", fileName: "", fileUrl: "" })

  const handleUpload = async () => {
    if (!form.fileName || !form.fileUrl) {
      showToast("Please fill in all fields", "error")
      return
    }
    setUploading(true)
    try {
      const { uploadVaultDocument } = await import("@/modules/vault/actions")
      await uploadVaultDocument({
        type: form.type,
        fileName: form.fileName,
        mimeType: "application/pdf",
        fileUrl: form.fileUrl,
      })
      showToast("Document uploaded successfully", "success")
      setForm({ type: "PRESCRIPTION", fileName: "", fileUrl: "" })
      router.refresh()
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Document Type</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="PRESCRIPTION">Prescription</option>
            <option value="LAB_REPORT">Lab Report</option>
            <option value="INSURANCE">Insurance</option>
            <option value="VACCINATION">Vaccination Record</option>
            <option value="MEDICAL_CERTIFICATE">Medical Certificate</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">File Name</label>
          <Input
            value={form.fileName}
            onChange={e => setForm({ ...form, fileName: e.target.value })}
            placeholder="e.g., prescription-2024.pdf"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">File URL</label>
          <Input
            value={form.fileUrl}
            onChange={e => setForm({ ...form, fileUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Document"}
      </Button>
    </div>
  )
}
