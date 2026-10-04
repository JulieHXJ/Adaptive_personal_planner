<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  completed: number
  total: number
  color: string
}>()

const percentage = computed(() =>
  props.total === 0 ? 0 : Math.round((props.completed / props.total) * 100),
)
</script>

<template>
  <div class="min-w-0">
    <div class="mb-1 flex items-center justify-between gap-3 text-xs font-bold">
      <span>Progress</span>
      <span>{{ completed }}/{{ total }}</span>
    </div>
    <div
      class="h-3 overflow-hidden rounded-sm border-2 border-dashed border-[#2c2c2c] bg-[#fffef5]"
      role="progressbar"
      :aria-valuenow="completed"
      aria-valuemin="0"
      :aria-valuemax="total"
      :aria-label="`${completed} of ${total} tasks completed`"
    >
      <div
        class="h-full transition-[width] duration-200 ease-in-out"
        :style="{ width: `${percentage}%`, backgroundColor: color }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  div {
    transition: none;
  }
}
</style>
