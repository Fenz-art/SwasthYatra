import { prisma } from "@/lib/prisma"

export const passportTool = {
  async getPassport(userId: string) {
    return prisma.healthPassport.findUnique({
      where: { userId },
    })
  },

  async getPassportById(id: string) {
    return prisma.healthPassport.findUnique({
      where: { id },
    })
  },
}
