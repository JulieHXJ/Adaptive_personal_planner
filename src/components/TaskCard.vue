<script setup lang="ts">
import { computed } from 'vue'

import type { PlannerTask } from '@/types/planner'

const props = defineProps<{
  task: PlannerTask
  projectColor: string
  compact?: boolean
}>()

defineEmits<{
  open: []
  toggle: []
}>()

const effortLabel = computed(() => {
  if (props.task.effortMinutes < 60) return `${props.task.effortMinutes} min`

  const hours = Math.floor(props.task.effortMinutes / 60)
  const minutes = props.task.effortMinutes % 60
  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`
})
</script>

<template>
  <article
    class="task-card relative rounded-sm border-2 border-dashed border-[#2c2c2c]/65 bg-[#fffef5]"
    :class="{ 'task-card--complete': task.status === 'done' }"
    :style="{ '--project-color': projectColor }"
  >
    <span class="task-card__tape" aria-hidden="true"></span>
    <button
      type="button"
      class="block w-full p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b6b]"
      :aria-label="task.status === 'done' ? `Restore ${task.title}` : `Complete ${task.title}`"
      :aria-pressed="task.status === 'done'"
      @click="$emit('toggle')"
    >
      <span
        class="block font-bold leading-5"
        :class="{ 'line-through opacity-45': task.status === 'done' }"
      >
        {{ task.title }}
      </span>
      <span v-if="!compact" class="mt-2 block text-xs text-[#2c2c2c]/60">
        Estimated: {{ effortLabel }}
      </span>
    </button>

    <button
      v-if="!compact"
      type="button"
      class="absolute bottom-2 right-2 grid size-7 place-items-center rounded-sm border-2 border-dashed border-[#2c2c2c]/45 bg-[#fffef5] text-xs font-bold text-[#2c2c2c]/60 hover:text-[#2c2c2c]"
      :aria-label="`Open ${task.title} details`"
      @click.stop="$emit('open')"
    >
      i
    </button>
  </article>
</template>

<style scoped>
.task-card {
  box-shadow: 4px 4px 0 var(--project-color);
  transition:
    transform 180ms ease,
    opacity 180ms ease,
    box-shadow 180ms ease;
}

.task-card:hover {
  transform: rotate(-0.35deg) translate(1px, 1px);
  box-shadow: 5px 5px 0 var(--project-color);
}

.task-card--complete {
  opacity: 0.5;
  box-shadow: 2px 2px 0 var(--project-color);
}

.task-card__tape {
  position: absolute;
  top: -0.55rem;
  left: 50%;
  width: 3.4rem;
  height: 1rem;
  transform: translateX(-50%) rotate(-1deg);
  background: color-mix(in srgb, var(--project-color) 45%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .task-card,
  .task-card:hover {
    transition: none;
    transform: none;
  }
}
</style>
