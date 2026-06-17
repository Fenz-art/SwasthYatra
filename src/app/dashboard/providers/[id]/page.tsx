"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProviderReviewForm from "../provider-review-form"

export default async function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const provider = await prisma.provider.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true } } }
      },
      availability: { orderBy: { dayOfWeek: "asc" } },
      contactChannels: true,
    }
  })

  if (!provider) notFound()

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/providers" className="text-sm text-muted-foreground hover:text-foreground">← Back to Providers</Link>
        <h1 className="text-2xl font-bold mt-1">{provider.name}</h1>
        <p className="text-muted-foreground">{provider.city}, {provider.country}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Details</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><Badge>{provider.type}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span>{provider.ratingAverage?.toFixed(1) || "N/A"} ({provider.ratingCount} reviews)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{provider.phone || "N/A"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cost</span><span>{provider.estimatedCost ? `${provider.estimatedCost}` : "N/A"}</span></div>
            {provider.touristFriendly && <Badge variant="secondary">Tourist Friendly</Badge>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Languages</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {provider.languages.map((lang, i) => <Badge key={i} variant="outline">{lang}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {provider.availability.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Hours</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {provider.availability.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span className="text-muted-foreground">{days[a.dayOfWeek]}</span>
                  <span>{a.startTime} - {a.endTime}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {provider.reviews.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Reviews</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {provider.reviews.map((r) => (
              <div key={r.id} className="border-b last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{r.userName || "Anonymous"}</span>
                  <span className="text-sm text-yellow-500">{'★'.repeat(r.rating)}</span>
                </div>
                {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Leave a Review</CardTitle></CardHeader>
        <CardContent>
          <ProviderReviewForm providerId={provider.id} />
        </CardContent>
      </Card>
    </div>
  )
}
