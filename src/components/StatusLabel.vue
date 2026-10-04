<script setup lang="ts">
import type { ProjectStatus, TaskStatus } from '@/types/planner'

type Status = ProjectStatus | TaskStatus

defineProps<{
  status: Status
}>()

const labels: Record<Status, string> = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  planned: 'Planned',
  'in-progress': 'In progress',
  'partially-completed': 'Partially complete',
  done: 'Done',
  missed: 'Missed',
  blocked: 'Blocked',
  cancelled: 'Cancelled',
}
</script>

<template>
  <span class="status-label" :class="`status-label--${status}`">
    <span aria-hidden="true"></span>
    {{ labels[status] }}
  </span>
</template>

<style scoped>
.status-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: rgb(44 44 44 / 72%);
  font-size: 0.7rem;
  font-weight: 700;
}

.status-label span {
  width: 0.55rem;
  height: 0.55rem;
  border: 1.5px dashed #2c2c2c;
  border-radius: 50%;
  background: #fffef5;
}

.status-label--active span,
.status-label--done span,
.status-label--completed span {
  background: #4ecdc4;
}

.status-label--in-progress span,
.status-label--partially-completed span {
  background: #ffd93d;
}

.status-label--missed span,
.status-label--blocked span {
  background: #ff6b6b;
}

.status-label--paused span,
.status-label--cancelled span {
  background: #c8c8c2;
}
</style>
