import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_0_22px_rgba(0,229,255,0.18)] hover:bg-primary/90 hover:shadow-[0_0_28px_rgba(0,229,255,0.24)]",
        outline: "border border-input bg-background/40 hover:bg-white/[0.04] hover:border-white/[0.16] hover:text-accent-foreground",
        ghost: "hover:bg-white/[0.05] hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        raycast: "border border-white/[0.12] bg-white/[0.03] text-white/95 hover:bg-white/[0.07] hover:border-white/[0.18]",
      },
      size: {
        default: "h-9 px-3 py-2 text-xs",
        sm: "h-8 rounded-md px-2.5 text-[11px]",
        lg: "h-10 rounded-md px-5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
