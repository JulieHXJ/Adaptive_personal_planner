export type ProjectType = 'learning' | 'execution'

export type Priority = 'urgent' | 'high' | 'medium' | 'low'
export type RiskStatus = 'on-track' | 'at-risk' | 'blocked'
export type ProjectStatus = 'active' | 'paused' | 'completed'
export type TaskStatus =
  'planned' | 'in-progress' | 'partially-completed' | 'done' | 'missed' | 'blocked' | 'cancelled'
export type PlanVersionStatus = 'active' | 'candidate' | 'rejected' | 'archived'
export type PlanningEventType =
  | 'material-added'
  | 'deliverable-added'
  | 'task-completed'
  | 'task-reopened'
  | 'task-partially-completed'
  | 'task-missed'
  | 'project-created'
  | 'deadline-changed'
  | 'project-priority-changed'
export type PlanChangeType = 'added' | 'removed' | 'rescheduled' | 'split'

export interface PlannerTask {
  id: string
  projectId: string
  title: string
  description: string
  effortMinutes: number
  priority: Priority
  status: TaskStatus
  scheduledDate: string | null
  dueAt: string | null
  dependencyIds: string[]
  sourceMaterialIds: string[]
  manualPin: boolean
  completedAt: string | null
  completionOrder: number | null
}

export interface Deliverable {
  id: string
  projectId: string
  title: string
  description: string
  dueAt: string | null
  completedAt: string | null
}

export interface Material {
  id: string
  projectId: string
  taskId: string | null
  name: string
  kind: 'file' | 'link' | 'text'
  source: string
  addedAt: string
}

export interface Project {
  id: string
  type: ProjectType
  name: string
  shortName: string
  color: string
  goal: string
  successCriteria: string | null
  priority: Priority
  risk: RiskStatus
  status: ProjectStatus
  targetDate: string | null
  plannedDurationWeeks: number | null
  weeklyCapacityMinutes: number | null
  deliverables: Deliverable[]
  tasks: PlannerTask[]
}

export interface PlanItem {
  id: string
  planVersionId: string
  taskId: string
  scheduledDate: string
  order: number
  dailyPriority: Priority
  reason: string
}

export interface PlanVersion {
  id: string
  status: PlanVersionStatus
  createdAt: string
  basedOnVersionId: string | null
  triggerEventId: string | null
  items: PlanItem[]
}

export interface PlanChange {
  id: string
  planVersionId: string
  type: PlanChangeType
  taskId: string | null
  before: string | null
  after: string | null
  reason: string
  affectedProjectIds: string[]
}

export interface PlanningEvent {
  id: string
  type: PlanningEventType
  projectId: string | null
  taskId: string | null
  createdAt: string
  payload: Record<string, unknown>
}

export interface CompletionEvidence {
  id: string
  taskId: string
  kind: 'self-confirmed' | 'note' | 'link' | 'file'
  value: string | null
  recordedAt: string
}

export interface NewTaskInput {
  projectId: string
  title: string
  description?: string
  effortMinutes?: number
  dueAt?: string | null
}
