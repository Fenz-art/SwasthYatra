export interface Observation {
  event: string
  data: Record<string, unknown>
  timestamp: Date
}

class Observer {
  private observations: Observation[] = []
  private listeners = new Map<string, Array<(obs: Observation) => void>>()

  record(event: string, data: Record<string, unknown>) {
    const obs: Observation = { event, data, timestamp: new Date() }
    this.observations.push(obs)
    const listeners = this.listeners.get(event) ?? []
    listeners.forEach((l) => l(obs))
  }

  on(event: string, listener: (obs: Observation) => void) {
    const existing = this.listeners.get(event) ?? []
    existing.push(listener)
    this.listeners.set(event, existing)
  }

  getByGoal(goalId: string): Observation[] {
    return this.observations.filter((o) => o.data.goalId === goalId)
  }

  getByEvent(event: string): Observation[] {
    return this.observations.filter((o) => o.event === event)
  }

  recent(count = 10): Observation[] {
    return this.observations.slice(-count)
  }
}

export const observer = new Observer()
