import { escalationEngine } from "@agent-runtime"
import { prisma } from "@/lib/prisma"

let initialized = false

export function initEscalationHandlers() {
  if (initialized) return
  initialized = true

  escalationEngine.register({
    canHandle(goal) {
      return goal.tasks.some(
        (t) => t.status === "FAILED" && t.error,
      )
    },
    async handle(goal) {
      const failedTasks = goal.tasks.filter((t) => t.status === "FAILED" && t.error)
      const lastTask = failedTasks[failedTasks.length - 1]

      const journeyId = (goal.context.journeyId as string) ?? goal.id
      const providerId = goal.context.providerId as string | undefined

      const reason = lastTask?.error?.includes("No providers")
        ? "NO_PROVIDER_AVAILABLE"
        : lastTask?.error?.includes("communication") || lastTask?.error?.includes("contact")
          ? "FAILED_COMMUNICATION"
          : "AGENT_FAILURE"

      await prisma.escalationCase.create({
        data: {
          journeyId,
          providerId,
          severity: "MEDIUM",
          reason: reason as any,
        },
      })
    },
  })
}
