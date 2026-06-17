"use server"

import { prisma } from "@/lib/prisma";

export async function buildInterpreterContext(sessionId: string) {
  const session = await prisma.travelHealthSession.findUnique({
    where: { id: sessionId },
    include: { user: { include: { memory: true } } }
  });

  if (!session) throw new Error("Session not found");

  const memory = session.user.memory;
  const symptomsList = Array.isArray(session.symptoms) ? (session.symptoms as string[]) : [];
  
  // Extract specific medical entities for the LLM prompt
  const contextString = `
    PATIENT CONTEXT (DO NOT IGNORE THIS DURING TRANSLATION):
    - Current Symptoms: ${symptomsList.join(", ")}
    - Known Allergies: ${memory.filter(m => m.type === "ALLERGY").map(m => (m.data as any).name).join(", ") || "None"}
    - Current Medications: ${memory.filter(m => m.type === "MEDICATION").map(m => `${(m.data as any).name} (${(m.data as any).dosage || ""})`).join(", ") || "None"}
    - Chronic Conditions: ${memory.filter(m => m.type === "CONDITION").map(m => (m.data as any).name).join(", ") || "None"}
    
    INSTRUCTIONS FOR TRANSLATOR:
    Ensure medical terminology is preserved. Highlight any potential conflicts between spoken symptoms and existing allergies/medications.
  `;

  return {
    textContext: contextString,
    structuredContext: {
      symptoms: session.symptoms,
      allergies: memory.filter(m => m.type === "ALLERGY").map(m => m.data),
      medications: memory.filter(m => m.type === "MEDICATION").map(m => m.data),
      conditions: memory.filter(m => m.type === "CONDITION").map(m => m.data),
    }
  };
}
