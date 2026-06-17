import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { availabilityEngine } from "@/modules/provider/availability"

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const schedule = await availabilityEngine.getOrCreateSchedule(session.user.id)
  return NextResponse.json({ slots: schedule.slots, exceptions: schedule.exceptions })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { slots } = body as { slots: { dayOfWeek: number; startTime: string; endTime: string; recurring?: boolean }[] }

  const schedule = await availabilityEngine.getOrCreateSchedule(session.user.id)

  await prisma.providerAvailabilitySlot.deleteMany({
    where: { scheduleId: schedule.id },
  })

  for (const slot of slots) {
    await availabilityEngine.addSlot(schedule.id, slot)
  }

  return NextResponse.json({ saved: slots.length })
}
