import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressStep {
  label: string
  description?: string
  status?: "complete" | "active" | "pending"
}

interface NarrativeStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: ProgressStep[]
  compact?: boolean
}

export function NarrativeSteps({ steps, compact = false, className }: NarrativeStepsProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {steps.map((step, index) => {
        const status = step.status ?? "pending"
        return (
          <div
            key={`${step.label}-${index}`}
            className={cn(
              "relative flex gap-3 rounded-lg border p-3 transition-all duration-200",
              compact ? "p-2.5" : "p-3",
              status === "complete" && "border-emerald-500/15 bg-emerald-500/[0.035]",
              status === "active" && "border-[#00E5FF]/30 bg-[#00E5FF]/[0.055]",
              status === "pending" && "border-white/[0.06] bg-white/[0.015]"
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                status === "complete" && "bg-emerald-500 text-[#07080A]",
                status === "active" && "bg-[#00E5FF] text-[#07080A] shadow-[0_0_18px_rgba(0,229,255,0.3)]",
                status === "pending" && "bg-white/[0.06] text-white/30"
              )}
            >
              {status === "complete" ? "✓" : status === "active" ? "•" : index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={cn("text-xs font-semibold", status === "pending" ? "text-white/45" : "text-white/90")}>
                  {step.label}
                </h3>
              </div>
              {step.description && (
                <p className="mt-1 text-xs leading-relaxed text-white/45">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
