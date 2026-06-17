"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTransition } from "react"

export function CandidateReview({ candidate }: { candidate: any }) {
  const [isPending, startTransition] = useTransition()

  const handleApprove = () => startTransition(async () => {
    const { approveCandidate } = await import("@/modules/memory/actions")
    await approveCandidate(candidate.id)
  })

  const handleReject = () => startTransition(async () => {
    const { rejectCandidate } = await import("@/modules/memory/actions")
    await rejectCandidate(candidate.id)
  })

  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex gap-2 items-center">
        <Badge variant="secondary">{candidate.extractedData.type}</Badge>
        <span className="font-medium">{candidate.extractedData.data.name}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="destructive" disabled={isPending} onClick={handleReject}>Reject</Button>
        <Button size="sm" disabled={isPending} onClick={handleApprove}>Approve</Button>
      </div>
    </div>
  )
}
