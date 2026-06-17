import { prisma } from "@/lib/prisma"
import type { CommunicationChannel } from "@prisma/client"

export const channelRouter = {
  async route(providerId: string): Promise<CommunicationChannel> {
    const profile = await prisma.providerContactProfile.findUnique({
      where: { providerId },
    })

    if (profile?.whatsappNumber) return "WHATSAPP"
    if (profile?.phoneNumber) return "PHONE"
    if (profile?.email) return "EMAIL"

    return "IN_APP"
  },

  async routeWithFallback(providerId: string): Promise<CommunicationChannel[]> {
    const profile = await prisma.providerContactProfile.findUnique({
      where: { providerId },
    })

    const preferred: CommunicationChannel[] = []
    if (profile?.whatsappNumber) preferred.push("WHATSAPP")
    if (profile?.phoneNumber) preferred.push("PHONE")
    if (profile?.email) preferred.push("EMAIL")
    preferred.push("IN_APP")

    return preferred
  },
}
