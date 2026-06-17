import { traceAsync } from "./otel"
import { metrics } from "./metrics"
import { tracing } from "./tracing"

export function withTracing<T>(name: string, fn: () => Promise<T>, attributes?: Record<string, unknown>): Promise<T> {
  return traceAsync(name, fn, attributes)
}

export async function withDbTrace<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  try {
    return await tracing.traceDatabaseQuery(operation, fn)
  } finally {
    metrics.recordDbLatency(operation, Date.now() - start)
  }
}

export async function withExternalApiCall<T>(apiName: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  try {
    return await traceAsync(`api:${apiName}`, fn, { api: apiName })
  } finally {
    metrics.record("api.latency", Date.now() - start, { api: apiName })
  }
}
