import { prisma } from "@/lib/prisma"

export const availabilityEngine = {
  async getOrCreateSchedule(providerId: string) {
    const existing = await prisma.providerSchedule.findUnique({
      where: { providerId },
      include: { slots: true, exceptions: true },
    })
    if (existing) return existing

    return prisma.providerSchedule.create({
      data: { providerId },
      include: { slots: true, exceptions: true },
    })
  },

  async addSlot(scheduleId: string, data: {
    dayOfWeek: number
    startTime: string
    endTime: string
    recurring?: boolean
    maxPatients?: number
  }) {
    return prisma.providerAvailabilitySlot.create({
      data: { scheduleId, ...data },
    })
  },

  async removeSlot(slotId: string) {
    return prisma.providerAvailabilitySlot.delete({ where: { id: slotId } })
  },

  async addException(scheduleId: string, data: {
    date: Date
    startTime?: string
    endTime?: string
    type?: string
    reason?: string
  }) {
    return prisma.providerAvailabilityException.create({
      data: { scheduleId, ...data },
    })
  },

  async removeException(exceptionId: string) {
    return prisma.providerAvailabilityException.delete({ where: { id: exceptionId } })
  },

  async isAvailable(providerId: string, date: Date, time: string): Promise<boolean> {
    const schedule = await prisma.providerSchedule.findUnique({
      where: { providerId },
      include: { slots: true, exceptions: true },
    })
    if (!schedule || !schedule.available) return false

    const dayOfWeek = date.getDay()
    const dateStr = date.toISOString().split("T")[0]

    const exception = schedule.exceptions.find(
      (e) =>
        e.date.toISOString().split("T")[0] === dateStr &&
        e.type === "UNAVAILABLE" &&
        (!e.startTime || time >= e.startTime) &&
        (!e.endTime || time <= e.endTime),
    )
    if (exception) return false

    const slot = schedule.slots.find(
      (s) =>
        s.dayOfWeek === dayOfWeek &&
        time >= s.startTime &&
        time <= s.endTime &&
        s.recurring,
    )
    return !!slot
  },

  async findAvailableProviders(params: {
    country: string
    city?: string
    type?: string
    date: Date
    time: string
  }): Promise<string[]> {
    const providers = await prisma.provider.findMany({
      where: {
        country: { equals: params.country, mode: "insensitive" },
        ...(params.city ? { city: { equals: params.city, mode: "insensitive" } } : {}),
        ...(params.type ? { type: params.type as any } : {}),
      },
      select: { id: true },
    })

    const available: string[] = []
    for (const p of providers) {
      const ok = await this.isAvailable(p.id, params.date, params.time)
      if (ok) available.push(p.id)
    }
    return available
  },
}
