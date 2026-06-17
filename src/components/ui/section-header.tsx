import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

export function SectionHeader({ eyebrow, title, description, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)} {...props}>
      <div className="space-y-1.5">
        {eyebrow && <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{eyebrow}</div>}
        <h2 className="text-base font-semibold tracking-tight text-white/95">{title}</h2>
        {description && <p className="max-w-2xl text-xs leading-relaxed text-white/45">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
