import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("rounded-lg border border-white/[0.08] bg-[#0D1015] text-card-foreground shadow-[0_18px_70px_rgba(0,0,0,0.26)]", className)} {...props} />)
)
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("flex flex-col space-y-1.5 p-5", className)} {...props} />)
)
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("text-sm font-semibold leading-none tracking-tight text-white/95", className)} {...props} />)
)
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("text-xs leading-relaxed text-white/45", className)} {...props} />)
)
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("p-5 pt-0", className)} {...props} />)
)
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (<div ref={ref} className={cn("flex items-center p-5 pt-0", className)} {...props} />)
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
