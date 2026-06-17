"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

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
  { value: "France", label: "France" },
  { value: "Italy", label: "Italy" },
]

export default function ProvidersPage() {
  const [filters, setFilters] = useState({ country: "", city: "", type: "", language: "" })
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!filters.country) return
    setLoading(true)
    setSearched(true)
    try {
      const { searchProviders } = await import("@/modules/provider/actions")
      const res = await searchProviders({
        country: filters.country,
        city: filters.city || undefined,
        type: filters.type || undefined,
        language: filters.language || undefined,
      })
      setResults(res.providers)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const providerIcons: Record<string, string> = {
    HOSPITAL: "🏥",
    CLINIC: "🏨",
    PHARMACY: "💊",
    TELEMEDICINE: "📱",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Discovery</h1>
        <p className="text-muted-foreground">Find healthcare providers near you</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Search Providers</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country *</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={filters.country} onChange={e => setFilters({ ...filters, country: e.target.value })}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })} placeholder="e.g., Tokyo" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All Types</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="CLINIC">Clinic</option>
                <option value="PHARMACY">Pharmacy</option>
                <option value="TELEMEDICINE">Telemedicine</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Input value={filters.language} onChange={e => setFilters({ ...filters, language: e.target.value })} placeholder="e.g., English" />
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4" disabled={loading || !filters.country}>
            {loading ? <Spinner size="sm" /> : "Search"}
          </Button>
        </CardContent>
      </Card>

      {searched && (
        <div className="grid gap-4 md:grid-cols-2">
          {results.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="py-8 text-center text-muted-foreground">
                No providers found matching your criteria
              </CardContent>
            </Card>
          ) : (
            results.map((p) => (
              <Card key={p.id} className="hover:bg-muted/50 transition-colors">
                <Link href={`/dashboard/providers/${p.id}`}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{providerIcons[p.type] || "🏥"} {p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.city}, {p.country}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.languages?.map((lang: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-yellow-500">{'★'.repeat(Math.round(p.ratingAverage || 0))}</p>
                        <p className="text-xs text-muted-foreground">{p.estimatedCost || ""}</p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
