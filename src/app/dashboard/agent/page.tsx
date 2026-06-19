"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { showToast } from "@/components/ui/toast"
import {
  createAgentTask,
  executeAgentTask,
  getAgentTaskStatus,
  getAgentTaskHistory,
} from "@/modules/agent/actions"
import {
  Sparkles,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
  MapPin,
  Stethoscope,
  MessageSquare,
  Phone,
  Shield,
  User,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react"

// Maps technical node names to customer-facing human copy
const nodeTypeLabels: Record<string, string> = {
  INTAKE: "Reviewing symptom details and medical background",
  SEVERITY: "Assessing clinical urgency and triage priority",
  ROUTER: "Determining optimal provider network routing",
  MEDICATION_LOOKUP: "Comparing medication equivalents and availability",
  PROVIDER_SEARCH: "Searching localized provider network directories",
  INTERPRETER: "Preparing translation context and language guides",
  OUTCOME_CAPTURE: "Recording care outcomes for future guidance",
  REFLECTION: "Verifying accuracy of recommended care plans",
  HUMAN_APPROVAL: "Awaiting operator authorization review",
}

const contextCards = [
  { icon: MapPin, label: "Tokyo, Japan", sub: "Current location" },
  { icon: Stethoscope, label: "Dr. Tanaka", sub: "General Medicine" },
  { icon: Clock, label: "Today 3:00 PM", sub: "Appointment" },
  { icon: MessageSquare, label: "EN → JA", sub: "Interpreter ready" },
]

export default function AgentWorkspace() {
  const [goal, setGoal] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  const pollingInterval = useRef<NodeJS.Timeout | null>(null)
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadHistory()
    return () => stopPolling()
  }, [])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [task])

  const loadHistory = async () => {
    try {
      const data = await getAgentTaskHistory()
      setHistory(data)
    } catch (err) {
      console.error(err)
    }
  }

  const startPolling = (taskId: string) => {
    stopPolling()
    pollingInterval.current = setInterval(async () => {
      try {
        const updatedTask = await getAgentTaskStatus(taskId)
        if (updatedTask) {
          setTask(updatedTask)
          if (
            updatedTask.status === "COMPLETED" ||
            updatedTask.status === "FAILED" ||
            updatedTask.status === "CANCELLED"
          ) {
            stopPolling()
            setLoading(false)
            loadHistory()
          }
        }
      } catch (err) {
        console.error("Error polling task status", err)
      }
    }, 800)
  }

  const stopPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
      pollingInterval.current = null
    }
  }

  const handleExecute = async () => {
    if (!goal) return
    setLoading(true)
    setTask(null)
    setActiveTaskId(null)

    try {
      const initialTask = await createAgentTask(goal, sessionId || undefined)
      setActiveTaskId(initialTask.id)
      setTask(initialTask)
      startPolling(initialTask.id)
      executeAgentTask(initialTask.id).catch((err) => {
        showToast((err as Error).message, "error")
        stopPolling()
        setLoading(false)
      })
    } catch (err) {
      showToast((err as Error).message, "error")
      setLoading(false)
    }
  }

  const handleSelectHistoryTask = (historicalTask: any) => {
    stopPolling()
    setTask(historicalTask)
    setActiveTaskId(historicalTask.id)
    setGoal(historicalTask.goal)
    setSessionId(historicalTask.sessionId || "")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="h-4 w-4 text-accent-green shrink-0" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-accent-red shrink-0" />
      case "RUNNING":
        return <Loader2 className="h-4 w-4 text-accent-cyan animate-spin shrink-0" />
      default:
        return (
          <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 mx-1 inline-block" />
        )
    }
  }

  const isStreaming = loading || (task && task.status === "RUNNING")

  return (
    <div className="space-y-0 -m-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-cyan" />
            <h1 className="text-sm font-semibold text-white/95">Navigation Assistant</h1>
          </div>
          {isStreaming && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-cyan-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-[11px] text-accent-cyan">Working</span>
            </span>
          )}
        </div>
        <p className="text-xs text-white/40">
          Coordinates care on your behalf. No prompts needed.
        </p>
      </div>

      {/* Context Bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.08] bg-white/[0.01] overflow-x-auto">
        {contextCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0D1015] border border-white/[0.06] flex-shrink-0"
          >
            <card.icon className="h-3.5 w-3.5 text-white/40" />
            <div>
              <p className="text-[12px] font-medium text-white/85">{card.label}</p>
              <p className="text-[10px] text-white/40">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main workspace */}
      <div className="flex min-h-[calc(100vh-200px)]">
        {/* Left: Activity Log */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Activity area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {/* Input at top */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                Define Your Situation
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                  placeholder="e.g., I have stomach pain and need a pharmacist in Tokyo"
                  className="flex-1 px-4 py-2.5 rounded-md bg-[#07080A] border border-white/[0.08] text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#00E5FF]/40 transition-colors"
                />
                <button
                  onClick={handleExecute}
                  disabled={loading || !goal}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed px-5"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Start</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
              {/* Session ID field */}
              <div className="mt-3 flex items-center gap-2 text-[11px] bg-white/[0.01] border border-white/[0.04] p-2.5 rounded-md">
                <span className="text-white/35 font-medium shrink-0">Journey ID (optional):</span>
                <input
                  type="text"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  placeholder="Paste travel session ID"
                  className="bg-transparent border-none outline-none text-white/75 placeholder:text-white/20 w-full font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Execution steps */}
            {task && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Steps header */}
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                      Live Activity
                    </p>
                    <Badge
                      className={
                        task.status === "COMPLETED"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20 text-[10px]"
                          : task.status === "FAILED"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20 text-[10px]"
                          : "bg-white/[0.06] text-white/55 text-[10px]"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>

                  {task.nodeExecutions && task.nodeExecutions.length > 0 ? (
                    <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] overflow-hidden">
                      {task.nodeExecutions.map((exec: any, i: number) => (
                        <motion.div
                          key={exec.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04] last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(exec.status)}
                            <span className="text-[13px] text-white/75">
                              {nodeTypeLabels[exec.nodeType] ||
                                exec.nodeType.replace(/_/g, " ")}
                            </span>
                          </div>
                          {exec.durationMs && (
                            <span className="text-[10px] text-white/30 font-mono">
                              {exec.durationMs}ms
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] py-8 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"
                          style={{ animationDelay: "200ms" }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"
                          style={{ animationDelay: "400ms" }}
                        />
                      </div>
                      <p className="text-[13px] text-white/40">
                        Preparing coordination activities...
                      </p>
                    </div>
                  )}

                  {/* Care Plan */}
                  {task.reflection && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-5"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                        Care Navigation Plan
                      </p>
                      <p className="text-[13px] text-white/80 leading-relaxed whitespace-pre-line">
                        {task.reflection}
                      </p>
                      {task.confidence !== undefined && (
                        <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-white/40">Confidence Score</span>
                            <span className="text-accent-cyan font-semibold">
                              {Math.round(task.confidence * 100)}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                            <div
                              className="h-full bg-accent-cyan rounded-full transition-all duration-500"
                              style={{ width: `${Math.round(task.confidence * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Operator Approval */}
                  {task.needsApproval && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-accent-amber/20 bg-accent-amber-soft/20 p-5"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-amber mb-2">
                        Operator Review Required
                      </p>
                      <p className="text-[13px] text-amber-200/75 mb-4">
                        This plan involves specialized medication matching and requires clinician
                        or network operator confirmation before dispatching.
                      </p>
                      <div className="flex gap-2">
                        <button className="btn-primary bg-accent-amber text-[#07080A] hover:bg-accent-amber/80 text-xs h-8 px-3">
                          Authorize Care Dispatch
                        </button>
                        <button className="btn-secondary text-xs h-8 px-3">
                          Request Route Override
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {!task && !loading && (
              <div className="py-12 text-center">
                <Sparkles className="h-8 w-8 text-white/15 mx-auto mb-4" />
                <p className="text-[14px] font-medium text-white/50 mb-2">
                  Navigation Assistant is ready
                </p>
                <p className="text-[13px] text-white/30 max-w-sm mx-auto">
                  Describe your situation above and the system will coordinate care on your behalf.
                </p>
              </div>
            )}

            <div ref={logEndRef} />
          </div>

          {/* Note bar */}
          <div className="border-t border-white/[0.08] bg-[#07080A] px-6 py-3">
            <p className="text-center text-[11px] text-white/30">
              The Navigation Assistant coordinates care on your behalf. No prompts needed.
            </p>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-72 border-l border-white/[0.08] bg-white/[0.01] overflow-y-auto flex-shrink-0">
          <div className="p-5 space-y-5">
            {/* Journey Status */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                Journey Status
              </p>
              <div className="space-y-2">
                {[
                  { label: "Assessment", done: true },
                  { label: "Provider Match", done: true },
                  { label: "Interpreter", done: true },
                  { label: "Appointment", done: false, current: true },
                  { label: "Follow-up", done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        step.done
                          ? "bg-accent-green"
                          : step.current
                          ? "bg-accent-cyan animate-pulse"
                          : "bg-stone"
                      }`}
                    />
                    <span
                      className={`text-[13px] ${
                        step.done || step.current ? "text-body" : "text-stone"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                Confirmed Provider
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-white/[0.08] flex items-center justify-center text-sm font-semibold text-white/90">
                  DT
                </div>
                <div>
                  <p className="text-[14px] text-on-dark">Dr. Hiroshi Tanaka</p>
                  <p className="text-[13px] text-mute">General Medicine</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-mute">
                  <MapPin className="h-3.5 w-3.5" />
                  Tokyo Medical Center, 2.3km
                </div>
                <div className="flex items-center gap-2 text-[13px] text-mute">
                  <MessageSquare className="h-3.5 w-3.5" />
                  English, Japanese
                </div>
                <div className="flex items-center gap-2 text-[13px] text-accent-green">
                  <Shield className="h-3.5 w-3.5" />
                  Accepts International Patients
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                Quick Actions
              </p>
              <div className="space-y-1.5">
                {[
                  { icon: Phone, label: "Call Provider" },
                  { icon: MessageSquare, label: "Message Interpreter" },
                  { icon: Zap, label: "Reschedule" },
                  { icon: Shield, label: "Emergency Help" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all text-left"
                  >
                    <action.icon className="h-4 w-4 text-mute" />
                    <span className="text-[13px] text-body">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Scenarios */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-3">
                Suggested Scenarios
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "Stomach pain in Tokyo", query: "I have stomach pain in Tokyo, Japan" },
                  { label: "Find pharmacist in Bangkok", query: "Find a pharmacy in Bangkok, Thailand" },
                  { label: "What is Crocin in Japan?", query: "What is Crocin called in Japan?" },
                  { label: "English doctor in Dubai", query: "Find an English-speaking doctor in Dubai, UAE" },
                ].map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setGoal(ex.query)}
                    className="w-full flex items-center justify-between rounded-md bg-white/[0.02] border border-white/[0.06] px-3 py-2 text-left text-[13px] text-white/55 hover:bg-white/[0.06] hover:text-white/90 transition-all group"
                  >
                    <span>{ex.label}</span>
                    <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-accent-cyan transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="rounded-xl border border-accent-cyan-soft bg-accent-cyan-soft/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-accent-cyan" />
                <span className="text-[13px] font-medium text-accent-cyan">Tip</span>
              </div>
              <p className="text-[13px] text-body">
                Bring your passport and insurance card to the appointment. The interpreter
                will meet you at the reception.
              </p>
            </div>

            {/* Recent Queries */}
            {history.length > 0 && (
              <div className="rounded-xl border border-white/[0.08] bg-[#0D1015] overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Recent Queries
                  </p>
                </div>
                <div className="divide-y divide-white/[0.04] max-h-[240px] overflow-y-auto">
                  {history.map((h: any) => (
                    <button
                      key={h.id}
                      onClick={() => handleSelectHistoryTask(h)}
                      className="w-full text-left p-3 hover:bg-white/[0.02] transition-colors space-y-1 group block"
                    >
                      <p className="text-[13px] text-white/70 group-hover:text-white/90 truncate">
                        {h.goal}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-white/30">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(h.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] ${
                            h.status === "COMPLETED"
                              ? "bg-green-500/10 text-green-400"
                              : h.status === "FAILED"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-white/[0.06] text-white/40"
                          }`}
                        >
                          {h.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
