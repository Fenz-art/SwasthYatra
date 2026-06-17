type WsMessageHandler = (data: Record<string, unknown>) => void

class WebSocketService {
  private connections = new Map<string, WebSocket>()
  private handlers = new Map<string, WsMessageHandler[]>()

  register(userId: string, ws: WebSocket) {
    this.connections.set(userId, ws)
    ws.addEventListener("close", () => this.connections.delete(userId))
  }

  unregister(userId: string) {
    this.connections.delete(userId)
  }

  on(event: string, handler: WsMessageHandler) {
    const existing = this.handlers.get(event) ?? []
    existing.push(handler)
    this.handlers.set(event, existing)
  }

  send(userId: string, event: string, payload: unknown) {
    const ws = this.connections.get(userId)
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event, payload }))
    }
  }

  broadcast(event: string, payload: unknown, excludeUserId?: string) {
    for (const [userId, ws] of this.connections) {
      if (userId !== excludeUserId && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event, payload }))
      }
    }
  }

  handleMessage(userId: string, raw: string) {
    try {
      const { event, payload } = JSON.parse(raw)
      const handlers = this.handlers.get(event) ?? []
      handlers.forEach((h) => h(payload))
    } catch {
      // ignore malformed messages
    }
  }
}

export const wsService = new WebSocketService()
