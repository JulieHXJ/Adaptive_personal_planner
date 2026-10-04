<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

import AppDrawer from '@/components/AppDrawer.vue'
import ProjectBadge from '@/components/ProjectBadge.vue'
import StatusLabel from '@/components/StatusLabel.vue'
import TaskCard from '@/components/TaskCard.vue'
import { usePlannerStore } from '@/stores/planner'
import type { PlannerTask, Priority, Project } from '@/types/planner'

const plannerStore = usePlannerStore()
const selectedItem = ref<{ project: Project; task: PlannerTask } | null>(null)
const taskMotion = ref<{
  taskId: string
  phase: 'detaching' | 'landing'
  direction: 'complete' | 'restore'
} | null>(null)
let reorderTimer: ReturnType<typeof setTimeout> | null = null
let clearMotionTimer: ReturnType<typeof setTimeout> | null = null

const priorityWeight: Record<Priority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const todayLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}).format(new Date())

const orderedTasks = computed(() =>
  [...plannerStore.todayTasks].sort((first, second) => {
    const firstDone = first.task.status === 'done'
    const secondDone = second.task.status === 'done'
    if (firstDone !== secondDone) return firstDone ? 1 : -1

    if (firstDone && secondDone) {
      return (first.task.completionOrder ?? 0) - (second.task.completionOrder ?? 0)
    }

    if (first.task.manualPin !== second.task.manualPin) return first.task.manualPin ? -1 : 1
    return priorityWeight[second.task.priority] - priorityWeight[first.task.priority]
  }),
)

function clearTimers() {
  if (reorderTimer) clearTimeout(reorderTimer)
  if (clearMotionTimer) clearTimeout(clearMotionTimer)
}

function toggleTaskWithMotion(projectId: string, task: PlannerTask) {
  if (taskMotion.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    plannerStore.toggleTask(projectId, task.id)
    return
  }

  taskMotion.value = {
    taskId: task.id,
    phase: 'detaching',
    direction: task.status === 'done' ? 'restore' : 'complete',
  }

  reorderTimer = setTimeout(async () => {
    plannerStore.toggleTask(projectId, task.id)
    await nextTick()

    if (!taskMotion.value) return
    taskMotion.value = { ...taskMotion.value, phase: 'landing' }

    clearMotionTimer = setTimeout(() => {
      taskMotion.value = null
    }, 480)
  }, 240)
}

onBeforeUnmount(clearTimers)
</script>

<template>
  <section class="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
    <header>
      <p
        class="inline-block -rotate-1 border-b-2 border-dashed border-[#ffd93d] text-sm font-bold tracking-[0.12em] text-[#2c2c2c]/65"
      >
        {{ todayLabel }}
      </p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Today</h1>
    </header>

    <TransitionGroup name="task-stack" tag="div" class="mt-10 space-y-7">
      <article v-for="({ project, task }, index) in orderedTasks" :key="task.id">
        <div
          class="task-note-motion"
          :class="[
            index % 2 === 0 ? '-rotate-[0.2deg]' : 'rotate-[0.2deg]',
            {
              'task-note-motion--tearing':
                taskMotion?.taskId === task.id &&
                taskMotion.phase === 'detaching' &&
                taskMotion.direction === 'complete',
              'task-note-motion--lifting':
                taskMotion?.taskId === task.id &&
                taskMotion.phase === 'detaching' &&
                taskMotion.direction === 'restore',
              'task-note-motion--landing':
                taskMotion?.taskId === task.id && taskMotion.phase === 'landing',
            },
          ]"
        >
          <ProjectBadge
            class="relative z-10 mb-[-0.35rem] ml-5"
            :name="project.name"
            :short-name="project.shortName"
            :color="project.color"
          />
          <TaskCard
            :task="task"
            :project-color="project.color"
            @open="selectedItem = { project, task }"
            @toggle="toggleTaskWithMotion(project.id, task)"
          />
        </div>
      </article>

      <div
        v-if="orderedTasks.length === 0"
        key="empty-today"
        class="rotate-[0.2deg] border-2 border-dashed border-[#2c2c2c]/45 bg-[#fffef5] p-8 text-center shadow-[4px_4px_0_#4ecdc4]"
      >
        <p class="font-bold">Nothing is scheduled for today.</p>
        <p class="mt-2 text-sm text-[#2c2c2c]/60">Your next rolling plan will appear here.</p>
      </div>
    </TransitionGroup>
  </section>

  <AppDrawer
    :open="selectedItem !== null"
    :title="selectedItem?.task.title ?? 'Task details'"
    @close="selectedItem = null"
  >
    <template v-if="selectedItem">
      <ProjectBadge
        :name="selectedItem.project.name"
        :short-name="selectedItem.project.shortName"
        :color="selectedItem.project.color"
      />
      <p class="mt-6 leading-7 text-[#2c2c2c]/75">{{ selectedItem.task.description }}</p>
      <div class="mt-6">
        <StatusLabel :status="selectedItem.task.status" />
      </div>
    </template>
  </AppDrawer>
</template>

<style scoped>
.task-stack-move {
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.task-note-motion--tearing {
  position: relative;
  z-index: 20;
  animation: tear-note-away 240ms cubic-bezier(0.55, 0, 1, 0.45) forwards;
  transform-origin: 50% 0;
}

.task-note-motion--lifting {
  position: relative;
  z-index: 20;
  animation: lift-note-away 240ms cubic-bezier(0.55, 0, 1, 0.45) forwards;
}

.task-note-motion--landing {
  position: relative;
  z-index: 20;
  animation: paste-note-down 460ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes tear-note-away {
  0% {
    transform: translate(0, 0) rotate(0);
    opacity: 1;
  }
  42% {
    transform: translate(0.5rem, -0.65rem) rotate(1.5deg);
    opacity: 0.9;
  }
  100% {
    transform: translate(3.5rem, -1.4rem) rotate(5deg) scale(0.96);
    opacity: 0.08;
  }
}

@keyframes lift-note-away {
  0% {
    transform: translate(0, 0) rotate(0);
    opacity: 0.5;
  }
  100% {
    transform: translate(-2.5rem, -1.5rem) rotate(-4deg) scale(0.97);
    opacity: 0.08;
  }
}

@keyframes paste-note-down {
  0% {
    transform: translateY(-2.5rem) rotate(-3deg) scale(0.97);
    opacity: 0.1;
  }
  72% {
    transform: translateY(0.25rem) rotate(0.8deg) scale(1.01);
    opacity: 1;
  }
  100% {
    transform: translateY(0) rotate(0) scale(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .task-stack-move,
  .task-note-motion--tearing,
  .task-note-motion--lifting,
  .task-note-motion--landing {
    transition: none;
    animation: none;
  }
}
</style>
