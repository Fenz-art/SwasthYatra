"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auditService } from "@/server/audit/service"
import { executeTool } from "./tool-registry"
import { buildAgentContext } from "./agent-memory"
import { buildPlan, evaluateExecution, calculateConfidence } from "@/packages/agent-core"

// Creates the task and returns it immediately
export async function createAgentTask(goal: string, sessionId?: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.agentTask.create({
    data: {
      userId: session.user.id,
      sessionId,
      goal,
      status: "PLANNING",
      startedAt: new Date(),
    }
  })

  await auditService.log({
    event: "AGENT_TASK_STARTED",
    actorId: session.user.id,
    resource: "AgentTask",
    resourceId: task.id,
    metadata: { goal }
  })

  return task
}

// Executes the workflow steps for a task
export async function executeAgentTask(taskId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.agentTask.findUnique({
    where: { id: taskId }
  })
  if (!task) throw new Error("Task not found")

  const ctx = { userId: session.user.id, sessionId: task.sessionId || undefined }

  try {
    const agentMemory = await buildAgentContext(ctx.userId, ctx.sessionId)
    const context = {
      country: agentMemory.currentSession?.country,
      city: agentMemory.currentSession?.city,
    }

    const plan = buildPlan(task.goal, context)

    await prisma.agentTask.update({
      where: { id: task.id },
      data: { plan: plan as any, status: "EXECUTING" }
    })

    const executionResults = []
    for (let i = 0; i < plan.length; i++) {
      const step = plan[i]
      const startTime = Date.now()

      const nodeExec = await prisma.agentNodeExecution.create({
        data: {
          taskId: task.id,
          nodeType: step.tool.toUpperCase() as any,
          sequence: i,
          input: step.input as any,
          status: "RUNNING",
          startedAt: new Date(),
        }
      })

      try {
        const result = await executeTool(step.tool, step.input, ctx)

        await prisma.agentNodeExecution.update({
          where: { id: nodeExec.id },
          data: {
            output: result as any,
            status: "SUCCESS",
            completedAt: new Date(),
            durationMs: Date.now() - startTime,
          }
        })

        executionResults.push({ tool: step.tool, node: step.tool, success: true, data: result })
      } catch (err) {
        await prisma.agentNodeExecution.update({
          where: { id: nodeExec.id },
          data: {
            status: "FAILED",
            error: (err as Error).message,
            completedAt: new Date(),
            durationMs: Date.now() - startTime,
          }
        })
        executionResults.push({ tool: step.tool, node: step.tool, success: false, error: (err as Error).message })
      }
    }

    const reflection = evaluateExecution(task.goal, { results: executionResults })
    const confidenceFactors = [
      { name: "execution", score: reflection.score, weight: 0.6 },
      { name: "result_quality", score: executionResults.filter(r => r.success).length / Math.max(executionResults.length, 1), weight: 0.4 },
    ]
    const confidence = calculateConfidence(confidenceFactors)

    const message = reflection.findings.join(". ")
    const result = await prisma.agentTask.update({
      where: { id: task.id },
      data: {
        status: "COMPLETED",
        result: executionResults as any,
        reflection: message,
        confidence: confidence.overall,
        completedAt: new Date(),
        durationMs: Date.now() - task.startedAt!.getTime(),
      }
    })

    await auditService.log({
      event: "AGENT_TASK_COMPLETED",
      actorId: session.user.id,
      resource: "AgentTask",
      resourceId: task.id,
      metadata: { confidence: confidence.overall, steps: plan.length }
    })

    return result

  } catch (error) {
    await prisma.agentTask.update({
      where: { id: task.id },
      data: {
        status: "FAILED",
        reflection: (error as Error).message,
        completedAt: new Date(),
      }
    })
    throw error
  }
}

// Retrieves the status and executions of a task
export async function getAgentTaskStatus(taskId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.agentTask.findUnique({
    where: { id: taskId },
    include: {
      nodeExecutions: { orderBy: { sequence: "asc" } }
    }
  })
}

// Keep legacy export for safety (backward compatibility)
export async function executeAgentGoal(goal: string, sessionId?: string) {
  const task = await createAgentTask(goal, sessionId)
  return executeAgentTask(task.id)
}

export async function getAgentTaskHistory() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.agentTask.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      nodeExecutions: { orderBy: { sequence: "asc" } }
    }
  })
}
