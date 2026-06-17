"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { DEMO_TRAVELERS } from "@/lib/demo-data"

const ACTIVITY_FEED: { step: number; name: string; args: string; result: string }[] = [
  { step: 0, name: "journey.load", args: `{ "travelerId": "sarah" }`, result: `{ "status": "loaded", "severity": "MEDIUM" }` },
  { step: 1, name: "passport.load", args: `{ "travelerId": "sarah" }`, result: `{ "passport": "valid", "insurance": "Aetna Global" }` },
  { step: 2, name: "memory.load", args: `{ "travelerId": "sarah" }`, result: `{ "allergies": [], "conditions": [] }` },
  { step: 3, name: "severity.assess", args: `{ "symptoms": ["vomiting","diarrhea","stomach pain"] }`, result: `{ "severity": "MEDIUM", "score": 4.2 }` },
  { step: 4, name: "pathway.route", args: `{ "severity": "MEDIUM", "symptoms": ["vomiting"] }`, result: `{ "pathway": "PHARMACY", "confidence": 0.91 }` },
  { step: 5, name: "provider.search", args: `{ "city": "Tokyo", "specialty": "PHARMACY", "language": "English" }`, result: `{ "found": 24, "top": "Tokyo Medical Clinic (92)" }` },
  { step: 6, name: "provider.rank", args: `{ "providers": 24, "filters": { "language": "English", "openNow": true } }`, result: `{ "ranked": true, "topScore": 92 }` },
  { step: 7, name: "outreach.send", args: `{ "providerId": "tokyo-clinic-1", "channel": "whatsapp" }`, result: `{ "sent": true, "messageId": "wa_abc123" }` },
  { step: 8, name: "assignment.create", args: `{ "providerId": "tokyo-clinic-1", "travelerId": "sarah" }`, result: `{ "assigned": true, "conversationId": "conv-1" }` },
  { step: 9, name: "conversation.open", args: `{ "conversationId": "conv-1" }`, result: `{ "opened": true, "participants": ["sarah", "tokyo-clinic-1"] }` },
  { step: 10, name: "interpreter.prepare", args: `{ "language": "English", "target": "Japanese" }`, result: `{ "ready": true, "sessionId": "int_456" }` },
  { step: 11, name: "careplan.generate", args: `{ "diagnosis": "food poisoning", "pathway": "PHARMACY" }`, result: `{ "plan": "Oral rehydration + antiemetics" }` },
  { step: 12, name: "outcome.record", args: `{ "result": "RECOVERED", "recoveryHours": 6 }`, result: `{ "recorded": true, "graphUpdated": true }` },
]

const NARRATIONS: Record<number, string> = {
  0: "Loading traveler passport for Sarah Johnson...",
  1: "Reading medical history and insurance records...",
  2: "Loading previous conditions and allergies...",
  3: "Analyzing symptoms: vomiting, diarrhea, stomach pain...",
  4: "Routing to optimal care pathway based on severity...",
  5: "Searching Tokyo providers matching PHARMACY specialty...",
  6: "Ranking 24 providers by language match, availability, and outcome probability...",
  7: "Contacting Tokyo Medical Clinic via WhatsApp...",
  8: "Provider accepted! Creating assignment record...",
  9: "Opening secure conversation channel between Sarah and clinic...",
  10: "Preparing English ↔ Japanese interpreter session...",
  11: "Generating personalized care plan for food poisoning...",
  12: "Recording outcome and updating care history for future journeys...",
}

const SYSTEM_EVENTS = [
  { event: "JourneyCreated", detail: "Traveler: Sarah Johnson, Country: Japan" },
  { event: "PassportLoaded", detail: "Insurance: Aetna Global, Status: Valid" },
  { event: "SeverityAssessed", detail: "Score: 4.2, Level: MEDIUM" },
  { event: "PathwayRouted", detail: "PHARMACY (confidence: 91%)" },
  { event: "ProviderSearchInitiated", detail: "City: Tokyo, Specialty: PHARMACY" },
  { event: "ProviderRanked", detail: "Top: Tokyo Medical Clinic (score: 92)" },
  { event: "OutreachSent", detail: "Channel: WhatsApp, Provider: Tokyo Medical Clinic" },
  { event: "ProviderResponded", detail: "Status: ACCEPTED" },
  { event: "AssignmentCreated", detail: "Conversation ID: conv-1" },
  { event: "ConversationOpened", detail: "Participants: Sarah Johnson, Dr. Kenji Sato" },
  { event: "InterpreterPrepared", detail: "English ↔ Japanese, Session ID: int_456" },
  { event: "CarePlanGenerated", detail: "Oral rehydration therapy + antiemetics" },
  { event: "OutcomeRecorded", detail: "Result: RECOVERED, Recovery: 6 hours" },
]

const NETWORK_UPDATES = [
  { label: "Provider Network", before: 18401, after: 18402 },
  { label: "Care Outcomes", before: 91884, after: 91885 },
  { label: "Medication Guide Signals", before: 4223, after: 4224 },
]

const STORY_STEPS = [
  {
    id: "01",
    title: "Assessment Complete",
    body: "Symptoms and travel context were reviewed to identify the safest next step.",
  },
  {
    id: "02",
    title: "Recommended Care Options",
    body: "Nearby providers were evaluated for language support, availability, and previous care outcomes.",
  },
  {
    id: "03",
    title: "Provider Contacted",
    body: "A nearby provider accepted the request and prepared to help.",
  },
  {
    id: "04",
    title: "Communication Ready",
    body: "Translation support was prepared for the traveler and provider.",
  },
  {
    id: "05",
    title: "Care Completed",
    body: "Treatment was received and the journey was recorded for future guidance.",
  },
]

const SDK_CODE = `// Full execution trace
const journey = await swasthyatra.journey.create({
  travelerId: "sarah",
  country: "Japan",
  symptoms: ["vomiting", "diarrhea", "stomach pain"]
})

const passport = await swasthyatra.passport.load(journey.travelerId)
const memory = await swasthyatra.memory.load(journey.travelerId)

const severity = await swasthyatra.severity.assess({
  symptoms: journey.symptoms,
  travelHistory: passport.country
})

const pathway = await swasthyatra.pathway.route({
  severity: severity.score,
  symptoms: journey.symptoms
})

const providers = await swasthyatra.provider.search({
  city: "Tokyo",
  specialty: pathway.type,
  language: "English"
})

const ranked = await swasthyatra.provider.rank(providers, {
  openNow: true,
  acceptsInsurance: true
})

const outreach = await swasthyatra.outreach.send({
  providerId: ranked[0].id,
  channel: "whatsapp"
})

const assignment = await swasthyatra.assignment.create({
  providerId: ranked[0].id,
  journeyId: journey.id
})

const interpreter = await swasthyatra.interpreter.prepare({
  sourceLanguage: "English",
  targetLanguage: "Japanese"
})

const outcome = await swasthyatra.outcome.record({
  assignmentId: assignment.id,
  result: "RECOVERED",
  recoveryHours: 6
})`

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const duration = 1500
    const frame = () => {
      const elapsed = performance.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [target])
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-cyan-300">{count.toLocaleString()}</div>
      <div className="text-[10px] text-white/40">{label}</div>
    </div>
  )
}

export default function AgentWorkspace() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [showSdk, setShowSdk] = useState(false)
  const [showActivity, setShowActivity] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [narrationText, setNarrationText] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const traveler = DEMO_TRAVELERS[0]

  const startDemo = useCallback(() => {
    if (intervalRef.current) return
    setCurrentStep(0)
    setCompletedSteps(new Set())
    setNarrationText(NARRATIONS[0])
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 12) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          intervalRef.current = null
          return prev
        }
        setCompletedSteps((prevSet) => new Set(prevSet).add(prev))
        const next = prev + 1
        setNarrationText(NARRATIONS[next])
        return next
      })
    }, 800)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setCurrentStep(-1)
    setCompletedSteps(new Set())
    setNarrationText("")
    setShowActivity(false)
  }

  const allDone = currentStep > 12

  return (
    <div className="max-w-7xl mx-auto pt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Navigation Assistant</h1>
          <p className="text-sm text-white/50">Working on your behalf through each stage of the care journey</p>
        </div>
        <div className="flex gap-2">
          {!allDone && currentStep === -1 && (
            <button onClick={startDemo} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg text-sm transition">
              ▶ Start Journey Flow
            </button>
          )}
          {allDone && (
            <button onClick={reset} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition">
              ↻ Reset Demo
            </button>
          )}
          <button onClick={() => setShowSdk(!showSdk)}
            className="px-4 py-2 border border-white/20 hover:bg-white/5 text-white/70 rounded-lg text-sm transition">
            {showSdk ? "Hide SDK" : "Show SDK"}
          </button>
        </div>
      </div>

      {allDone ? (
        /* Completion Screen */
        <div className="space-y-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/[0.05] p-8 text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-green-300 mb-3">Completed</div>
            <h2 className="text-2xl font-bold text-green-300 mb-2">Journey Completed</h2>
            <p className="text-white/50">Sarah Johnson received treatment at Tokyo Medical Clinic — Recovered in 6 hours</p>
          </div>

          <button onClick={() => setShowActivity(!showActivity)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 text-sm flex items-center justify-between transition">
            <span>📡 {showActivity ? "Hide" : "Show"} System Activity</span>
            <span className="text-xs">{showActivity ? "▲" : "▼"}</span>
          </button>

          {showActivity && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Activity Log</div>
              <div className="space-y-1">
                {SYSTEM_EVENTS.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b border-white/5 last:border-0">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                    <span className="text-cyan-300 font-mono font-medium w-44 flex-shrink-0">{ev.event}</span>
                    <span className="text-white/50">→</span>
                    <span className="text-white/60">{ev.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-4 text-center">Network Learning Updates</div>
            <div className="grid grid-cols-3 gap-6">
              {NETWORK_UPDATES.map((g) => (
                <div key={g.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-sm text-white/30 line-through">{g.before.toLocaleString()}</span>
                    <span className="text-white/40">→</span>
                    <Counter target={g.after} label={g.label} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !showSdk ? (
        <>
          {/* Live Narration Bar */}
          {currentStep >= 0 && (
            <div className="mb-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] p-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              <span className="text-sm text-cyan-300 font-mono">{narrationText}</span>
            </div>
          )}

          {/* Tsenta-style narrative workflow cards */}
          <div className="mb-4 grid gap-2 md:grid-cols-5">
            {STORY_STEPS.map((step, index) => {
              const revealGate = index === 0 ? 3 : index === 1 ? 6 : index === 2 ? 8 : index === 3 ? 10 : 12
              const revealed = currentStep >= revealGate
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border p-3 transition-all duration-300 ${
                    revealed
                      ? "border-[#00E5FF]/35 bg-[#00E5FF]/[0.06]"
                      : "border-white/10 bg-white/[0.02] opacity-70"
                  }`}
                >
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-white/40 mb-1">STEP {step.id}</div>
                  <div className={`text-xs font-semibold ${revealed ? "text-[#9BEFFF]" : "text-white/80"}`}>{step.title}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/50">{step.body}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-[280px_1fr_320px] gap-4 h-[520px]">
            {/* Left Panel - Goal */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Active Goal</div>
              <div className="text-sm font-medium mb-2">Find healthcare assistance for {traveler.name}</div>
              <div className="text-xs text-white/40 mb-4">{traveler.city}, {traveler.country}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Context</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-white/40">Symptoms</span><span className="text-white/80">{traveler.symptoms[0]}{traveler.symptoms.length > 1 ? ` +${traveler.symptoms.length - 1}` : ""}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Language</span><span className="text-white/80">{traveler.language}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Insurance</span><span className="text-white/80">{traveler.insurance}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Severity</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    traveler.severity === "HIGH" ? "bg-red-500/20 text-red-300" :
                    traveler.severity === "MEDIUM" ? "bg-yellow-500/20 text-yellow-300" :
                    "bg-green-500/20 text-green-300"
                  }`}>{traveler.severity}</span>
                </div>
              </div>
            </div>

            {/* Center Panel - Execution Timeline */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 overflow-y-auto">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Execution Timeline</div>
              <div className="space-y-1">
                {traveler.timeline.map((event, i) => {
                  const isActive = currentStep === i
                  const isDone = completedSteps.has(i)
                  return (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-cyan-500/10 border border-cyan-500/30" :
                      isDone ? "bg-white/[0.02]" : "opacity-30"
                    }`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 transition-colors ${
                        isDone ? "bg-green-500 text-white" :
                        isActive ? "bg-cyan-500 text-black animate-pulse" :
                        "bg-white/10 text-white/40"
                      }`}>
                        {isDone ? "✓" : isActive ? "▶" : ""}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium ${isActive ? "text-cyan-300" : isDone ? "text-white/80" : "text-white/40"}`}>{event.action}</div>
                        {event.detail && <div className="text-[10px] text-white/30 truncate">{event.detail}</div>}
                      </div>
                      <div className="text-[10px] text-white/30 flex-shrink-0">{event.time}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Panel - Activity */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 overflow-y-auto">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Activity</div>
              <div className="space-y-2">
                {ACTIVITY_FEED.map((tool) => {
                  const isActive = currentStep === tool.step
                  const isDone = completedSteps.has(tool.step)
                  if (!isActive && !isDone) return (
                    <div key={tool.step} className="opacity-20 p-2 rounded">
                      <div className="text-xs text-white/40 font-mono">{tool.name}()</div>
                    </div>
                  )
                  return (
                    <div key={tool.step} className={`p-2 rounded-lg transition-all ${
                      isActive ? "bg-indigo-500/10 border border-indigo-500/30" : "bg-white/[0.02]"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-indigo-300 font-mono font-medium">{tool.name}</span>
                        {isDone && <span className="text-[10px] text-green-400">✓</span>}
                      </div>
                      {isActive && (
                        <div className="text-[10px] font-mono text-white/40 space-y-0.5">
                          <div className="bg-black/30 p-1.5 rounded">
                            <div className="text-white/30">args:</div>
                            <div className="text-white/60">{tool.args}</div>
                          </div>
                          <div className="bg-black/30 p-1.5 rounded">
                            <div className="text-white/30">→</div>
                            <div className="text-green-300">{tool.result}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* SDK View */
        <div className="rounded-xl border border-white/10 bg-black/40 p-6 overflow-auto max-h-[600px]">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">SDK Execution Trace</div>
          <pre className="text-xs font-mono text-white/70 leading-relaxed whitespace-pre">{SDK_CODE}</pre>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="mt-4 flex items-center justify-between text-xs text-white/30 border-t border-white/10 pt-3">
        <span>Assistant Status: {allDone ? "Journey complete and recorded" : currentStep === -1 ? "Idle - press Start Journey Flow" : "Actively coordinating care..."}</span>
        {currentStep >= 0 && !allDone && <span>Step {Math.min(currentStep + 1, 13)} of 13</span>}
      </div>
    </div>
  )
}
