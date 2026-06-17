export interface Span {
  name: string
  traceId: string
  spanId: string
  parentSpanId?: string
  startTime: Date
  endTime?: Date
  attributes: Record<string, unknown>
  status?: "OK" | "ERROR"
}

export interface TraceContext {
  traceId: string
  spanId: string
}

let currentTraceId = ""
let currentSpanId = ""

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function startTrace(name: string): TraceContext {
  currentTraceId = generateId()
  currentSpanId = generateId()

  if (typeof performance !== "undefined") {
    performance.mark(`trace-${currentTraceId}-start`)
  }

  return { traceId: currentTraceId, spanId: currentSpanId }
}

export function startSpan(name: string, parentContext?: TraceContext): TraceContext {
  const spanId = generateId()
  const traceId = parentContext?.traceId ?? currentTraceId

  return { traceId, spanId }
}

export function endSpan(context: TraceContext, status: "OK" | "ERROR" = "OK") {
  if (typeof performance !== "undefined") {
    performance.mark(`trace-${context.traceId}-end`)
    performance.measure(`trace-${context.traceId}`, `trace-${context.traceId}-start`, `trace-${context.traceId}-end`)
  }
}

export async function traceAsync<T>(
  name: string,
  fn: () => Promise<T>,
  attributes?: Record<string, unknown>
): Promise<T> {
  const context = startSpan(name)
  const startTime = Date.now()

  try {
    const result = await fn()
    endSpan(context, "OK")
    return result
  } catch (error) {
    endSpan(context, "ERROR")
    throw error
  }
}
