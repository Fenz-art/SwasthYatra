import { prisma } from "@/lib/prisma"

export const memoryTool = {
  async getMemories(userId: string) {
    return prisma.medicalMemory.findMany({
      where: { userId },
    })
  },

  async getMemoriesByType(userId: string, type: string) {
    return prisma.medicalMemory.findMany({
      where: { userId, type },
    })
  },
}
