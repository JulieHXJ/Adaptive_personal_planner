import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { mockProjects } from '@/data/mockProjects'
import type { NewTaskInput, PlannerTask, Priority, Project } from '@/types/planner'

const priorityWeight: Record<Priority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const cloneProjects = (): Project[] => structuredClone(mockProjects)

function todayIso() {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  return today.toISOString().slice(0, 10)
}

export const usePlannerStore = defineStore('planner', () => {
  const projects = ref<Project[]>(cloneProjects())
  const nextCompletionOrder = ref(1)

  const sortedProjects = computed(() =>
    [...projects.value].sort((first, second) => {
      const priorityDifference = priorityWeight[second.priority] - priorityWeight[first.priority]
      if (priorityDifference !== 0) return priorityDifference

      const firstTarget = first.targetDate ?? '9999-12-31'
      const secondTarget = second.targetDate ?? '9999-12-31'
      return firstTarget.localeCompare(secondTarget)
    }),
  )

  const todayTasks = computed(() =>
    projects.value.flatMap((project) =>
      project.tasks
        .filter((task) => task.scheduledDate === todayIso())
        .map((task) => ({ project, task })),
    ),
  )

  function projectById(projectId: string) {
    return projects.value.find((project) => project.id === projectId)
  }

  function toggleTask(projectId: string, taskId: string) {
    const task = projectById(projectId)?.tasks.find((item) => item.id === taskId)
    if (!task) return

    if (task.status === 'done') {
      task.status = 'planned'
      task.completedAt = null
      task.completionOrder = null
      task.manualPin = true
      return
    }

    task.status = 'done'
    task.completedAt = new Date().toISOString()
    task.completionOrder = nextCompletionOrder.value++
    task.manualPin = false
  }

  function addTask(input: NewTaskInput) {
    const project = projectById(input.projectId)
    if (!project) return

    const task: PlannerTask = {
      id: `${input.projectId}-${Date.now()}`,
      projectId: input.projectId,
      title: input.title.trim(),
      description: input.description?.trim() || 'New task awaiting detailed planning.',
      effortMinutes: input.effortMinutes ?? 30,
      priority: 'medium',
      status: 'planned',
      scheduledDate: todayIso(),
      dueAt: input.dueAt ?? null,
      dependencyIds: [],
      sourceMaterialIds: [],
      manualPin: false,
      completedAt: null,
      completionOrder: null,
    }

    project.tasks.push(task)
  }

  return { projects, sortedProjects, todayTasks, projectById, toggleTask, addTask }
})
