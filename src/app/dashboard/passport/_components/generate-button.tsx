"use client"

import { generatePassport } from "@/modules/passport/actions"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"

export function GeneratePassportButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button disabled={isPending} onClick={() => startTransition(async () => { await generatePassport() })}>
      {isPending ? "Generating..." : "Generate Share Link"}
    </Button>
  )
}
