import * as React from "react"
import { cn } from "@/lib/utils"
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={cn("flex h-9 w-full rounded-md border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-sm text-white/95 shadow-sm transition-all duration-100 placeholder:text-white/30 focus-visible:border-[#00E5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/20 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
  )
)
Input.displayName = "Input"
