import { BaseQueue, QueueJob, QueueProcessor } from "./base.queue"
import { computeOutcomeAggregations } from "@/packages/healthcare-graph/outcomes/aggregation"

class OutcomeProcessor implements QueueProcessor<{ trigger: string }> {
  async process(job: QueueJob<{ trigger: string }>): Promise<void> {
    await computeOutcomeAggregations()
  }
}

export const outcomeQueue = new BaseQueue<{ trigger: string }>("outcome", { concurrency: 2, retryCount: 2 })
outcomeQueue.registerProcessor(new OutcomeProcessor())
