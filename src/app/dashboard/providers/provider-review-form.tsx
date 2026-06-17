"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { showToast } from "@/components/ui/toast"

export default function ProviderReviewForm({ providerId }: { providerId: string }) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const { createProviderReview } = await import("@/modules/provider/actions")
      await createProviderReview({ providerId, rating, comment: comment || undefined })
      showToast("Review submitted!", "success")
      router.refresh()
    } catch (err) {
      showToast((err as Error).message, "error")
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-xl ${n <= rating ? "text-yellow-500" : "text-muted"}`}
          >
            {n <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
      />
      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  )
}
