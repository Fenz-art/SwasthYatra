import { prisma } from "@/lib/prisma"
import { EventType, type DomainEvent } from "../events"

const eventToAuditEvent: Record<string, string> = {
  [EventType.JOURNEY_CREATED]: "JOURNEY_CREATED",
  [EventType.JOURNEY_CLOSED]: "JOURNEY_COMPLETED",
  [EventType.PASSPORT_SHARED]: "PASSPORT_SHARED",
  [EventType.MEMORY_APPROVED]: "MEMORY_APPROVED",
  [EventType.DOCUMENT_UPLOADED]: "DOCUMENT_UPLOADED",
  [EventType.PROVIDER_ASSIGNED]: "PROVIDER_ROUTED",
  [EventType.PROVIDER_RESPONDED]: "PROVIDER_CONTACTED",
  [EventType.INTERPRETER_STARTED]: "INTERPRETER_STARTED",
  [EventType.INTERPRETER_COMPLETED]: "INTERPRETER_COMPLETED",
  [EventType.OUTCOME_RECORDED]: "JOURNEY_COMPLETED",
}

export async function handleAuditEvent(event: DomainEvent): Promise<void> {
  const auditEvent = eventToAuditEvent[event.type]
  if (!auditEvent) return

  await prisma.auditLog.create({
    data: {
      event: auditEvent as any,
      actorId: event.actorId,
      resource: event.type,
      resourceId: event.id,
      metadata: (event as any).payload ?? event.metadata,
    } as any,
  })
}
