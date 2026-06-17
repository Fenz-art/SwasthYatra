import { BaseQueue, QueueJob, QueueProcessor } from "./base.queue"
import { translateDocument } from "@/modules/vault/pipeline/translate"

class TranslationProcessor implements QueueProcessor<{ documentId: string; targetLanguage: string }> {
  async process(job: QueueJob<{ documentId: string; targetLanguage: string }>): Promise<void> {
    await translateDocument(job.data.documentId, job.data.targetLanguage)
  }
}

export const translationQueue = new BaseQueue<{ documentId: string; targetLanguage: string }>("translation", {
  concurrency: 5,
  retryCount: 3,
})
translationQueue.registerProcessor(new TranslationProcessor())
