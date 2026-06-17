import { prisma } from "@/lib/prisma"

export async function extractFromDocument(documentId: string, userId: string): Promise<void> {
  const document = await prisma.vaultDocument.findUnique({ where: { id: documentId } })
  if (!document) throw new Error("Document not found")

  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { status: "EXTRACTING" },
  })

  const candidate = await prisma.medicalMemoryCandidate.create({
    data: {
      userId,
      documentId,
      extractedType: "MEDICATION",
      extractedData: { source: document.fileName, extractedFields: {} },
      confidence: 0.85,
      status: "PENDING",
    },
  })

  await prisma.vaultDocument.update({
    where: { id: documentId },
    data: { extracted: true, status: "EXTRACTED" },
  })

  await prisma.vaultAuditLog.create({
    data: { documentId, action: "EXTRACTION_COMPLETED", metadata: { candidateId: candidate.id } },
  })
}
