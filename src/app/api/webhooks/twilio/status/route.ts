import { NextRequest, NextResponse } from "next/server"
import { messageDeliveryService } from "@/modules/communication/services/message-delivery.service"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const messageSid = formData.get("MessageSid") as string
  const messageStatus = formData.get("MessageStatus") as string
  const errorCode = formData.get("ErrorCode") as string
  const errorMessage = formData.get("ErrorMessage") as string

  if (messageSid) {
    const delivery = await messageDeliveryService.findByExternalId(messageSid)
    if (delivery) {
      switch (messageStatus) {
        case "sent":
          await messageDeliveryService.markSent(delivery.id, messageSid)
          break
        case "delivered":
          await messageDeliveryService.markDelivered(delivery.id)
          break
        case "read":
          await messageDeliveryService.markRead(delivery.id)
          break
        case "failed":
        case "undelivered":
          await messageDeliveryService.markFailed(delivery.id, errorCode, errorMessage)
          break
      }
    }
  }

  return NextResponse.json({ ok: true })
}
