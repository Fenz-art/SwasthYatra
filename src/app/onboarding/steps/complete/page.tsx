"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { showToast } from "@/components/ui/toast"

export default function CompleteStep() {
  const router = useRouter()

  const handleComplete = async () => {
    showToast("Profile setup complete! Welcome to SwasthYatra.", "success")
    setTimeout(() => router.push("/dashboard"), 500)
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <CardTitle className="text-2xl">You're All Set!</CardTitle>
        <CardDescription>Your healthcare profile is ready. You can now use SwasthYatra to navigate healthcare anywhere in the world.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <p className="text-sm font-medium">What you can do now:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start a new healthcare journey</li>
            <li>• Find medication equivalents abroad</li>
            <li>• Discover trusted providers</li>
            <li>• Use the medical interpreter</li>
            <li>• Upload and manage health documents</li>
          </ul>
        </div>
        <Button className="w-full" size="lg" onClick={handleComplete}>Go to Dashboard</Button>
      </CardContent>
    </Card>
  )
}
