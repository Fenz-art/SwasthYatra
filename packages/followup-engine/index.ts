import { prisma } from "@/lib/prisma"

export type FollowupTiming = "24h" | "72h" | "7d"

interface FollowupTask {
  journeyId: string
  timing: FollowupTiming
  scheduledAt: Date
  questions: string[]
}

export const followupEngine = {
  async schedule(journeyId: string) {
    const journey = await prisma.travelHealthSession.findUnique({
      where: { id: journeyId },
    })
    if (!journey) return

    const now = new Date()
    const tasks: FollowupTask[] = [
      {
        journeyId,
        timing: "24h",
        scheduledAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        questions: ["Did you receive medical treatment?", "How are you feeling now?"],
      },
      {
        journeyId,
        timing: "72h",
        scheduledAt: new Date(now.getTime() + 72 * 60 * 60 * 1000),
        questions: ["Has your condition improved?", "Did you require follow-up care?"],
      },
      {
        journeyId,
        timing: "7d",
        scheduledAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        questions: ["Have you fully recovered?", "Would you recommend the provider you visited?"],
      },
    ]

    for (const task of tasks) {
      await prisma.journeyTimelineEvent.create({
        data: {
          sessionId: journeyId,
          eventType: "FOLLOWUP_SCHEDULED",
          data: { timing: task.timing, scheduledAt: task.scheduledAt.toISOString(), questions: task.questions },
        },
      })
    }

    return tasks
  },

  async processPending() {
    const now = new Date()

    const pendingEvents = await prisma.journeyTimelineEvent.findMany({
      where: {
        eventType: "FOLLOWUP_SCHEDULED",
        data: { path: ["scheduledAt"], string_contains: "" },
      },
    })

    const due: { event: typeof pendingEvents[0]; timing: string }[] = []

    for (const event of pendingEvents) {
      const data = event.data as Record<string, unknown> | null
      if (!data?.scheduledAt) continue
      const scheduledAt = new Date(data.scheduledAt as string)
      if (scheduledAt <= now) {
        due.push({ event, timing: data.timing as string })
      }
    }

    for (const { event, timing } of due) {
      await prisma.journeyTimelineEvent.create({
        data: {
          sessionId: event.sessionId,
          eventType: "FOLLOWUP_DUE",
          data: { timing, triggeredAt: now.toISOString() },
        },
      })
    }

    return due.length
  },

  async recordResponse(journeyId: string, timing: FollowupTiming, answers: Record<string, string>) {
    await prisma.journeyTimelineEvent.create({
      data: {
        sessionId: journeyId,
        eventType: "FOLLOWUP_RESPONDED",
        data: { timing, answers, respondedAt: new Date().toISOString() },
      },
    })

    const journey = await prisma.travelHealthSession.findUnique({
      where: { id: journeyId },
    })

    if (journey && journey.status !== "RESOLVED") {
      await prisma.travelHealthSession.update({
        where: { id: journeyId },
        data: { status: "RESOLVED" },
      })
    }
  },

  async getOutcomeCollectionRate() {
    const [total, withOutcomes] = await Promise.all([
      prisma.travelHealthSession.count(),
      prisma.outcomeInsight.count(),
    ])
    return total > 0 ? (withOutcomes / total) * 100 : 0
  },
}
