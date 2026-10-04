<script setup lang="ts">
defineProps<{
  name: string
  shortName: string
  color: string
}>()
</script>

<template>
  <span
    class="project-badge inline-flex items-center gap-2 rounded-sm border-2 border-dashed border-[#2c2c2c] px-2.5 py-1.5 text-xs font-bold"
    :style="{ '--project-color': color }"
  >
    <span class="project-badge__dot" aria-hidden="true"></span>
    <span class="hidden sm:inline">{{ name }}</span>
    <span class="sm:hidden">{{ shortName }}</span>
  </span>
</template>

<style scoped>
.project-badge {
  background: color-mix(in srgb, var(--project-color) 34%, #fffef5);
  box-shadow: 2px 2px 0 var(--project-color);
}

.project-badge__dot {
  width: 0.7rem;
  height: 0.7rem;
  flex: none;
  border: 1.5px dashed #2c2c2c;
  border-radius: 50%;
  background: var(--project-color);
}
</style>
