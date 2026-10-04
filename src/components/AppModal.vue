<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open) emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

window.addEventListener('keydown', handleKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[70] grid place-items-center bg-[#2c2c2c]/45 p-4"
      role="presentation"
      @click.self="$emit('close')"
    >
      <section
        class="relative w-full max-w-lg -rotate-[0.4deg] rounded-sm border-2 border-dashed border-[#2c2c2c] bg-[#fffef5] p-5 shadow-[7px_7px_0px_#4ecdc4] sm:p-7"
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
            class="grid size-9 place-items-center rounded-sm border-2 border-dashed border-[#2c2c2c] bg-[#ff6b6b] font-sans font-semibold transition-all duration-200 ease-in-out hover:rotate-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            aria-label="Close modal"
            @click="$emit('close')"
          >
            ×
          </button>
        </div>
        <div class="pt-5">
          <slot></slot>
        </div>
      </section>
    </div>
  </Teleport>
</template>
