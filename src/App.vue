<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

import AppSidebar from '@/components/AppSidebar.vue'

const mobileNavigationOpen = ref(false)

watch(mobileNavigationOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="app-shell min-h-screen bg-[#fffef5] text-[#2c2c2c]">
    <aside class="fixed inset-y-0 left-0 z-40 hidden w-[17rem] lg:block">
      <AppSidebar />
    </aside>

    <header
      class="sticky top-0 z-30 flex items-center justify-between border-b-2 border-dashed border-[#2c2c2c]/40 bg-[#fffef5]/95 px-4 py-3 backdrop-blur-sm lg:hidden"
    >
      <RouterLink to="/today" class="font-bold">Adaptive Planner</RouterLink>
      <button
        type="button"
        class="grid size-10 place-items-center rounded-sm border-2 border-dashed border-[#2c2c2c] bg-[#fffef5] text-xl font-bold shadow-[3px_3px_0px_#4ecdc4]"
        aria-controls="mobile-navigation"
        :aria-expanded="mobileNavigationOpen"
        aria-label="Open navigation"
        @click="mobileNavigationOpen = true"
      >
        ☰
      </button>
    </header>

    <div
      v-if="mobileNavigationOpen"
      class="fixed inset-0 z-50 bg-[#2c2c2c]/35 lg:hidden"
      role="presentation"
      @click.self="mobileNavigationOpen = false"
    >
      <div
        id="mobile-navigation"
        class="h-full w-[min(86vw,18rem)] border-r-2 border-dashed border-[#2c2c2c] bg-[#fffef5] shadow-[7px_0_0_#ffd93d]"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <button
          type="button"
          class="absolute left-[min(calc(86vw-2.8rem),15.2rem)] top-4 z-10 grid size-9 place-items-center border-2 border-dashed border-[#2c2c2c] bg-[#ffb4b4] font-bold"
          aria-label="Close navigation"
          @click="mobileNavigationOpen = false"
        >
          ×
        </button>
        <AppSidebar mobile @navigate="mobileNavigationOpen = false" />
      </div>
    </div>

    <main class="min-h-screen lg:ml-[17rem]">
      <RouterView />
    </main>
  </div>
</template>
