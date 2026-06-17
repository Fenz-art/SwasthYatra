import { prisma } from "@/lib/prisma"

export async function persistExtraction(candidateId: string, reviewerId: string): Promise<void> {
  const candidate = await prisma.medicalMemoryCandidate.findUnique({
    where: { id: candidateId },
  })

  if (!candidate) throw new Error("Candidate not found")
  if (candidate.status !== "PENDING") throw new Error("Candidate already processed")

  await prisma.medicalMemory.create({
    data: {
      userId: candidate.userId,
      type: candidate.extractedType ?? "CONDITION",
      data: candidate.extractedData as any,
      confidence: candidate.confidence,
      sourceType: "document",
      sourceDocumentId: candidate.documentId,
      verifiedAt: new Date(),
      verifiedBy: reviewerId,
    },
  })

  await prisma.medicalMemoryCandidate.update({
    where: { id: candidateId },
    data: { status: "APPROVED", reviewedBy: reviewerId },
  })
}
