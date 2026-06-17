import { goalManager, type Goal } from "./goal-manager"

export interface EscalationHandler {
  canHandle(goal: Goal): boolean
  handle(goal: Goal): Promise<void>
}

class EscalationEngine {
  private handlers: EscalationHandler[] = []

  register(handler: EscalationHandler) {
    this.handlers.push(handler)
  }

  async tryEscalate(goalId: string): Promise<boolean> {
    const goal = goalManager.get(goalId)
    if (!goal) return false

    const handler = this.handlers.find((h) => h.canHandle(goal))
    if (!handler) return false

    try {
      await handler.handle(goal)
      goalManager.setStatus(goalId, "ESCALATED")
      return true
    } catch {
      return false
    }
  }
}

export const escalationEngine = new EscalationEngine()
