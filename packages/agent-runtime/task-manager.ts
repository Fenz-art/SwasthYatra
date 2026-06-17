import { goalManager, type Task } from "./goal-manager"
import { retryEngine } from "./retry-engine"
import { escalationEngine } from "./escalation-engine"
import { observer } from "./observer"

export type TaskExecutor = (task: Task) => Promise<Record<string, unknown>>

class TaskManager {
  private executors = new Map<string, TaskExecutor>()

  register(type: string, executor: TaskExecutor) {
    this.executors.set(type, executor)
  }

  async executeNext(goalId: string): Promise<void> {
    const goal = goalManager.get(goalId)
    if (!goal) throw new Error(`Goal ${goalId} not found`)

    goalManager.setStatus(goalId, "IN_PROGRESS")
    const pendingTask = goal.tasks.find((t) => t.status === "PENDING")
    if (!pendingTask) {
      goalManager.setStatus(goalId, "COMPLETED")
      return
    }

    pendingTask.status = "RUNNING"
    observer.record("task.started", { goalId, taskId: pendingTask.id, type: pendingTask.type })

    const executor = this.executors.get(pendingTask.type)
    if (!executor) {
      pendingTask.status = "FAILED"
      pendingTask.error = `No executor registered for type: ${pendingTask.type}`
      goalManager.setStatus(goalId, "FAILED", pendingTask.error)
      observer.record("task.failed", { goalId, taskId: pendingTask.id, error: pendingTask.error })
      return
    }

    try {
      const output = await executor(pendingTask)
      pendingTask.output = output
      pendingTask.status = "COMPLETED"
      observer.record("task.completed", { goalId, taskId: pendingTask.id })
    } catch (err) {
      pendingTask.error = err instanceof Error ? err.message : String(err)
      pendingTask.status = "FAILED"
      observer.record("task.failed", { goalId, taskId: pendingTask.id, error: pendingTask.error })

      const shouldRetry = await retryEngine.shouldRetry(pendingTask)
      if (shouldRetry) {
        pendingTask.retries++
        pendingTask.status = "PENDING"
        await retryEngine.wait(pendingTask.retries)
        return this.executeNext(goalId)
      }

      const escalated = await escalationEngine.tryEscalate(goalId)
      if (!escalated) {
        goalManager.setStatus(goalId, "FAILED", pendingTask.error)
      }
    }
  }
}

export const taskManager = new TaskManager()
