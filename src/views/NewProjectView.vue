<script setup lang="ts">
const projectTypes = [
  {
    id: 'learning',
    title: 'Study Plan',
    description: 'Plan backwards from a real deadline such as an exam or assignment.',
    detail: 'Required input: expected DDL',
    color: '#ff6b6b',
  },
  {
    id: 'execution',
    title: 'Personal Project',
    description: 'Turn a multi-week or multi-month outcome into milestones and tasks.',
    detail: 'Required input: expected project duration',
    color: '#4ecdc4',
  },
]
</script>

<template>
  <section class="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
    <header>
      <RouterLink
        to="/projects"
        class="text-sm font-bold underline decoration-wavy underline-offset-4"
      >
        ← My Projects
      </RouterLink>
      <p
        class="mt-7 inline-block -rotate-1 border-b-2 border-dashed border-[#4ecdc4] text-sm font-bold tracking-[0.12em] text-[#2c2c2c]/65"
      >
        START WITH THE RIGHT CONSTRAINT
      </p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">New Project</h1>
      <p class="mt-3 max-w-2xl leading-7 text-[#2c2c2c]/62">
        Choose the planning mode first. The next form will ask only for inputs that fit that mode.
      </p>
    </header>

    <div class="mt-10 grid gap-7 md:grid-cols-2">
      <button
        v-for="(type, index) in projectTypes"
        :key="type.id"
        type="button"
        class="project-type-card relative min-h-64 border-2 border-dashed border-[#2c2c2c]/65 bg-[#fffef5] p-7 text-left"
        :class="index === 0 ? '-rotate-[0.35deg]' : 'rotate-[0.35deg]'"
        :style="{ '--type-color': type.color }"
      >
        <span class="project-type-card__tape" aria-hidden="true"></span>
        <span class="text-xs font-bold tracking-[0.15em] text-[#2c2c2c]/50">
          {{ type.id.toUpperCase() }}
        </span>
        <span class="mt-4 block text-3xl font-bold">{{ type.title }}</span>
        <span class="mt-4 block leading-7 text-[#2c2c2c]/65">{{ type.description }}</span>
        <span
          class="mt-7 inline-block border-b-2 border-dashed border-[#2c2c2c]/35 pb-1 text-sm font-bold"
        >
          {{ type.detail }}
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.project-type-card {
  box-shadow: 6px 6px 0 var(--type-color);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.project-type-card:hover {
  transform: rotate(0) translate(1px, 1px);
  box-shadow: 8px 8px 0 var(--type-color);
}

.project-type-card__tape {
  position: absolute;
  top: -0.7rem;
  left: 50%;
  width: 4.8rem;
  height: 1.25rem;
  transform: translateX(-50%) rotate(-1deg);
  background: color-mix(in srgb, var(--type-color) 45%, transparent);
}
</style>
