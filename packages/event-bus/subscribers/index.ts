import { type DomainEvent } from "../events"

export type EventHandler = (event: DomainEvent) => Promise<void>

export class EventSubscriber {
  private handlers: Map<string, EventHandler[]> = new Map()

  on(eventType: string, handler: EventHandler) {
    const handlers = this.handlers.get(eventType) ?? []
    handlers.push(handler)
    this.handlers.set(eventType, handlers)
  }

  off(eventType: string, handler: EventHandler) {
    const handlers = this.handlers.get(eventType) ?? []
    this.handlers.set(
      eventType,
      handlers.filter((h) => h !== handler)
    )
  }

  async notify(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.type) ?? []
    await Promise.allSettled(handlers.map((h) => h(event)))
  }
}

export const subscriber = new EventSubscriber()
