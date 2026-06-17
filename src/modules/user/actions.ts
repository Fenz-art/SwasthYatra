"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { signOut } from "@/lib/auth"

export async function getUserProfile() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      phoneNumber: true,
      bloodType: true,
      emergencyContact: true,
      insuranceInfo: true,
      onboardingCompleted: true,
      _count: {
        select: {
          travelHealthSessions: true,
          vaultDocuments: true,
          memory: true,
        }
      }
    }
  })

  return user
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" })
}
