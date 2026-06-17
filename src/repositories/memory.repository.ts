import { prisma } from "@/lib/prisma"

export const memoryRepository = {
  async findByUser(userId: string) {
    return prisma.medicalMemory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  },

  async findByType(userId: string, type: string) {
    return prisma.medicalMemory.findMany({ where: { userId, type } })
  },

  async create(data: {
    userId: string
    type: string
    data: any
    confidence?: number
    sourceType?: string
    sourceDocumentId?: string
    sourceSessionId?: string
  }) {
    return prisma.medicalMemory.create({ data: data as any })
  },

  async delete(id: string) {
    return prisma.medicalMemory.delete({ where: { id } })
  },

  async getPendingCandidates(userId?: string) {
    const where: any = { status: "PENDING" }
    if (userId) where.userId = userId
    return prisma.medicalMemoryCandidate.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  },

  async approveCandidate(candidateId: string, reviewerId: string) {
    const candidate = await prisma.medicalMemoryCandidate.findUnique({
      where: { id: candidateId },
    })
    if (!candidate) throw new Error("Candidate not found")

    const memory = await prisma.medicalMemory.create({
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

    return memory
  },

  async rejectCandidate(candidateId: string, reviewerId: string) {
    return prisma.medicalMemoryCandidate.update({
      where: { id: candidateId },
      data: { status: "REJECTED", reviewedBy: reviewerId },
    })
  },
}
