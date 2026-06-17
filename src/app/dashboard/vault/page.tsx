"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VaultUploadForm } from "./_components/upload-form"

export default async function VaultPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const documents = await prisma.vaultDocument.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  const statusColors: Record<string, string> = {
    UPLOADED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    PROCESSING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    FAILED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Health Vault</h1>
        <p className="text-muted-foreground">Store and manage your medical documents</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Upload Document</CardTitle></CardHeader>
        <CardContent>
          <VaultUploadForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No documents uploaded yet. Upload a prescription, lab report, or medical certificate.
            </p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{doc.fileName}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[doc.status] || ""}`}>
                        {doc.status}
                      </span>
                      {doc.ocrCompleted && <Badge variant="secondary">OCR</Badge>}
                      {doc.extracted && <Badge variant="secondary">Extracted</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(doc.createdAt).toLocaleString()}</p>
                  </div>
                  <form action={async () => {
                    "use server"
                    const { deleteVaultDocument } = await import("@/modules/vault/actions")
                    await deleteVaultDocument(doc.id)
                  }}>
                    <Button type="submit" variant="ghost" size="sm">Delete</Button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
