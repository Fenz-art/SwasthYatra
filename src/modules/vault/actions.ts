"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { assertDocumentOwnership } from "@/server/security/ownership"
import { auditService } from "@/server/audit/service"
import { publishers } from "@/packages/event-bus"
import { processOcr } from "./pipeline/ocr"
import { translateDocument } from "./pipeline/translate"
import { extractFromDocument } from "./pipeline/extract"

export type DocumentType = "PRESCRIPTION" | "LAB_REPORT" | "VACCINATION" | "INSURANCE" | "OTHER"

export async function uploadVaultDocument(data: {
  type: string
  fileName: string
  fileUrl: string
  mimeType?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const type = data.type
  const fileName = data.fileName
  const fileUrl = data.fileUrl

  const document = await prisma.vaultDocument.create({
    data: {
      userId: session.user.id,
      type,
      fileName,
      fileUrl,
      fileSize: 0,
      mimeType: "application/octet-stream",
      status: "UPLOADED",
    },
  })

  await auditService.documentUploaded(session.user.id, document.id)

  publishers.documentUploaded({
    documentId: document.id,
    userId: session.user.id,
    type: document.type,
  })

  return document
}

export async function deleteVaultDocument(documentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertDocumentOwnership(documentId, session.user.id)
  await prisma.vaultDocument.delete({ where: { id: documentId } })

  await auditService.documentDeleted(session.user.id, documentId)

  return { success: true }
}

export async function processDocumentPipeline(documentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertDocumentOwnership(documentId, session.user.id)

  await processOcr(documentId)
  await translateDocument(documentId)
  await extractFromDocument(documentId, session.user.id)

  await auditService.documentProcessed(session.user.id, documentId)

  return { success: true }
}

export async function getVaultDocuments() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.vaultDocument.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })
}
