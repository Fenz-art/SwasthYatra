export interface MetricEvent {
  name: string
  value: number
  tags: Record<string, string>
  timestamp: Date
}

class MetricsCollector {
  private metrics: MetricEvent[] = []
  private maxSize = 1000

  record(name: string, value: number, tags: Record<string, string> = {}) {
    this.metrics.push({ name, value, tags, timestamp: new Date() })
    if (this.metrics.length > this.maxSize) {
      this.metrics.shift()
    }
  }

  recordJourneyCreated(country: string) {
    this.record("journey.created", 1, { country })
  }

  recordJourneyCompleted(result: string) {
    this.record("journey.completed", 1, { result })
  }

  recordProviderSearch(found: number) {
    this.record("provider.search", found)
  }

  recordAgentExecution(confidence: number, success: boolean) {
    this.record("agent.execution", confidence, { success: String(success) })
  }

  recordAiLatency(model: string, durationMs: number) {
    this.record("ai.latency", durationMs, { model })
  }

  recordQueueLatency(queue: string, durationMs: number) {
    this.record("queue.latency", durationMs, { queue })
  }

  recordDbLatency(operation: string, durationMs: number) {
    this.record("db.latency", durationMs, { operation })
  }

  recordProviderContacted(channel: string) {
    this.record("provider.contacted", 1, { channel })
  }

  flush(): MetricEvent[] {
    const snapshot = [...this.metrics]
    this.metrics = []
    return snapshot
  }

  getMetrics(): MetricEvent[] {
    return [...this.metrics]
  }
}

export const metrics = new MetricsCollector()
