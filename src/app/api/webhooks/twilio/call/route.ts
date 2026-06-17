import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const callSid = formData.get("CallSid") as string
  const callStatus = formData.get("CallStatus") as string
  const callDuration = formData.get("CallDuration") as string

  if (callSid) {
    const session = await prisma.callSession.findFirst({
      where: { id: callSid },
    })

    if (session) {
      const updates: Record<string, unknown> = {}

      if (callStatus === "completed" || callStatus === "in-progress") {
        updates.endedAt = new Date()
        if (callDuration) updates.durationSeconds = parseInt(callDuration, 10)
      }

      if (Object.keys(updates).length > 0) {
        await prisma.callSession.update({
          where: { id: session.id },
          data: updates,
        })
      }
    }
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Your call has been connected to SwasthYatra.</Say></Response>`
  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" },
  })
}
