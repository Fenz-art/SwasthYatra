import { prisma } from "@/lib/prisma"

export class TranslationService {
  async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<{
    translatedText: string
    confidence: number
  }> {
    return {
      translatedText: `[${sourceLanguage}→${targetLanguage}] ${text}`,
      confidence: 0.9,
    }
  }

  async translateWithContext(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    interpreterSessionId: string
  ): Promise<{ translatedText: string; confidence: number }> {
    const context = await prisma.interpreterContext.findFirst({
      where: { interpreterSessionId },
    })

    const contextStr = context
      ? `[Context: allergies=${JSON.stringify(context.allergies)}, conditions=${JSON.stringify(context.conditions)}]`
      : ""

    return {
      translatedText: `${contextStr} [${sourceLanguage}→${targetLanguage}] ${text}`,
      confidence: 0.92,
    }
  }

  detectLanguage(text: string): string {
    return "en"
  }
}

export const translationService = new TranslationService()
