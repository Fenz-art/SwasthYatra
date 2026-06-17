import { prisma } from "@/lib/prisma"
import { publishers } from "@/packages/event-bus"

export async function acceptAssignment(assignmentId: string) {
  const assignment = await prisma.providerAssignment.findUnique({
    where: { id: assignmentId },
  })
  if (!assignment) throw new Error("Assignment not found")

  await prisma.providerAssignment.update({
    where: { id: assignmentId },
    data: { status: "ACCEPTED", resolvedAt: new Date() },
  })

  await prisma.providerLead.updateMany({
    where: { providerId: assignment.providerId },
    data: { status: "ACTIVE" },
  })

  const conversation = await prisma.conversation.create({
    data: {
      journeyId: assignment.journeyId,
      providerId: assignment.providerId,
      assignmentId: assignment.id,
      channel: "IN_APP",
    },
  })

  publishers.providerAssigned({
    assignmentId: assignment.id,
    journeyId: assignment.journeyId,
    providerId: assignment.providerId,
  })

  return { assignment, conversation }
}

export async function declineAssignment(assignmentId: string, reason?: string) {
  const assignment = await prisma.providerAssignment.findUnique({
    where: { id: assignmentId },
  })
  if (!assignment) throw new Error("Assignment not found")

  await prisma.providerAssignment.update({
    where: { id: assignmentId },
    data: { status: "CANCELLED", resolution: reason ?? "Provider declined" },
  })

  return { success: true }
}
