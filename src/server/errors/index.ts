export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public httpStatus: number = 400,
    public metadata?: Record<string, unknown>
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class AuthError extends AppError {
  constructor(msg = "Authentication required") {
    super("AUTH_REQUIRED", msg, 401)
  }
}

export class PermissionError extends AppError {
  constructor(msg = "Insufficient permissions") {
    super("PERMISSION_DENIED", msg, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super("NOT_FOUND", `${resource} not found`, 404)
  }
}

export class OwnershipError extends AppError {
  constructor(resource = "Resource") {
    super("OWNERSHIP_VIOLATION", `${resource} access denied`, 403)
  }
}

export class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super("VALIDATION_ERROR", "Validation failed", 400, { errors })
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super("RATE_LIMITED", "Too many requests", 429)
  }
}
