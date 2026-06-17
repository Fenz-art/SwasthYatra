import { prisma } from "@/lib/prisma"

export async function processOcr(documentId: string): Promise<string | null> {
  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { status: "OCR_PROCESSING" },
  })

  const document = await prisma.vaultDocument.findUnique({ where: { id: documentId } })
  if (!document) throw new Error("Document not found")

  const ocrText = `[OCR processed: ${document.fileName}]`

  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { ocrText, ocrCompleted: true, status: "OCR_COMPLETE" },
  })

  await prisma.vaultAuditLog.create({
    data: { documentId, action: "OCR_COMPLETED", metadata: { fileName: document.fileName } },
  })

  return ocrText
}
