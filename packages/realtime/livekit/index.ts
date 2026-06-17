const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET
const LIVEKIT_HOST = process.env.LIVEKIT_HOST

export const livekitService = {
  isConfigured(): boolean {
    return !!(LIVEKIT_API_KEY && LIVEKIT_API_SECRET && LIVEKIT_HOST)
  },

  async createRoom(name: string) {
    if (!this.isConfigured()) {
      return { roomName: name, warning: "LiveKit not configured" }
    }

    const response = await fetch(`${LIVEKIT_HOST}/twirp/livekit.RoomService/CreateRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LIVEKIT_API_KEY}`,
      },
      body: JSON.stringify({ name }),
    })

    return response.json()
  },

  async generateToken(roomName: string, identity: string) {
    if (!this.isConfigured()) {
      return { token: null, warning: "LiveKit not configured" }
    }

    const response = await fetch(`${LIVEKIT_HOST}/twirp/livekit.RoomService/CreateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LIVEKIT_API_KEY}`,
      },
      body: JSON.stringify({
        room: roomName,
        identity,
        video: true,
        audio: true,
      }),
    })

    return response.json()
  },
}
