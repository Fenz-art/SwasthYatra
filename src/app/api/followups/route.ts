import { NextRequest, NextResponse } from "next/server"
import { followupEngine } from "@/packages/followup-engine"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const action = body.action as string

  switch (action) {
    case "schedule": {
      const { journeyId } = body
      if (!journeyId) return NextResponse.json({ error: "journeyId required" }, { status: 400 })
      const tasks = await followupEngine.schedule(journeyId)
      return NextResponse.json({ scheduled: tasks?.length ?? 0 })
    }

    case "process": {
      const count = await followupEngine.processPending()
      return NextResponse.json({ processed: count })
    }

    case "respond": {
      const { journeyId, timing, answers } = body
      if (!journeyId || !timing || !answers) {
        return NextResponse.json({ error: "journeyId, timing, answers required" }, { status: 400 })
      }
      await followupEngine.recordResponse(journeyId, timing, answers)
      return NextResponse.json({ recorded: true })
    }

    default:
      return NextResponse.json({ error: "unknown action" }, { status: 400 })
  }
}

export async function GET() {
  const rate = await followupEngine.getOutcomeCollectionRate()
  const processed = await followupEngine.processPending()
  return NextResponse.json({ outcomeCollectionRate: rate, followupsProcessed: processed })
}
