"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

interface Slot {
  id?: string
  dayOfWeek: number
  startTime: string
  endTime: string
  recurring: boolean
}

export default function ProviderAvailability() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/provider/availability")
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggleSlot = (dayOfWeek: number, time: string) => {
    const endHour = parseInt(time.split(":")[0], 10) + 1
    const endTime = `${endHour.toString().padStart(2, "0")}:00`

    setSlots((prev) => {
      const existing = prev.find(
        (s) => s.dayOfWeek === dayOfWeek && s.startTime === time,
      )
      if (existing) return prev.filter((s) => s.id !== existing.id && !(s.dayOfWeek === dayOfWeek && s.startTime === time))
      return [...prev, { dayOfWeek, startTime: time, endTime, recurring: true }]
    })
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/provider/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots }),
      })
      if (res.ok) {
        setMessage("Availability saved")
      } else {
        setMessage("Failed to save")
      }
    } catch {
      setMessage("Error saving")
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>
  }

  const isSelected = (day: number, time: string) =>
    slots.some((s) => s.dayOfWeek === day && s.startTime === time)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="text-muted-foreground">Set your weekly consultation hours. The agent will only contact you during available slots.</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {DAY_NAMES.map((name, idx) => (
            <div key={name}>
              <h3 className="text-sm font-medium mb-2">{name}</h3>
              <div className="flex flex-wrap gap-2">
                {SLOTS.map((slot) => {
                  const selected = isSelected(idx, slot)
                  return (
                    <button
                      key={`${idx}-${slot}`}
                      onClick={() => toggleSlot(idx, slot)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {message && (
          <p className="text-sm text-green-600 mt-4">{message}</p>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Availability"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
