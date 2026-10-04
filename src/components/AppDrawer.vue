<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

window.addEventListener('keydown', handleKeydown)

onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[70] bg-[#2c2c2c]/40"
      role="presentation"
      @click.self="$emit('close')"
    >
      <aside
        class="drawer-panel absolute inset-y-0 right-0 w-full max-w-md border-l-2 border-dashed border-[#2c2c2c] bg-[#fffef5] p-5 shadow-[-7px_0_0px_#ffd93d] sm:p-7"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div
          class="flex items-start justify-between gap-4 border-b-2 border-dashed border-[#2c2c2c]/35 pb-4"
        >
          <h2 class="text-2xl font-bold">{{ title }}</h2>
          <button
            type="button"
            class="grid size-9 place-items-center rounded-sm border-2 border-dashed border-[#2c2c2c] bg-[#ffd93d] font-sans font-semibold transition-all duration-200 ease-in-out hover:-rotate-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            aria-label="Close drawer"
            @click="$emit('close')"
          >
            ×
          </button>
        </div>
        <div class="pt-5">
          <slot></slot>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.drawer-panel {
  animation: slide-in 180ms steps(3, end);
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .drawer-panel {
    animation: none;
  }
}
</style>
