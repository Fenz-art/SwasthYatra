import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { messageDeliveryService } from "@/modules/communication/services/message-delivery.service"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const messageSid = formData.get("MessageSid") as string
  const smsStatus = formData.get("SmsStatus") as string
  const from = formData.get("From") as string
  const body = formData.get("Body") as string

  if (messageSid) {
    const delivery = await messageDeliveryService.findByExternalId(messageSid)
    if (delivery) {
      switch (smsStatus) {
        case "delivered":
          await messageDeliveryService.markDelivered(delivery.id)
          break
        case "read":
          await messageDeliveryService.markRead(delivery.id)
          break
        case "failed":
        case "undelivered":
          await messageDeliveryService.markFailed(delivery.id, smsStatus, "Provider delivery failed")
          break
      }
    }
  }

  if (body && from) {
    const providerPhone = from.replace("whatsapp:", "")
    const lead = await prisma.providerLead.findFirst({
      where: { phone: providerPhone },
    })

    if (lead) {
      await prisma.providerContactAttempt.updateMany({
        where: { providerId: lead.id, status: "PENDING" },
        data: { status: "RESPONDED", respondedAt: new Date() },
      })

      await prisma.providerResponse.create({
        data: {
          contactAttemptId: lead.id,
          responseText: body,
          responseType: body.toLowerCase().includes("yes") ? "ACCEPT" : "DECLINE",
          receivedAt: new Date(),
        },
      })

      if (body.toLowerCase().includes("yes")) {
        const assignment = await prisma.providerAssignment.findFirst({
          where: { providerId: lead.providerId ?? "" },
          orderBy: { createdAt: "desc" },
        })

        if (assignment) {
          await prisma.providerAssignment.update({
            where: { id: assignment.id },
            data: { status: "RESOLVED", resolvedAt: new Date() },
          })
        }
      }
    }
  }

  return NextResponse.json({ ok: true })
}
