import { EventType, type DomainEvent, type BaseEvent } from "../events"
import { eventBus } from "../event-bus"

function createBaseEvent(type: EventType, actorId?: string, metadata?: Record<string, unknown>): BaseEvent {
  return {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date(),
    actorId,
    metadata,
  }
}

export const publishers = {
  journeyCreated(payload: { journeyId: string; userId: string; country: string; severity: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.JOURNEY_CREATED, payload.userId),
      type: EventType.JOURNEY_CREATED,
      payload,
    }
    eventBus.publish(event)
  },

  journeyClosed(payload: { journeyId: string; userId: string; result: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.JOURNEY_CLOSED, payload.userId),
      type: EventType.JOURNEY_CLOSED,
      payload,
    }
    eventBus.publish(event)
  },

  passportShared(payload: { passportId: string; shareId: string; sharedBy: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.PASSPORT_SHARED, payload.sharedBy),
      type: EventType.PASSPORT_SHARED,
      payload,
    }
    eventBus.publish(event)
  },

  memoryApproved(payload: { candidateId: string; memoryId: string; approvedBy: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.MEMORY_APPROVED, payload.approvedBy),
      type: EventType.MEMORY_APPROVED,
      payload,
    }
    eventBus.publish(event)
  },

  documentUploaded(payload: { documentId: string; userId: string; type: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.DOCUMENT_UPLOADED, payload.userId),
      type: EventType.DOCUMENT_UPLOADED,
      payload,
    }
    eventBus.publish(event)
  },

  providerAssigned(payload: { assignmentId: string; journeyId: string; providerId: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.PROVIDER_ASSIGNED),
      type: EventType.PROVIDER_ASSIGNED,
      payload,
    }
    eventBus.publish(event)
  },

  providerResponded(payload: { contactAttemptId: string; providerId: string; responded: boolean }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.PROVIDER_RESPONDED),
      type: EventType.PROVIDER_RESPONDED,
      payload,
    }
    eventBus.publish(event)
  },

  interpreterStarted(payload: { sessionId: string; journeyId: string; patientLanguage: string; providerLanguage: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.INTERPRETER_STARTED),
      type: EventType.INTERPRETER_STARTED,
      payload,
    }
    eventBus.publish(event)
  },

  outcomeRecorded(payload: { outcomeId: string; journeyId: string; userId: string; result: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.OUTCOME_RECORDED, payload.userId),
      type: EventType.OUTCOME_RECORDED,
      payload,
    }
    eventBus.publish(event)
  },

  providerContacted(payload: { providerId: string; userId: string; channel: string; messageId: string }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.PROVIDER_CONTACTED, payload.userId),
      type: EventType.PROVIDER_CONTACTED,
      payload,
    }
    eventBus.publish(event)
  },

  onboardingCompleted(payload: { userId: string; conditionsCount: number; allergiesCount: number }) {
    const event: DomainEvent = {
      ...createBaseEvent(EventType.ONBOARDING_COMPLETED, payload.userId),
      type: EventType.ONBOARDING_COMPLETED,
      payload,
    }
    eventBus.publish(event)
  },
}
