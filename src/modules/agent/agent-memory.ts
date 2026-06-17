"use server"

import { prisma } from "@/lib/prisma";

export async function buildAgentContext(userId: string, sessionId?: string) {
  const [memory, pastJourneys, currentSession] = await Promise.all([
    prisma.medicalMemory.findMany({ where: { userId } }),
    prisma.travelHealthSession.findMany({ 
      where: { userId, id: { not: sessionId } },
      take: 3, 
      orderBy: { createdAt: "desc" } 
    }),
    sessionId ? prisma.travelHealthSession.findUnique({ where: { id: sessionId } }) : null
  ]);

  return {
    patientHistory: memory,
    pastJourneys: pastJourneys.map(j => ({
      country: j.country,
      symptoms: j.symptoms,
      outcome: j.status
    })),
    currentSession: currentSession ? {
      country: currentSession.country,
      city: currentSession.city,
      symptoms: currentSession.symptoms
    } : null
  };
}
