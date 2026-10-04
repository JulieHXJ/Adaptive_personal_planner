<script setup lang="ts">
import type { RiskStatus } from '@/types/planner'

defineProps<{
  risk: RiskStatus
}>()

const labels: Record<RiskStatus, string> = {
  'on-track': 'On track',
  'at-risk': 'At risk',
  blocked: 'Blocked',
}
</script>

<template>
  <span class="risk-label" :class="`risk-label--${risk}`">
    <span aria-hidden="true"></span>
    {{ labels[risk] }}
  </span>
</template>

<style scoped>
.risk-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.45rem;
  border: 2px dashed rgb(44 44 44 / 55%);
  border-radius: 0.125rem;
  background: #fffef5;
  font-size: 0.7rem;
  font-weight: 700;
}

.risk-label span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
}

.risk-label--on-track span {
  background: #4ecdc4;
}

.risk-label--at-risk span {
  background: #ffd93d;
}

.risk-label--blocked span {
  background: #ff6b6b;
}
</style>
