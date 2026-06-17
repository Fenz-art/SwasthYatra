import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { followupEngine } from "@/packages/followup-engine"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const assignment = await prisma.providerAssignment.findUnique({ where: { id } })
  if (!assignment || assignment.providerId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.providerAssignment.update({
    where: { id },
    data: { status: "COMPLETED", resolvedAt: new Date() },
  })

  await prisma.travelHealthSession.update({
    where: { id: assignment.journeyId },
    data: { status: "RESOLVED" },
  })

  await followupEngine.schedule(assignment.journeyId)

  return NextResponse.redirect(new URL("/provider/assignments", req.url))
}
