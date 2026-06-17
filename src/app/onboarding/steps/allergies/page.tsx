"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AllergiesStep() {
  const router = useRouter()
  const [allergies, setAllergies] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addAllergy = () => {
    if (input.trim() && !allergies.includes(input.trim())) {
      setAllergies([...allergies, input.trim()])
      setInput("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allergies</CardTitle>
        <CardDescription>What are you allergic to?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g., Penicillin, Shellfish, Peanuts"
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAllergy())}
          />
          <Button variant="outline" onClick={addAllergy} type="button">Add</Button>
        </div>
        {allergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allergies.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive">
                {a}
                <button onClick={() => setAllergies(allergies.filter((_, j) => j !== i))} className="hover:text-destructive/70">&times;</button>
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/onboarding/steps/medical")}>Back</Button>
          <Button onClick={() => router.push("/onboarding/steps/insurance")}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  )
}
