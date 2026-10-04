<script setup lang="ts">
import { ref } from 'vue'

import { usePlannerStore } from '@/stores/planner'

withDefaults(
  defineProps<{
    mobile?: boolean
  }>(),
  {
    mobile: false,
  },
)

const emit = defineEmits<{
  navigate: []
}>()

const plannerStore = usePlannerStore()
const projectsExpanded = ref(true)
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--mobile': mobile }">
    <RouterLink to="/today" class="sidebar__brand" @click="emit('navigate')">
      <span class="sidebar__logo" aria-hidden="true">✓</span>
      <span>
        <strong>Adaptive Planner</strong>
        <small>make room for real life</small>
      </span>
    </RouterLink>

    <nav class="sidebar__nav" aria-label="Main navigation">
      <RouterLink to="/today" class="sidebar__link" @click="emit('navigate')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
        </svg>
        <span>Today</span>
      </RouterLink>

      <RouterLink to="/week" class="sidebar__link" @click="emit('navigate')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4.5h14v15H5zM8 2.5v4M16 2.5v4M5 9h14" />
        </svg>
        <span>Weekly View</span>
      </RouterLink>

      <div class="sidebar__projects">
        <div class="sidebar__project-heading">
          <RouterLink to="/projects" class="sidebar__link min-w-0 flex-1" @click="emit('navigate')">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 6.5h6l2 2h9v11h-17z" />
            </svg>
            <span>My Projects</span>
          </RouterLink>
          <button
            type="button"
            class="sidebar__toggle"
            :aria-expanded="projectsExpanded"
            aria-label="Toggle project list"
            @click="projectsExpanded = !projectsExpanded"
          >
            <span :class="{ 'rotate-180': projectsExpanded }" aria-hidden="true">⌄</span>
          </button>
        </div>

        <ul v-if="projectsExpanded" class="sidebar__project-list">
          <li v-for="project in plannerStore.sortedProjects" :key="project.id">
            <RouterLink
              :to="`/projects/${project.id}`"
              class="sidebar__project-link"
              @click="emit('navigate')"
            >
              <span class="sidebar__project-dot" :style="{ backgroundColor: project.color }"></span>
              <span>{{ project.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <RouterLink to="/projects/new" class="sidebar__new-project" @click="emit('navigate')">
      <span aria-hidden="true">＋</span>
      <span>New Project</span>
    </RouterLink>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  padding: 1.5rem 1.1rem 1.25rem;
  border-right: 2px dashed rgb(44 44 44 / 45%);
  background: rgb(255 254 245 / 94%);
}

.sidebar--mobile {
  min-height: 100%;
  border-right: 0;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem;
}

.sidebar__brand strong,
.sidebar__brand small {
  display: block;
}

.sidebar__brand strong {
  font-size: 1rem;
  line-height: 1.1;
}

.sidebar__brand small {
  margin-top: 0.3rem;
  color: rgb(44 44 44 / 58%);
  font-size: 0.67rem;
}

.sidebar__logo {
  display: grid;
  width: 2.4rem;
  height: 2.4rem;
  flex: none;
  place-items: center;
  transform: rotate(-2deg);
  border: 2px dashed #2c2c2c;
  border-radius: 0.125rem;
  background: #ffd93d;
  box-shadow: 3px 3px 0 #4ecdc4;
  font-weight: 800;
}

.sidebar__nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 2.5rem;
}

.sidebar__link,
.sidebar__project-link,
.sidebar__new-project {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 2.75rem;
  border-radius: 0.125rem;
  font-weight: 700;
}

.sidebar__link {
  padding: 0.65rem 0.75rem;
  border-left: 4px solid transparent;
}

.sidebar__link svg {
  width: 1.15rem;
  height: 1.15rem;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sidebar__link:hover,
.sidebar__project-link:hover {
  background: rgb(255 217 61 / 18%);
}

.sidebar__link.router-link-active {
  border-left-color: #ff6b6b;
  background: linear-gradient(transparent 58%, rgb(255 217 61 / 58%) 58% 88%, transparent 88%);
}

.sidebar__project-heading {
  display: flex;
  align-items: center;
}

.sidebar__toggle {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  flex: none;
  place-items: center;
  border: 2px dashed transparent;
  border-radius: 0.125rem;
  font-size: 1.1rem;
}

.sidebar__toggle:hover,
.sidebar__toggle:focus-visible {
  border-color: #2c2c2c;
  outline: none;
}

.sidebar__toggle span {
  transition: transform 160ms ease;
}

.sidebar__project-list {
  margin: 0.25rem 0 0.65rem 1.5rem;
  padding-left: 0.75rem;
  border-left: 2px dashed rgb(44 44 44 / 25%);
  list-style: none;
}

.sidebar__project-link {
  min-height: 2.25rem;
  padding: 0.35rem 0.45rem;
  color: rgb(44 44 44 / 72%);
  font-size: 0.78rem;
}

.sidebar__project-link.router-link-active {
  color: #2c2c2c;
  text-decoration: underline wavy #4ecdc4 1.5px;
  text-underline-offset: 0.3rem;
}

.sidebar__project-dot {
  width: 0.65rem;
  height: 0.65rem;
  flex: none;
  border: 1.5px dashed #2c2c2c;
  border-radius: 50%;
}

.sidebar__new-project {
  justify-content: flex-start;
  padding: 0.7rem 0.8rem;
  border: 2px dashed #2c2c2c;
  background: #fffef5;
  box-shadow: 3px 3px 0 #4ecdc4;
}

.sidebar__new-project:hover {
  transform: rotate(-0.5deg);
  box-shadow: 4px 4px 0 #ff6b6b;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar__toggle span,
  .sidebar__new-project {
    transition: none;
    transform: none;
  }
}
</style>
