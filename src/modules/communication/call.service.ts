import { prisma } from "@/lib/prisma"

export const callService = {
  async start(conversationId: string) {
    return prisma.callSession.create({
      data: { conversationId, startedAt: new Date() },
    })
  },

  async end(id: string) {
    const session = await prisma.callSession.findUnique({ where: { id } })
    if (!session) throw new Error("Call session not found")

    const durationSeconds = Math.floor(
      (Date.now() - session.startedAt.getTime()) / 1000,
    )

    return prisma.callSession.update({
      where: { id },
      data: { endedAt: new Date(), durationSeconds },
    })
  },

  async findByConversation(conversationId: string) {
    return prisma.callSession.findMany({
      where: { conversationId },
      orderBy: { startedAt: "desc" },
    })
  },
}
