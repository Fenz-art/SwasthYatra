import { subscriber } from "../subscribers"
import { EventType } from "../events"
import { handleAuditEvent } from "./audit.handler"

export function registerDefaultHandlers() {
  const events = Object.values(EventType)
  for (const eventType of events) {
    subscriber.on(eventType, handleAuditEvent)
  }
}
