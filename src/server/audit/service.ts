import { prisma } from "@/lib/prisma"

type AuditEventType =
  | "PASSPORT_CREATED" | "PASSPORT_UPDATED" | "PASSPORT_SHARED" | "PASSPORT_VIEWED" | "PASSPORT_EXPORTED" | "PASSPORT_REVOKED"
  | "MEMORY_CANDIDATE_CREATED" | "MEMORY_APPROVED" | "MEMORY_REJECTED" | "MEMORY_MERGED" | "MEMORY_DELETED"
  | "DOCUMENT_UPLOADED" | "DOCUMENT_VIEWED" | "DOCUMENT_DELETED" | "DOCUMENT_PROCESSED" | "DOCUMENT_EXTRACTED"
  | "JOURNEY_CREATED" | "JOURNEY_UPDATED" | "JOURNEY_COMPLETED" | "JOURNEY_CANCELLED"
  | "PROVIDER_SEARCHED" | "PROVIDER_VIEWED" | "PROVIDER_CONTACTED" | "PROVIDER_REVIEWED"
  | "INTERPRETER_STARTED" | "INTERPRETER_COMPLETED"
  | "ORG_CREATED" | "ORG_MEMBER_ADDED" | "ORG_MEMBER_REMOVED" | "ORG_INVITATION_SENT" | "ORG_INVITATION_ACCEPTED" | "ORG_ROLE_CHANGED"
  | "AGENT_TASK_STARTED" | "AGENT_TASK_COMPLETED" | "AGENT_TOOL_EXECUTED"
  | "AGENT_APPROVAL_REQUESTED" | "AGENT_APPROVAL_GRANTED" | "AGENT_APPROVAL_DENIED"
  | "ADMIN_ACTION" | "OWNERSHIP_VIOLATION" | "UNAUTHORIZED_ACCESS" | "SETTINGS_CHANGED" | "SEVERITY_ASSESSED" | "PROVIDER_ROUTED"

export const auditService = {
  async log(params: {
    event: AuditEventType
    actorId?: string
    actorEmail?: string
    actorRole?: string
    resource: string
    resourceId?: string
    targetId?: string
    metadata?: Record<string, unknown>
    severity?: string
    ipAddress?: string
    organizationId?: string
  }) {
    await prisma.auditLog.create({ data: params as any })
  },

  async documentUploaded(actorId: string, documentId: string) {
    await this.log({
      event: "DOCUMENT_UPLOADED",
      actorId,
      resource: "VaultDocument",
      resourceId: documentId,
    })
  },

  async documentDeleted(actorId: string, documentId: string) {
    await this.log({
      event: "DOCUMENT_DELETED",
      actorId,
      resource: "VaultDocument",
      resourceId: documentId,
    })
  },

  async documentProcessed(actorId: string, documentId: string) {
    await this.log({
      event: "DOCUMENT_PROCESSED",
      actorId,
      resource: "VaultDocument",
      resourceId: documentId,
    })
  },

  async passportCreated(actorId: string, passportId: string) {
    await this.log({
      event: "PASSPORT_CREATED",
      actorId,
      resource: "HealthPassport",
      resourceId: passportId,
    })
  },

  async passportUpdated(actorId: string, passportId: string, changes?: unknown) {
    await this.log({
      event: "PASSPORT_UPDATED",
      actorId,
      resource: "HealthPassport",
      resourceId: passportId,
      metadata: { changes } as any,
    })
  },

  async passportShared(actorId: string, passportId: string, shareId: string) {
    await this.log({
      event: "PASSPORT_SHARED",
      actorId,
      resource: "HealthPassport",
      resourceId: passportId,
      metadata: { shareId } as any,
    })
  },

  async journeyCreated(actorId: string, journeyId: string) {
    await this.log({
      event: "JOURNEY_CREATED",
      actorId,
      resource: "TravelHealthSession",
      resourceId: journeyId,
    })
  },

  async journeyCompleted(actorId: string, journeyId: string, result?: string) {
    await this.log({
      event: "JOURNEY_COMPLETED",
      actorId,
      resource: "TravelHealthSession",
      resourceId: journeyId,
      metadata: { result } as any,
    })
  },

  async memoryApproved(actorId: string, memoryId: string) {
    await this.log({
      event: "MEMORY_APPROVED",
      actorId,
      resource: "MedicalMemory",
      resourceId: memoryId,
    })
  },

  async memoryRejected(actorId: string, memoryId: string) {
    await this.log({
      event: "MEMORY_REJECTED",
      actorId,
      resource: "MedicalMemoryCandidate",
      resourceId: memoryId,
    })
  },

  async interpreterStarted(actorId: string, sessionId: string) {
    await this.log({
      event: "INTERPRETER_STARTED",
      actorId,
      resource: "InterpreterSession",
      resourceId: sessionId,
    })
  },

  async interpreterCompleted(actorId: string, sessionId: string) {
    await this.log({
      event: "INTERPRETER_COMPLETED",
      actorId,
      resource: "InterpreterSession",
      resourceId: sessionId,
    })
  },

  async memberInvited(actorId: string, organizationId: string, email: string) {
    await this.log({
      event: "ORG_INVITATION_SENT",
      actorId,
      resource: "Organization",
      resourceId: organizationId,
      metadata: { email } as any,
    })
  },

  async memberRemoved(actorId: string, organizationId: string, removedUserId: string) {
    await this.log({
      event: "ORG_MEMBER_REMOVED",
      actorId,
      resource: "Organization",
      resourceId: organizationId,
      metadata: { removedUserId } as any,
    })
  },

  async agentExecuted(actorId: string, taskId: string, goal: string) {
    await this.log({
      event: "AGENT_TASK_STARTED",
      actorId,
      resource: "AgentTask",
      resourceId: taskId,
      metadata: { goal } as any,
    })
  },
}

export const audit = auditService
