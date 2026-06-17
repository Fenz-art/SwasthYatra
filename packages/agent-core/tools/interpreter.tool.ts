import { prisma } from "@/lib/prisma"

export const interpreterTool = {
  async getSession(sessionId: string) {
    return prisma.interpreterSession.findUnique({
      where: { id: sessionId },
      include: { messages: true, contexts: true },
    })
  },

  async getMessages(sessionId: string) {
    return prisma.conversationMessage.findMany({
      where: { interpreterSessionId: sessionId },
      orderBy: { createdAt: "asc" },
    })
  },
}
