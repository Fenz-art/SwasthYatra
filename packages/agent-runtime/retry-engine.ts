import type { Task } from "./goal-manager"

interface RetryConfig {
  maxRetries: number
  baseDelayMs: number
  backoffFactor: number
}

const DEFAULT_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelayMs: 5000,
  backoffFactor: 2,
}

class RetryEngine {
  private config = DEFAULT_CONFIG

  configure(cfg: Partial<RetryConfig>) {
    this.config = { ...this.config, ...cfg }
  }

  async shouldRetry(task: Task): Promise<boolean> {
    return task.retries < this.config.maxRetries
  }

  async wait(retryCount: number): Promise<void> {
    const delay = this.config.baseDelayMs * Math.pow(this.config.backoffFactor, retryCount)
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}

export const retryEngine = new RetryEngine()
