export enum EventType {
  JOURNEY_CREATED = "journey.created",
  JOURNEY_CLOSED = "journey.closed",
  JOURNEY_UPDATED = "journey.updated",
  PASSPORT_CREATED = "passport.created",
  PASSPORT_SHARED = "passport.shared",
  MEMORY_APPROVED = "memory.approved",
  MEMORY_REJECTED = "memory.rejected",
  DOCUMENT_UPLOADED = "document.uploaded",
  DOCUMENT_PROCESSED = "document.processed",
  PROVIDER_ASSIGNED = "provider.assigned",
  PROVIDER_RESPONDED = "provider.responded",
  INTERPRETER_STARTED = "interpreter.started",
  INTERPRETER_COMPLETED = "interpreter.completed",
  OUTCOME_RECORDED = "outcome.recorded",
  AGENT_TASK_STARTED = "agent.task.started",
  AGENT_TASK_COMPLETED = "agent.task.completed",
  ORGANIZATION_CREATED = "organization.created",
  MEMBER_INVITED = "member.invited",
  PROVIDER_CONTACTED = "provider.contacted",
  ONBOARDING_COMPLETED = "onboarding.completed",
}

export interface BaseEvent {
  id: string
  type: EventType
  timestamp: Date
  actorId?: string
  metadata?: Record<string, unknown>
}

export interface JourneyCreatedEvent extends BaseEvent {
  type: EventType.JOURNEY_CREATED
  payload: {
    journeyId: string
    userId: string
    country: string
    severity: string
  }
}

export interface JourneyClosedEvent extends BaseEvent {
  type: EventType.JOURNEY_CLOSED
  payload: {
    journeyId: string
    userId: string
    result: string
  }
}

export interface PassportSharedEvent extends BaseEvent {
  type: EventType.PASSPORT_SHARED
  payload: {
    passportId: string
    shareId: string
    sharedBy: string
  }
}

export interface MemoryApprovedEvent extends BaseEvent {
  type: EventType.MEMORY_APPROVED
  payload: {
    candidateId: string
    memoryId: string
    approvedBy: string
  }
}

export interface DocumentUploadedEvent extends BaseEvent {
  type: EventType.DOCUMENT_UPLOADED
  payload: {
    documentId: string
    userId: string
    type: string
  }
}

export interface ProviderAssignedEvent extends BaseEvent {
  type: EventType.PROVIDER_ASSIGNED
  payload: {
    assignmentId: string
    journeyId: string
    providerId: string
  }
}

export interface ProviderRespondedEvent extends BaseEvent {
  type: EventType.PROVIDER_RESPONDED
  payload: {
    contactAttemptId: string
    providerId: string
    responded: boolean
  }
}

export interface InterpreterStartedEvent extends BaseEvent {
  type: EventType.INTERPRETER_STARTED
  payload: {
    sessionId: string
    journeyId: string
    patientLanguage: string
    providerLanguage: string
  }
}

export interface OutcomeRecordedEvent extends BaseEvent {
  type: EventType.OUTCOME_RECORDED
  payload: {
    outcomeId: string
    journeyId: string
    userId: string
    result: string
  }
}

export interface ProviderContactedEvent extends BaseEvent {
  type: EventType.PROVIDER_CONTACTED
  payload: {
    providerId: string
    userId: string
    channel: string
    messageId: string
  }
}

export interface OnboardingCompletedEvent extends BaseEvent {
  type: EventType.ONBOARDING_COMPLETED
  payload: {
    userId: string
    conditionsCount: number
    allergiesCount: number
  }
}

export type DomainEvent =
  | JourneyCreatedEvent
  | JourneyClosedEvent
  | PassportSharedEvent
  | MemoryApprovedEvent
  | DocumentUploadedEvent
  | ProviderAssignedEvent
  | ProviderRespondedEvent
  | ProviderContactedEvent
  | OnboardingCompletedEvent
  | InterpreterStartedEvent
  | OutcomeRecordedEvent
  | BaseEvent
