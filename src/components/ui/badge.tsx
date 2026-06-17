import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "border-transparent bg-primary/15 text-[#00E5FF]",
      secondary: "border-white/[0.08] bg-white/[0.04] text-white/60",
      destructive: "border-red-500/20 bg-red-500/10 text-red-300",
      outline: "border-white/[0.08] text-white/50",
      success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
      warning: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    },
  },
  defaultVariants: { variant: "secondary" },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
