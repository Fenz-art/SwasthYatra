"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

const COUNTRIES = [
  { value: "Japan", label: "Japan" },
  { value: "Thailand", label: "Thailand" },
  { value: "India", label: "India" },
  { value: "UAE", label: "UAE" },
  { value: "UK", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "Germany", label: "Germany" },
  { value: "Mexico", label: "Mexico" },
  { value: "Australia", label: "Australia" },
  { value: "Singapore", label: "Singapore" },
]

export default function MedicationsPage() {
  const [form, setForm] = useState({ brandName: "", activeIngredient: "", targetCountry: "" })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!form.targetCountry) return
    if (!form.brandName && !form.activeIngredient) return

    setLoading(true)
    setSearched(true)
    try {
      const { searchMedicationEquivalents } = await import("@/modules/medication/actions")
      const res = await searchMedicationEquivalents({
        brandName: form.brandName || undefined,
        activeIngredient: form.activeIngredient || undefined,
        targetCountry: form.targetCountry,
      })
      setResult(res)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const categoryColors: Record<string, string> = {
    OTC: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    PHARMACIST_ONLY: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    PRESCRIPTION: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    CONTROLLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medication Intelligence</h1>
        <p className="text-muted-foreground">Find medication equivalents across countries</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Find Medication Equivalent</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand Name (optional)</label>
              <Input value={form.brandName} onChange={e => setForm({ ...form, brandName: e.target.value })} placeholder="e.g., Crocin, Tylenol" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Active Ingredient (optional)</label>
              <Input value={form.activeIngredient} onChange={e => setForm({ ...form, activeIngredient: e.target.value })} placeholder="e.g., Paracetamol" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Country</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.targetCountry} onChange={e => setForm({ ...form, targetCountry: e.target.value })}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4" disabled={loading || !form.targetCountry || (!form.brandName && !form.activeIngredient)}>
            {loading ? <Spinner size="sm" /> : "Search Equivalents"}
          </Button>
        </CardContent>
      </Card>

      {searched && result && (
        <Card>
          <CardHeader>
            <CardTitle>
              {result.found
                ? `Results for ${result.ingredient} in ${form.targetCountry}`
                : "No equivalents found"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.found ? (
              <div className="space-y-3">
                {result.equivalents.map((eq: any, i: number) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{eq.brands.join(", ")}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[eq.regulatoryCategory] || ""}`}>
                        {eq.regulatoryCategory}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {eq.requiresPrescription && <Badge variant="destructive">Prescription Required</Badge>}
                      {eq.estimatedCost && <span>Est. cost: {eq.estimatedCost}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Could not find medication equivalents matching your search.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
