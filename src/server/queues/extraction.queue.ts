import { BaseQueue, QueueJob, QueueProcessor } from "./base.queue"
import { extractFromDocument } from "@/modules/vault/pipeline/extract"

class ExtractionProcessor implements QueueProcessor<{ documentId: string; userId: string }> {
  async process(job: QueueJob<{ documentId: string; userId: string }>): Promise<void> {
    await extractFromDocument(job.data.documentId, job.data.userId)
  }
}

export const extractionQueue = new BaseQueue<{ documentId: string; userId: string }>("extraction", {
  concurrency: 5,
  retryCount: 3,
})
extractionQueue.registerProcessor(new ExtractionProcessor())
