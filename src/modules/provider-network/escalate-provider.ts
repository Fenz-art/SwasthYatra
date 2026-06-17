"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function escalateProvider(data: {
  leadId?: string
  assignmentId?: string
  reason: string
  severity?: string
  assignedTo?: string
  notes?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const escalation = await prisma.providerEscalation.create({
    data: {
      leadId: data.leadId,
      assignmentId: data.assignmentId,
      reason: data.reason,
      severity: data.severity ?? "MEDIUM",
      assignedTo: data.assignedTo,
      notes: data.notes,
      status: "OPEN",
      openedAt: new Date(),
    },
  })

  if (data.assignmentId) {
    await prisma.providerAssignment.update({
      where: { id: data.assignmentId },
      data: { status: "ESCALATED" },
    })
  }

  return escalation
}
