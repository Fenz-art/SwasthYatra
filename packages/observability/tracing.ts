import { startTrace, startSpan, endSpan, traceAsync } from "./otel"

export const tracing = {
  async traceJourney<T>(journeyId: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`journey:${journeyId}`, fn, { journeyId })
  },

  async traceProviderSearch<T>(query: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`provider:search:${query}`, fn, { query })
  },

  async traceAgentExecution<T>(goal: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`agent:execute:${goal.substring(0, 50)}`, fn, { goal })
  },

  async traceGeminiCall<T>(model: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`ai:gemini:${model}`, fn, { model })
  },

  async traceGroqCall<T>(model: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`ai:groq:${model}`, fn, { model })
  },

  async traceQueueProcessing<T>(queue: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`queue:${queue}`, fn, { queue })
  },

  async traceDatabaseQuery<T>(query: string, fn: () => Promise<T>): Promise<T> {
    return traceAsync(`db:${query}`, fn, { query })
  },
}
