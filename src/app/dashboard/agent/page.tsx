"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { showToast } from "@/components/ui/toast"
import {
  createAgentTask,
  executeAgentTask,
  getAgentTaskStatus,
  getAgentTaskHistory
} from "@/modules/agent/actions"
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  Bot,
  Sparkles,
  Link as LinkIcon
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

export default function AgentWorkspace() {
  const [goal, setGoal] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  // Fetch task history on mount
  useEffect(() => {
    loadHistory()
    return () => stopPolling()
  }, [])

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
          // Stop polling if the task is terminal
          if (updatedTask.status === "COMPLETED" || updatedTask.status === "FAILED" || updatedTask.status === "CANCELLED") {
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
      // Step 1: Create the task in database immediately (planning state)
      const initialTask = await createAgentTask(goal, sessionId || undefined)
      setActiveTaskId(initialTask.id)
      setTask(initialTask)

      // Step 2: Start polling database state changes
      startPolling(initialTask.id)

      // Step 3: Trigger backend execution asynchronously (don't block the UI thread completely)
      executeAgentTask(initialTask.id).catch(err => {
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
        return <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-400 shrink-0" />
      case "RUNNING":
        return <Spinner size="sm" className="text-[#00E5FF] shrink-0" />
      default:
        return <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 mx-1" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4">
        <h1 className="text-xl font-semibold text-white/95">Navigation Assistant</h1>
        <p className="text-xs text-white/45">
          Consult the autonomous coordinator to evaluate symptoms, translate prescriptions, or route care.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Workspace (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Panel */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/90">Define Your Situation</CardTitle>
              <CardDescription className="text-xs text-white/45">
                Explain your medical concern, location, or prescription translation need.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    placeholder="e.g., I have stomach pain and need a pharmacist in Tokyo"
                    className="bg-[#07080A] border-white/[0.08] text-sm placeholder-white/30 text-white/95 focus-visible:ring-[#00E5FF] focus-visible:border-[#00E5FF]"
                    onKeyDown={e => e.key === "Enter" && handleExecute()}
                  />
                  <Button
                    onClick={handleExecute}
                    disabled={loading || !goal}
                    className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#07080A] font-semibold text-xs h-10 px-4 shrink-0 transition-colors"
                  >
                    {loading ? <Spinner size="sm" /> : <span className="flex items-center gap-1">Ask Assistant <ArrowRight className="h-3.5 w-3.5" /></span>}
                  </Button>
                </div>
              </div>

              {/* Linked Journey optional field */}
              <div className="flex items-center gap-3 text-xs bg-white/[0.02] border border-white/[0.06] p-2.5 rounded">
                <LinkIcon className="h-3.5 w-3.5 text-white/45" />
                <span className="text-white/45 font-medium">Link to Travel Journey ID (optional):</span>
                <input
                  type="text"
                  value={sessionId}
                  onChange={e => setSessionId(e.target.value)}
                  placeholder="Paste travel session ID"
                  className="bg-transparent border-none outline-none text-white/90 placeholder-white/20 w-full font-mono text-[11px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Active / Current Execution Progress */}
          {task && (
            <div className="space-y-6 animate-in fade-in-0 duration-200">
              {/* Steps Progress */}
              <Card className="border-white/[0.08] bg-[#0D1015]">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-sm font-medium text-white/90">Live Activity</CardTitle>
                    <CardDescription className="text-xs text-white/45">
                      Progress tracking for your current care request
                    </CardDescription>
                  </div>
                  <Badge variant={task.status === "COMPLETED" ? "default" : "secondary"} className={task.status === "COMPLETED" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/[0.08] text-white/65"}>
                    {task.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {task.nodeExecutions && task.nodeExecutions.length > 0 ? (
                    task.nodeExecutions.map((exec: any, i: number) => (
                      <div key={exec.id} className="flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.01] p-3 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-white/30 font-mono text-[10px] w-4">0{i + 1}</span>
                          <span className="font-medium text-white/80">
                            {nodeTypeLabels[exec.nodeType] || exec.nodeType.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {exec.durationMs && (
                            <span className="text-[10px] text-white/30 font-mono">{exec.durationMs}ms</span>
                          )}
                          {getStatusIcon(exec.status)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-xs text-white/45">
                      Preparing coordination activities...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Care Plan Card */}
              {task.reflection && (
                <Card className="border-white/[0.08] bg-[#0D1015]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white/90">Care Navigation Plan</CardTitle>
                    <CardDescription className="text-xs text-white/45">
                      Verified clinical options matching your context
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                      {task.reflection}
                    </p>

                    {task.confidence !== undefined && (
                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-white/45 font-medium">Confidence Score</span>
                          <span className="text-[#00E5FF] font-semibold">{Math.round(task.confidence * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                          <div
                            className="h-full bg-[#00E5FF] rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(task.confidence * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Operator Approval Request */}
              {task.needsApproval && (
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Operator Review Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-amber-200/80">
                      This plan involves specialized medication matching and requires clinician or network operator confirmation before dispatching.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-[#07080A] font-semibold text-xs h-8 px-3">
                        Authorize Care Dispatch
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/[0.08] hover:bg-white/[0.04] text-white/85 text-xs h-8 px-3">
                        Request Route Override
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* History Panel (Right Column) */}
        <div className="space-y-6">
          {/* Quick templates / examples */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Suggested Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Stomach pain in Tokyo", query: "I have stomach pain in Tokyo, Japan" },
                { label: "Find pharmacist in Bangkok", query: "Find a pharmacy in Bangkok, Thailand" },
                { label: "What is Crocin in Japan?", query: "What is Crocin called in Japan?" },
                { label: "English doctor in Dubai", query: "Find an English-speaking doctor in Dubai, UAE" },
              ].map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setGoal(ex.query)}
                  className="w-full flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left text-xs text-white/65 hover:bg-white/[0.06] hover:text-white/95 transition-all group"
                >
                  <span>{ex.label}</span>
                  <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-[#00E5FF] transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Past execution ledger */}
          <Card className="border-white/[0.08] bg-[#0D1015]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {history.length === 0 ? (
                <div className="p-4 text-center text-xs text-white/30">
                  No query history recorded.
                </div>
              ) : (
                <div className="divide-y divide-white/[0.04] max-h-[300px] overflow-y-auto">
                  {history.map((h: any) => (
                    <button
                      key={h.id}
                      onClick={() => handleSelectHistoryTask(h)}
                      className="w-full text-left p-3 hover:bg-white/[0.02] transition-colors space-y-1 block group"
                    >
                      <p className="text-xs font-medium text-white/80 group-hover:text-white/95 truncate">
                        {h.goal}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-white/30">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(h.createdAt).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-[8px] py-0 border-white/[0.08] px-1 bg-white/[0.02] text-white/45">
                          {h.status}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
