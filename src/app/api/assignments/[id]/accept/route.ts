import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

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
    data: { status: "ACCEPTED", resolvedAt: new Date() },
  })

  await prisma.conversation.create({
    data: {
      journeyId: assignment.journeyId,
      providerId: assignment.providerId,
      assignmentId: id,
      channel: "IN_APP",
    },
  })

  return NextResponse.redirect(new URL("/provider/assignments", req.url))
}
