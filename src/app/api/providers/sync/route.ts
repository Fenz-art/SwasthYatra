import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { runProviderSync } from "@/packages/provider-sync"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ORG_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const country = (body.country as string) || "India"
  const city = (body.city as string) || ""

  if (!city) {
    return NextResponse.json({ error: "city is required" }, { status: 400 })
  }

  const result = await runProviderSync(country, city)
  return NextResponse.json(result)
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ORG_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json({
    endpoint: "POST /api/providers/sync",
    description: "Trigger provider sync from OSM and Geoapify",
    params: { city: "string (required)", country: "string (optional, default: India)" },
  })
}
