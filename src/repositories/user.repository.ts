import { prisma } from "@/lib/prisma"

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.user.update({ where: { id }, data: data as any })
  },

  async getMemories(userId: string) {
    return prisma.medicalMemory.findMany({ where: { userId } })
  },

  async getMemoriesByType(userId: string, type: string) {
    return prisma.medicalMemory.findMany({ where: { userId, type } })
  },

  async getJourneys(userId: string) {
    return prisma.travelHealthSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  },

  async getPassport(userId: string) {
    return prisma.healthPassport.findUnique({ where: { userId } })
  },

  async getDocuments(userId: string) {
    return prisma.vaultDocument.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  },

  async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
  },

  async getOrganizations(userId: string) {
    return prisma.organizationMember.findMany({
      where: { userId },
      include: { organization: true },
    })
  },
}
