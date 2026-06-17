export class ElevenLabsService {
  private apiKey: string
  private voiceId: string

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY ?? ""
    this.voiceId = process.env.ELEVENLABS_VOICE_ID ?? "21m00Tcm4TlvDq8ikWAM"
  }

  async synthesizeSpeech(text: string, language: string = "en"): Promise<{
    audioUrl: string
    durationMs: number
  }> {
    if (!this.apiKey) {
      return { audioUrl: "", durationMs: Math.round(text.length * 60) }
    }

    return { audioUrl: `[Audio: ${text.slice(0, 20)}]`, durationMs: Math.round(text.length * 60) }
  }
}

export const elevenLabsService = new ElevenLabsService()
