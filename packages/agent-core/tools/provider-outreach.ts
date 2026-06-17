import { prisma } from "@/lib/prisma"
import { goalManager, taskManager } from "@agent-runtime"
import { messageDeliveryService } from "@/modules/communication/services/message-delivery.service"
import { messageTemplateService } from "@/modules/communication/services/message-template.service"
import { channelRouter } from "@/modules/communication/channel-router"
import { acceptAssignment } from "@/modules/communication/services/accept-assignment"

taskManager.register("provider.search", async (task) => {
  const { country, city, specialty, language } = task.input as Record<string, string>

  const providers = await prisma.provider.findMany({
    where: {
      country: { equals: country, mode: "insensitive" },
      ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
      ...(specialty ? { specialties: { has: specialty } } : {}),
      ...(language ? { languages: { has: language } } : {}),
    },
    take: 10,
  })

  return { providers: providers.map((p) => p.id), count: providers.length }
})

taskManager.register("provider.outreach", async (task) => {
  const { providerId, journeyId, message } = task.input as Record<string, string>

  const channel = await channelRouter.route(providerId)
  const profile = await prisma.providerContactProfile.findUnique({
    where: { providerId },
  })

  const destination =
    channel === "WHATSAPP" ? profile?.whatsappNumber :
    channel === "PHONE" ? profile?.phoneNumber :
    channel === "EMAIL" ? profile?.email : null

  if (!destination) {
    return { contacted: false, reason: `No contact info for channel ${channel}` }
  }

  const delivery = await messageDeliveryService.create({
    providerId,
    channel: channel as any,
  })

  const result = await messageTemplateService.renderAndSend(
    "PROVIDER_INVITATION",
    destination,
    { name: "", language: "", issue: message, city: "", country: "" },
    delivery.id,
  )

  return { contacted: result.success, deliveryId: delivery.id, channel }
})

taskManager.register("provider.wait", async (task) => {
  const { deliveryId, maxRetries } = task.input as Record<string, string>
  const maxWait = parseInt(maxRetries ?? "3", 10)

  for (let i = 0; i < maxWait; i++) {
    const delivery = await prisma.messageDelivery.findUnique({
      where: { id: deliveryId },
    })

    if (delivery?.status === "DELIVERED" || delivery?.status === "READ") {
      return { responded: true, status: delivery.status }
    }

    await new Promise((resolve) => setTimeout(resolve, 30000))
  }

  return { responded: false, status: "TIMEOUT" }
})

taskManager.register("provider.escalate", async (task) => {
  const { assignmentId } = task.input as Record<string, string>

  const assignment = await prisma.providerAssignment.findUnique({
    where: { id: assignmentId },
  })
  if (!assignment) return { escalated: false, reason: "Assignment not found" }

  await prisma.providerAssignment.update({
    where: { id: assignmentId },
    data: { status: "ESCALATED" },
  })

  return { escalated: true }
})

taskManager.register("provider.assign", async (task) => {
  const { providerId, journeyId } = task.input as Record<string, string>

  const assignment = await prisma.providerAssignment.create({
    data: {
      journeyId,
      providerId,
      userId: "",
      priority: 1,
    },
  })

  await acceptAssignment(assignment.id)

  return { assignmentId: assignment.id }
})

export const providerOutreachTool = {
  async execute(goalId: string, params: {
    country: string
    city: string
    specialty?: string
    language?: string
    journeyId: string
    message: string
  }) {
    const goal = goalManager.create("Find and contact provider", params)

    const searchTask = goalManager.addTask(goal.id, {
      type: "provider.search",
      status: "PENDING",
      input: params as unknown as Record<string, unknown>,
      maxRetries: 1,
    })

    await taskManager.executeNext(goal.id)
    const providers = goal.tasks.find((t) => t.type === "provider.search")?.output?.providers as string[] ?? []

    for (const providerId of providers.slice(0, 3)) {
      const outreachTask = goalManager.addTask(goal.id, {
        type: "provider.outreach",
        status: "PENDING",
        input: { providerId, journeyId: params.journeyId, message: params.message },
        maxRetries: 3,
      })

      await taskManager.executeNext(goal.id)

      const deliveryId = goal.tasks.find((t) => t.id === outreachTask.id)?.output?.deliveryId as string

      if (deliveryId) {
        const waitTask = goalManager.addTask(goal.id, {
          type: "provider.wait",
          status: "PENDING",
          input: { deliveryId, maxRetries: "5" },
          maxRetries: 1,
        })

        await taskManager.executeNext(goal.id)

        const responded = goal.tasks.find((t) => t.id === waitTask.id)?.output?.responded as boolean
        if (responded) {
          const assignTask = goalManager.addTask(goal.id, {
            type: "provider.assign",
            status: "PENDING",
            input: { providerId, journeyId: params.journeyId },
            maxRetries: 1,
          })

          await taskManager.executeNext(goal.id)
          return { goalId: goal.id, status: "ASSIGNED", providerId }
        }
      }
    }

    goalManager.setStatus(goal.id, "FAILED", "No providers responded")
    return { goalId: goal.id, status: "FAILED" }
  },
}
