import { prisma } from "@/lib/prisma"

export async function translateDocument(documentId: string, targetLanguage: string = "en"): Promise<string | null> {
  const document = await prisma.vaultDocument.findUnique({ where: { id: documentId } })
  if (!document) throw new Error("Document not found")

  if (!document.ocrText) {
    throw new Error("Document must be OCR processed before translation")
  }

  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { status: "TRANSLATING" },
  })

  const translatedText = `[Translated to ${targetLanguage}: ${document.ocrText}]`

  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { translatedText, translated: true, status: "TRANSLATED" },
  })

  await prisma.vaultAuditLog.create({
    data: { documentId, action: "TRANSLATION_COMPLETED", metadata: { targetLanguage } },
  })

  return translatedText
}
