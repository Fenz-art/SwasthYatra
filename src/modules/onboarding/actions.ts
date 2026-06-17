"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auditService } from "@/server/audit/service"
import { publishers } from "@/packages/event-bus"

export async function completeOnboarding(data: {
  name?: string
  phoneNumber?: string
  bloodType?: string
  conditions?: string[]
  allergies?: string[]
  insuranceProvider?: string
  insuranceNumber?: string
  emergencyContact?: { name: string; phone: string; relation: string }
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Update user profile
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name || undefined,
      phoneNumber: data.phoneNumber || undefined,
      bloodType: data.bloodType || undefined,
      emergencyContact: data.emergencyContact as any || undefined,
      insuranceInfo: data.insuranceProvider ? {
        provider: data.insuranceProvider,
        number: data.insuranceNumber || undefined,
      } as any : undefined,
      onboardingCompleted: true,
    }
  })

  // Create medical memories for conditions
  if (data.conditions) {
    for (const condition of data.conditions) {
      await prisma.medicalMemory.create({
        data: {
          userId: session.user.id,
          type: "CONDITION",
          data: { name: condition.trim() },
          confidence: 1.0,
          sourceType: "ONBOARDING",
          verifiedAt: new Date(),
        }
      })
    }
  }

  // Create medical memories for allergies
  if (data.allergies) {
    for (const allergy of data.allergies) {
      await prisma.medicalMemory.create({
        data: {
          userId: session.user.id,
          type: "ALLERGY",
          data: { allergen: allergy.trim(), severity: "MEDIUM" },
          confidence: 1.0,
          sourceType: "ONBOARDING",
          verifiedAt: new Date(),
        }
      })
    }
  }

  await auditService.log({
    event: "USER_SIGNED_UP" as any,
    actorId: session.user.id,
    resource: "User",
    resourceId: session.user.id,
    metadata: { action: "onboarding_completed" }
  })

  publishers.onboardingCompleted({
    userId: session.user.id,
    conditionsCount: data.conditions?.length ?? 0,
    allergiesCount: data.allergies?.length ?? 0,
  })

  revalidatePath("/dashboard")
}
