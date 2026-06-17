import { syncFromOsm } from "./workers/osm-sync"
import { syncFromGeoapify } from "./workers/geoapify-sync"
import { tracing, metrics } from "@/packages/observability"

export interface SyncResult {
  source: "OSM" | "GEOAPIFY"
  found: number
  created: number
  duplicates: number
  errors: number
}

export interface SyncJobResult {
  startedAt: Date
  completedAt: Date
  results: SyncResult[]
  total: {
    found: number
    created: number
    duplicates: number
    errors: number
  }
}

export async function runProviderSync(country: string, city: string): Promise<SyncJobResult> {
  const startedAt = new Date()

  const [osm, geoapify] = await Promise.all([
    tracing.traceProviderSearch(`osm:${country}/${city}`, () => syncFromOsm(country, city)),
    tracing.traceProviderSearch(`geoapify:${country}/${city}`, () => syncFromGeoapify(country, city)),
  ])

  const results: SyncResult[] = [
    { source: "OSM", ...osm },
    { source: "GEOAPIFY", ...geoapify },
  ]

  const total = results.reduce(
    (acc, r) => ({
      found: acc.found + r.found,
      created: acc.created + r.created,
      duplicates: acc.duplicates + r.duplicates,
      errors: acc.errors + r.errors,
    }),
    { found: 0, created: 0, duplicates: 0, errors: 0 },
  )

  metrics.record("provider.sync.completed", total.found, { country, city })

  return {
    startedAt,
    completedAt: new Date(),
    results,
    total,
  }
}
