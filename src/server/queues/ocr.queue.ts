import { BaseQueue, QueueJob, QueueProcessor } from "./base.queue"
import { processOcr } from "@/modules/vault/pipeline/ocr"

class OcrProcessor implements QueueProcessor<{ documentId: string }> {
  async process(job: QueueJob<{ documentId: string }>): Promise<void> {
    await processOcr(job.data.documentId)
  }
}

export const ocrQueue = new BaseQueue<{ documentId: string }>("ocr", { concurrency: 5, retryCount: 3 })
ocrQueue.registerProcessor(new OcrProcessor())
