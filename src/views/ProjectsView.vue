<script setup lang="ts">
import PriorityLabel from '@/components/PriorityLabel.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import ProjectBadge from '@/components/ProjectBadge.vue'
import RiskLabel from '@/components/RiskLabel.vue'
import StatusLabel from '@/components/StatusLabel.vue'
import { usePlannerStore } from '@/stores/planner'
import type { Project } from '@/types/planner'

const plannerStore = usePlannerStore()

function completedCount(project: Project) {
  return project.tasks.filter((task) => task.status === 'done').length
}

function deadlineLabel(project: Project) {
  if (!project.targetDate) return `${project.plannedDurationWeeks ?? '—'} week plan`

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${project.targetDate}T12:00:00`))
}
</script>

<template>
  <section class="mx-auto max-w-[1350px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
    <header class="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p
          class="inline-block rotate-1 border-b-2 border-dashed border-[#ff6b6b] text-sm font-bold tracking-[0.12em] text-[#2c2c2c]/65"
        >
          THE BIG PICTURE
        </p>
        <h1 class="mt-3 text-4xl font-bold sm:text-5xl">My Projects</h1>
      </div>
      <RouterLink
        to="/projects/new"
        class="border-2 border-dashed border-[#2c2c2c] bg-[#fffef5] px-4 py-3 font-bold shadow-[4px_4px_0_#4ecdc4]"
      >
        + New Project
      </RouterLink>
    </header>

    <div class="mt-9 grid gap-6 md:grid-cols-2">
      <RouterLink
        v-for="(project, index) in plannerStore.sortedProjects"
        :key="project.id"
        :to="`/projects/${project.id}`"
        class="project-card relative border-2 border-dashed border-[#2c2c2c]/65 bg-[#fffef5] p-5 sm:p-7"
        :class="index % 2 === 0 ? '-rotate-[0.25deg]' : 'rotate-[0.25deg]'"
        :style="{ '--project-color': project.color }"
      >
        <span class="project-card__tape" aria-hidden="true"></span>
        <div class="flex flex-wrap items-start justify-between gap-3">
          <!-- <ProjectBadge
            :name="project.name"
            :short-name="project.shortName"
            :color="project.color"
          /> -->
          <StatusLabel :status="project.status" />
        </div>

        <h2 class="mt-6 text-2xl font-bold">{{ project.name }}</h2>
        <!-- <p class="mt-2 min-h-12 leading-6 text-[#2c2c2c]/65">{{ project.goal }}</p> -->

        <div class="mt-6">
          <ProgressBar
            :completed="completedCount(project)"
            :total="project.tasks.length"
            :color="project.color"
          />
        </div>

        <dl
          class="mt-6 grid grid-cols-3 gap-3 border-t-2 border-dashed border-[#2c2c2c]/25 pt-4 text-sm"
        >
          <div>
            <dt class="text-xs font-bold text-[#2c2c2c]/48">NEXT DDL</dt>
            <dd class="mt-2 font-bold">{{ deadlineLabel(project) }}</dd>
          </div>
          <div>
            <dt class="text-xs font-bold text-[#2c2c2c]/48">PRIORITY</dt>
            <dd class="mt-2"><PriorityLabel :priority="project.priority" /></dd>
          </div>
          <div>
            <dt class="text-xs font-bold text-[#2c2c2c]/48">RISK</dt>
            <dd class="mt-2"><RiskLabel :risk="project.risk" /></dd>
          </div>
        </dl>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  box-shadow: 5px 5px 0 var(--project-color);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.project-card:hover {
  transform: rotate(0) translate(1px, 1px);
  box-shadow: 7px 7px 0 var(--project-color);
}

.project-card__tape {
  position: absolute;
  top: -0.65rem;
  left: 50%;
  width: 4rem;
  height: 1.1rem;
  transform: translateX(-50%) rotate(-1deg);
  background: color-mix(in srgb, var(--project-color) 42%, transparent);
}
</style>
