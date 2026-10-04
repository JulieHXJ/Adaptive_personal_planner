<script setup lang="ts">
import type { Priority } from '@/types/planner'

defineProps<{
  priority: Priority
}>()

const labels: Record<Priority, string> = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}
</script>

<template>
  <span
    class="priority-label rounded-sm border-2 border-dashed border-[#2c2c2c] px-2 py-1 text-[0.7rem] font-bold"
    :class="`priority-label--${priority}`"
  >
    {{ labels[priority] }}
  </span>
</template>

<style scoped>
.priority-label--urgent {
  background: #ff6b6b;
}

.priority-label--high {
  background: #ffd93d;
}

.priority-label--medium {
  background: color-mix(in srgb, #4ecdc4 55%, #fffef5);
}

.priority-label--low {
  color: rgb(44 44 44 / 70%);
  background: #f8f7f0;
}
</style>
