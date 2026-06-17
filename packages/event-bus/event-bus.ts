import { type DomainEvent } from "./events"
import { subscriber } from "./subscribers"
import { traceAsync, metrics } from "@/packages/observability"

class EventBus {
  async publish(event: DomainEvent): Promise<void> {
    await traceAsync(`event:${event.type}`, () => subscriber.notify(event), {
      eventType: event.type,
      actorId: event.actorId,
    })
    metrics.record("event.published", 1, { eventType: event.type })
  }
}

export const eventBus = new EventBus()
