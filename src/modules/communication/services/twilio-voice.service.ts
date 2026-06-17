const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

function getAuthHeader(): string {
  return "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")
}

export const twilioVoiceService = {
  isConfigured(): boolean {
    return !!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER)
  },

  async createCall(to: string, webhookUrl: string) {
    if (!this.isConfigured()) {
      return { success: false, error: "Twilio not configured" }
    }

    const params = new URLSearchParams({
      To: to,
      From: TWILIO_PHONE_NUMBER!,
      Url: webhookUrl,
      StatusCallback: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/webhooks/twilio/call`,
    })

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`,
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
    return { success: response.ok, sid: data.sid, status: data.status, error: data.message }
  },

  async endCall(callSid: string) {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}.json`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ Status: "completed" }),
      },
    )

    return { success: response.ok }
  },

  async getCallStatus(callSid: string) {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}.json`,
      { headers: { Authorization: getAuthHeader() } },
    )

    if (!response.ok) return null
    return response.json()
  },
}
