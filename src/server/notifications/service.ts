import { prisma } from "@/lib/prisma"

export const notificationService = {
  async send(params: {
    userId: string
    channel: "EMAIL" | "IN_APP" | "PUSH" | "WHATSAPP" | "SMS"
    title: string
    body: string
    actionUrl?: string
    priority?: string
    metadata?: Record<string, unknown>
  }) {
    const prefs = await prisma.notificationPreference.findUnique({
      where: { userId: params.userId }
    })

    if (params.channel === "IN_APP") {
      await prisma.notification.create({
        data: {
          userId: params.userId,
          channel: "IN_APP",
          title: params.title,
          body: params.body,
          actionUrl: params.actionUrl,
          priority: params.priority || "NORMAL",
          metadata: params.metadata as any,
          status: "SENT"
        }
      })
    }

    if (params.channel === "EMAIL" && prefs?.emailEnabled !== false) {
      // Integrate with Resend/SendGrid here
      await prisma.notification.create({
        data: {
          userId: params.userId,
          channel: "EMAIL",
          title: params.title,
          body: params.body,
          actionUrl: params.actionUrl,
          priority: params.priority || "NORMAL",
          status: "SENT"
        }
      })
    }
  }
}
