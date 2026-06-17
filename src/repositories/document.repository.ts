import { prisma } from "@/lib/prisma"

export const documentRepository = {
  async findById(id: string) {
    return prisma.vaultDocument.findUnique({ where: { id } })
  },

  async findByUser(userId: string) {
    return prisma.vaultDocument.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  },

  async create(data: {
    userId: string
    type: string
    fileName: string
    fileUrl: string
    mimeType: string
    fileSize?: number
    storageKey?: string
  }) {
    return prisma.vaultDocument.create({ data: data as any })
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.vaultDocument.update({ where: { id }, data: data as any })
  },

  async delete(id: string) {
    return prisma.vaultDocument.delete({ where: { id } })
  },

  async getByStatus(status: string) {
    return prisma.vaultDocument.findMany({
      where: { status },
      orderBy: { createdAt: "asc" },
    })
  },

  async getProcessed() {
    return prisma.vaultDocument.findMany({
      where: { status: "EXTRACTED" },
    })
  },

  async logAudit(documentId: string, action: string, actorId?: string, metadata?: Record<string, unknown>) {
    return prisma.vaultAuditLog.create({
      data: { documentId, action, actorId, metadata: metadata as any },
    })
  },
}
