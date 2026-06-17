"use server"

import { prisma } from "@/lib/prisma";
import { orchestrateNavigation } from "@/modules/triage/navigation-orchestrator";

// Define the signature for an Agent Tool
type AgentTool = (args: any, context: { userId: string, sessionId?: string }) => Promise<any>;

// The Registry
export const toolRegistry: Record<string, AgentTool> = {
  
  queryPassport: async (_, ctx) => {
    return prisma.healthPassport.findFirst({ 
      where: { userId: ctx.userId },
      orderBy: { createdAt: "desc" }
    });
  },

  queryMemory: async (_, ctx) => {
    return prisma.medicalMemory.findMany({ where: { userId: ctx.userId } });
  },

  searchMedication: async (args, _) => {
    return prisma.countryMedication.findMany({
      where: {
        activeIngredient: { name: { equals: args.ingredient, mode: "insensitive" } },
        country: { equals: args.country, mode: "insensitive" }
      },
      include: { activeIngredient: true }
    });
  },

  findProvider: async (args, _) => {
    return prisma.provider.findMany({
      where: {
        country: { equals: args.country, mode: "insensitive" },
        city: { equals: args.city, mode: "insensitive" },
        type: args.type
      }
    });
  },

  // The ultimate tool: The Navigation Router
  navigateSymptoms: async (_, ctx) => {
    if (!ctx.sessionId) throw new Error("Session required for navigation");
    return orchestrateNavigation(ctx.sessionId);
  }
};

export async function executeTool(toolName: string, args: any, ctx: { userId: string, sessionId?: string }) {
  const tool = toolRegistry[toolName];
  if (!tool) throw new Error(`Tool ${toolName} not found in registry`);
  return tool(args, ctx);
}
