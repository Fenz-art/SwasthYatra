export interface QueueJob<T = unknown> {
  id: string
  type: string
  data: T
  attempts: number
  maxAttempts: number
  createdAt: Date
}

export interface QueueProcessor<T = unknown> {
  process(job: QueueJob<T>): Promise<void>
}

export class BaseQueue<T = unknown> {
  private processors: QueueProcessor<T>[] = []
  private concurrency: number
  private retryCount: number

  constructor(name: string, options?: { concurrency?: number; retryCount?: number }) {
    this.concurrency = options?.concurrency ?? parseInt(process.env.QUEUE_CONCURRENCY ?? "10")
    this.retryCount = options?.retryCount ?? parseInt(process.env.QUEUE_RETRY_COUNT ?? "3")
  }

  registerProcessor(processor: QueueProcessor<T>) {
    this.processors.push(processor)
  }

  async add(job: Omit<QueueJob<T>, "id" | "createdAt" | "attempts">): Promise<QueueJob<T>> {
    const queueJob: QueueJob<T> = {
      id: `job-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: job.type,
      data: job.data,
      attempts: 0,
      maxAttempts: job.maxAttempts ?? this.retryCount,
      createdAt: new Date(),
    }

    return queueJob
  }

  async processJob(job: QueueJob<T>): Promise<void> {
    for (const processor of this.processors) {
      await processor.process(job)
    }
  }
}
