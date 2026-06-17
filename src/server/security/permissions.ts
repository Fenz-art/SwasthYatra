type Role = "PATIENT" | "DOCTOR" | "PHARMACIST" | "MEDICAL_ASSISTANT" | "ORG_OPERATOR" | "ORG_ADMIN" | "SUPER_ADMIN"

type Permission =
  | "passport:view"
  | "passport:edit"
  | "passport:share"
  | "memory:create"
  | "memory:approve"
  | "memory:delete"
  | "document:upload"
  | "document:delete"
  | "provider:search"
  | "provider:review"
  | "journey:create"
  | "journey:manage"
  | "interpreter:use"
  | "outcome:record"
  | "analytics:view"
  | "org:manage"
  | "org:members"
  | "admin:system"

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  PATIENT: [
    "passport:view", "passport:edit", "passport:share",
    "memory:delete",
    "document:upload", "document:delete",
    "provider:search", "provider:review",
    "journey:create", "journey:manage",
    "interpreter:use",
    "outcome:record",
  ],
  DOCTOR: [
    "passport:view",
    "memory:create", "memory:approve",
    "provider:search",
    "interpreter:use",
    "outcome:record",
  ],
  PHARMACIST: [
    "passport:view",
    "memory:create", "memory:approve",
    "provider:search",
    "interpreter:use",
  ],
  MEDICAL_ASSISTANT: [
    "passport:view",
    "memory:create",
    "document:upload",
    "provider:search",
  ],
  ORG_OPERATOR: [
    "passport:view",
    "memory:create", "memory:approve",
    "document:upload",
    "provider:search",
    "analytics:view",
    "journey:manage",
  ],
  ORG_ADMIN: [
    "passport:view",
    "memory:create", "memory:approve",
    "document:upload",
    "provider:search",
    "analytics:view",
    "journey:manage",
    "org:manage",
    "org:members",
  ],
  SUPER_ADMIN: [
    "admin:system",
    "passport:view",
    "passport:edit",
    "passport:share",
    "memory:create",
    "memory:approve",
    "memory:delete",
    "document:upload",
    "document:delete",
    "provider:search",
    "provider:review",
    "journey:create",
    "journey:manage",
    "interpreter:use",
    "outcome:record",
    "analytics:view",
    "org:manage",
    "org:members",
  ],
}

export function assertPermission(role: string, permission: Permission) {
  const allowed = ROLE_PERMISSIONS[role as Role] || []
  if (!allowed.includes(permission)) {
    throw new Error("Insufficient permissions")
  }
}
