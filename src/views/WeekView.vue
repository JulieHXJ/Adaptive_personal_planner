<script setup lang="ts">
import { computed } from 'vue'

import PriorityLabel from '@/components/PriorityLabel.vue'
import RiskLabel from '@/components/RiskLabel.vue'
import { usePlannerStore } from '@/stores/planner'
import type { PlannerTask, Project } from '@/types/planner'

interface WeekDay {
  isoDate: string
  weekday: string
  date: string
  month: string
  isToday: boolean
}

interface DailyProject {
  project: Project
  tasks: PlannerTask[]
}

const plannerStore = usePlannerStore()

const weekDays = computed<WeekDay[]>(() => {
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today)
    date.setDate(today.getDate() + offset)

    return {
      isoDate: date.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      date: new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date),
      month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
      isToday: offset === 0,
    }
  })
})

function dailyProjects(isoDate: string): DailyProject[] {
  return plannerStore.sortedProjects.flatMap((project) => {
    const tasks = project.tasks.filter((task) => task.scheduledDate === isoDate)
    return tasks.length > 0 ? [{ project, tasks }] : []
  })
}

function totalEffort(tasks: PlannerTask[]) {
  return tasks.reduce((total, task) => total + task.effortMinutes, 0)
}
</script>

<template>
  <section class="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
    <header>
      <p
        class="inline-block rotate-1 border-b-2 border-dashed border-[#4ecdc4] text-sm font-bold tracking-[0.12em] text-[#2c2c2c]/65"
      >
        ROLLING SEVEN-DAY PLAN
      </p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Weekly View</h1>
    </header>

    <div class="mt-8 overflow-x-auto pb-5">
      <div class="grid min-w-[1120px] grid-cols-7 gap-4">
        <section
          v-for="day in weekDays"
          :key="day.isoDate"
          class="week-day min-h-[34rem] border-l-2 border-dashed border-[#2c2c2c]/24 px-2"
        >
          <header
            class="sticky top-0 z-10 mb-5 border-b-2 border-dashed border-[#2c2c2c]/35 bg-[#fffef5]/95 pb-3 pt-2 text-center"
            :class="{ 'week-day__today': day.isToday }"
          >
            <span class="block text-xs font-bold uppercase tracking-wider">
              {{ day.isToday ? 'Today' : day.weekday }}
            </span>
            <span class="mt-1 block text-2xl font-bold">{{ day.date }}</span>
            <span class="text-xs text-[#2c2c2c]/50">{{ day.month }}</span>
          </header>

          <div class="space-y-5">
            <article
              v-for="({ project, tasks }, index) in dailyProjects(day.isoDate)"
              :key="project.id"
              class="daily-project-card relative border-2 border-dashed border-[#2c2c2c]/58 bg-[#fffef5] p-3"
              :class="index % 2 === 0 ? '-rotate-[0.25deg]' : 'rotate-[0.25deg]'"
              :style="{ '--project-color': project.color }"
            >
              <span class="daily-project-card__tape" aria-hidden="true"></span>
              <h2 class="text-base font-bold leading-tight">{{ project.name }}</h2>
              <p class="mt-4 text-sm font-bold">
                {{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }} ·
                {{ totalEffort(tasks) }} min
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <PriorityLabel :priority="project.priority" />
                <RiskLabel :risk="project.risk" />
              </div>
            </article>

            <p
              v-if="dailyProjects(day.isoDate).length === 0"
              class="pt-8 text-center text-sm text-[#2c2c2c]/38"
            >
              No planned work
            </p>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.week-day__today {
  background-image: linear-gradient(
    transparent 66%,
    rgb(255 217 61 / 60%) 66% 88%,
    transparent 88%
  );
}

.daily-project-card {
  box-shadow: 4px 4px 0 var(--project-color);
}

.daily-project-card__tape {
  position: absolute;
  top: -0.55rem;
  left: 50%;
  width: 2.8rem;
  height: 0.9rem;
  transform: translateX(-50%) rotate(-1deg);
  background: color-mix(in srgb, var(--project-color) 45%, transparent);
}
</style>
