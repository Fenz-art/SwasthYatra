"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { showToast } from "@/components/ui/toast"

export default function InterpreterPage() {
  const [sessionId, setSessionId] = useState("")
  const [patientLang, setPatientLang] = useState("en")
  const [providerLang, setProviderLang] = useState("ja")
  const [interpreterSessionId, setInterpreterSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    if (!sessionId) return
    setLoading(true)
    try {
      const { startInterpreterSession } = await import("@/modules/interpreter/actions")
      const session = await startInterpreterSession({
        sessionId,
        patientLanguage: patientLang,
        providerLanguage: providerLang,
      })
      setInterpreterSessionId(session.id)
      showToast("Interpreter session started", "success")
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setLoading(false)
  }

  const handleSend = async () => {
    if (!inputText || !interpreterSessionId) return
    setLoading(true)
    try {
      const { processPatientAudio } = await import("@/modules/interpreter/actions")
      const msg = await processPatientAudio({
        interpreterSessionId,
        text: inputText,
      })
      setMessages(prev => [...prev, msg])
      setInputText("")
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setLoading(false)
  }

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "ja", label: "Japanese" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "hi", label: "Hindi" },
    { value: "th", label: "Thai" },
    { value: "zh", label: "Chinese" },
    { value: "ar", label: "Arabic" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medical Interpreter</h1>
        <p className="text-muted-foreground">Real-time healthcare translation with medical context</p>
      </div>

      {!interpreterSessionId ? (
        <Card>
          <CardHeader><CardTitle>Start Interpreter Session</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Journey Session ID</label>
                <Input value={sessionId} onChange={e => setSessionId(e.target.value)} placeholder="Session ID from journey" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Patient Language</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={patientLang} onChange={e => setPatientLang(e.target.value)}>
                  {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Provider Language</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={providerLang} onChange={e => setProviderLang(e.target.value)}>
                  {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </div>
            <Button onClick={handleStart} disabled={loading || !sessionId}>
              {loading ? <Spinner size="sm" /> : "Start Session"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Active Session
                <Badge variant="secondary">{patientLang.toUpperCase()} → {providerLang.toUpperCase()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.speaker === "PATIENT" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${msg.speaker === "PATIENT" ? "bg-primary/10" : "bg-muted"}`}>
                      <p className="text-xs text-muted-foreground mb-1">{msg.speaker}</p>
                      <p className="text-sm">{msg.originalText}</p>
                      {msg.translatedText && (
                        <p className="text-sm text-muted-foreground mt-1 italic">{msg.translatedText}</p>
                      )}
                      {msg.sttConfidence && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Confidence: {Math.round(msg.sttConfidence * 100)}%
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type or speak your message..."
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} disabled={loading || !inputText}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Medical Context</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="font-medium text-xs text-muted-foreground mb-1">Injected Context</p>
                <p className="text-xs text-muted-foreground">Symptoms, allergies, and medications are being used to enhance translation accuracy.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={async () => {
                  const { endInterpreterSession } = await import("@/modules/interpreter/actions")
                  await endInterpreterSession(interpreterSessionId!)
                  setInterpreterSessionId(null)
                  setMessages([])
                  showToast("Session ended", "info")
                }}
              >
                End Session
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
