export type GoalStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "ESCALATED"

export interface Goal {
  id: string
  description: string
  status: GoalStatus
  context: Record<string, unknown>
  tasks: Task[]
  result?: Record<string, unknown>
  error?: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  type: string
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED"
  input: Record<string, unknown>
  output?: Record<string, unknown>
  error?: string
  retries: number
  maxRetries: number
  createdAt: Date
}

let goalCounter = 0

class GoalManager {
  private goals = new Map<string, Goal>()

  create(description: string, context: Record<string, unknown> = {}): Goal {
    const goal: Goal = {
      id: `goal_${++goalCounter}`,
      description,
      status: "PENDING",
      context,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.goals.set(goal.id, goal)
    return goal
  }

  get(goalId: string): Goal | undefined {
    return this.goals.get(goalId)
  }

  setStatus(goalId: string, status: GoalStatus, error?: string) {
    const goal = this.goals.get(goalId)
    if (!goal) return
    goal.status = status
    goal.updatedAt = new Date()
    if (error) goal.error = error
  }

  setResult(goalId: string, result: Record<string, unknown>) {
    const goal = this.goals.get(goalId)
    if (!goal) return
    goal.result = result
    goal.updatedAt = new Date()
  }

  addTask(goalId: string, task: Omit<Task, "id" | "retries" | "createdAt">): Task {
    const goal = this.goals.get(goalId)
    if (!goal) throw new Error(`Goal ${goalId} not found`)

    const newTask: Task = {
      ...task,
      id: `task_${++goalCounter}`,
      retries: 0,
      createdAt: new Date(),
    }
    goal.tasks.push(newTask)
    goal.updatedAt = new Date()
    return newTask
  }

  findPendingGoal(): Goal | undefined {
    return Array.from(this.goals.values()).find((g) => g.status === "PENDING")
  }

  findActiveGoal(): Goal | undefined {
    return Array.from(this.goals.values()).find(
      (g) => g.status === "IN_PROGRESS" || g.status === "PENDING",
    )
  }
}

export const goalManager = new GoalManager()
