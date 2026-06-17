import { messageDeliveryService } from "./message-delivery.service"

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER

function getAuthHeader(): string {
  return "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")
}

export const twilioWhatsAppService = {
  isConfigured(): boolean {
    return !!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_WHATSAPP_NUMBER)
  },

  async sendMessage(to: string, body: string, deliveryId?: string) {
    if (!this.isConfigured()) {
      return { success: false, error: "Twilio not configured" }
    }

    const params = new URLSearchParams({
      To: `whatsapp:${to}`,
      From: `whatsapp:${TWILIO_WHATSAPP_NUMBER!}`,
      Body: body,
    })

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      },
    )

    const data = await response.json()

    if (response.ok && deliveryId) {
      await messageDeliveryService.markSent(deliveryId, data.sid)
    }

    return {
      success: response.ok,
      sid: data.sid,
      status: data.status,
      error: data.message,
    }
  },

  async sendTemplate(to: string, templateContent: string, deliveryId?: string) {
    return this.sendMessage(to, templateContent, deliveryId)
  },

  async sendInteractiveMessage(to: string, body: string, buttons: string[], deliveryId?: string) {
    const interactiveBody = `${body}\n\n${buttons.map((b, i) => `${i + 1}. ${b}`).join("\n")}`
    return this.sendMessage(to, interactiveBody, deliveryId)
  },

  async getMessageStatus(messageSid: string) {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages/${messageSid}.json`,
      {
        headers: { Authorization: getAuthHeader() },
      },
    )

    if (!response.ok) return null
    return response.json()
  },
}
