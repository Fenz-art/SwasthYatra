import { prisma } from "@/lib/prisma"

export const passportRepository = {
  async findByUser(userId: string) {
    return prisma.healthPassport.findUnique({ where: { userId } })
  },

  async create(userId: string, data: Record<string, unknown>) {
    return prisma.healthPassport.create({
      data: { userId, data: data as any },
    })
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.healthPassport.update({
      where: { id },
      data: { data: data as any },
    })
  },

  async createShareLink(passportId: string, expiresAt: Date) {
    const token = crypto.randomUUID()
    return prisma.passportShareLink.create({
      data: { passportId, token, expiresAt },
    })
  },

  async revokeShareLink(shareLinkId: string) {
    return prisma.passportShareLink.update({
      where: { id: shareLinkId },
      data: { revoked: true },
    })
  },

  async getShareLinks(passportId: string) {
    return prisma.passportShareLink.findMany({
      where: { passportId },
      orderBy: { createdAt: "desc" },
    })
  },

  async getShareByToken(token: string) {
    return prisma.passportShareLink.findUnique({
      where: { token },
      include: { passport: true },
    })
  },

  async logAccess(shareLinkId: string, accessorIp?: string, userAgent?: string) {
    return prisma.passportAccessLog.create({
      data: { shareLinkId, accessorIp, userAgent },
    })
  },
}
