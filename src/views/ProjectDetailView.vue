<script setup lang="ts">
import { computed } from 'vue'

import PriorityLabel from '@/components/PriorityLabel.vue'
import ProjectBadge from '@/components/ProjectBadge.vue'
import RiskLabel from '@/components/RiskLabel.vue'
import StatusLabel from '@/components/StatusLabel.vue'
import { usePlannerStore } from '@/stores/planner'

const props = defineProps<{
  projectId: string
}>()

const plannerStore = usePlannerStore()
const project = computed(() => plannerStore.projectById(props.projectId))

const sections = ['Overview', 'Plan & Deliverables', 'Materials', 'Tasks', 'History']
</script>

<template>
  <section v-if="project" class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
    <header>
      <RouterLink
        to="/projects"
        class="text-sm font-bold underline decoration-wavy underline-offset-4"
      >
        ← My Projects
      </RouterLink>
      <div class="mt-6 flex flex-wrap items-start justify-between gap-5">
        <div>
          <!-- <ProjectBadge
            :name="project.name"
            :short-name="project.shortName"
            :color="project.color"
          /> -->
          <h1 class="mt-4 text-4xl font-bold sm:text-5xl">{{ project.name }}</h1>
          <!-- <p class="mt-3 max-w-2xl leading-7 text-[#2c2c2c]/65">{{ project.goal }}</p> -->
          <div class="mt-4 flex flex-wrap gap-3">
            <StatusLabel :status="project.status" />
            <PriorityLabel :priority="project.priority" />
            <RiskLabel :risk="project.risk" />
          </div>
        </div>
        <button
          type="button"
          class="border-2 border-dashed border-[#2c2c2c] bg-[#fffef5] px-4 py-3 font-bold shadow-[4px_4px_0_#ff6b6b]"
        >
          + New Task
        </button>
      </div>
    </header>

    <nav class="mt-10 flex gap-3 overflow-x-auto border-b-2 border-dashed border-[#2c2c2c]/30 pb-3">
      <button
        v-for="(section, index) in sections"
        :key="section"
        type="button"
        class="shrink-0 px-3 py-2 text-sm font-bold"
        :class="index === 0 ? 'bg-[#ffd93d]/55 underline decoration-wavy underline-offset-4' : ''"
      >
        {{ section }}
      </button>
    </nav>

    <div class="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <article
        class="border-2 border-dashed border-[#2c2c2c]/55 bg-[#fffef5] p-6 shadow-[5px_5px_0_var(--project-color)]"
        :style="{ '--project-color': project.color }"
      >
        <h2 class="text-2xl font-bold">Project goal</h2>
        <p class="mt-4 leading-7 text-[#2c2c2c]/68">{{ project.goal }}</p>
        <h3 class="mt-7 font-bold">Success criteria</h3>
        <p class="mt-2 leading-7 text-[#2c2c2c]/68">{{ project.successCriteria }}</p>
      </article>

      <aside class="border-2 border-dashed border-[#2c2c2c]/45 bg-[#fffef5] p-6">
        <h2 class="text-lg font-bold">Day 1 structure</h2>
        <p class="mt-3 text-sm leading-6 text-[#2c2c2c]/62">
          Progress, deliverables, materials, future tasks, and history will be connected in the
          Projects implementation stage.
        </p>
      </aside>
    </div>
  </section>

  <section v-else class="mx-auto max-w-2xl px-5 py-16 text-center">
    <h1 class="text-3xl font-bold">Project not found</h1>
    <RouterLink
      to="/projects"
      class="mt-6 inline-block underline decoration-wavy underline-offset-4"
    >
      Return to My Projects
    </RouterLink>
  </section>
</template>
