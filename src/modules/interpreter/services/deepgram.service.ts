export class DeepgramService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.DEEPGRAM_API_KEY ?? ""
  }

  async transcribeAudio(audioUrl: string, language: string = "en"): Promise<{
    text: string
    confidence: number
    duration: number
  }> {
    if (!this.apiKey) {
      return { text: "[Mock transcription]", confidence: 0.95, duration: 0 }
    }

    return { text: `[Transcribed from ${audioUrl}]`, confidence: 0.92, duration: 0 }
  }

  async createLiveTranscriptionStream() {
    return { streamId: `live-${Date.now()}` }
  }
}

export const deepgramService = new DeepgramService()
