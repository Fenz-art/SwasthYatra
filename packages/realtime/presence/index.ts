type PresenceStatus = "ONLINE" | "AWAY" | "BUSY" | "OFFLINE"

interface PresenceEntry {
  userId: string
  status: PresenceStatus
  lastSeen: Date
  currentRoom?: string
  metadata?: Record<string, string>
}

class PresenceTracker {
  private presence = new Map<string, PresenceEntry>()

  set(userId: string, status: PresenceStatus, room?: string) {
    this.presence.set(userId, {
      userId,
      status,
      lastSeen: new Date(),
      currentRoom: room,
    })
  }

  get(userId: string): PresenceEntry | undefined {
    return this.presence.get(userId)
  }

  getByRoom(room: string): PresenceEntry[] {
    return Array.from(this.presence.values()).filter(
      (e) => e.currentRoom === room,
    )
  }

  setOnline(userId: string, room?: string) {
    this.set(userId, "ONLINE", room)
  }

  setAway(userId: string) {
    this.set(userId, "AWAY")
  }

  setBusy(userId: string) {
    this.set(userId, "BUSY")
  }

  setOffline(userId: string) {
    this.set(userId, "OFFLINE")
  }

  isOnline(userId: string): boolean {
    const entry = this.presence.get(userId)
    if (!entry) return false
    return entry.status === "ONLINE" || entry.status === "BUSY"
  }
}

export const presenceTracker = new PresenceTracker()
