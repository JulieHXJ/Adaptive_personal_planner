import type { PlannerTask, Priority, Project, ProjectType, RiskStatus } from '@/types/planner'

function toDate(dayOffset: number) {
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() + dayOffset)
  return date.toISOString().slice(0, 10)
}

function task(
  projectId: string,
  id: string,
  title: string,
  dayOffset: number,
  effortMinutes: number,
  priority: Priority,
  description: string,
): PlannerTask {
  return {
    id,
    projectId,
    title,
    description,
    effortMinutes,
    priority,
    status: 'planned',
    scheduledDate: toDate(dayOffset),
    dueAt: null,
    dependencyIds: [],
    sourceMaterialIds: [],
    manualPin: false,
    completedAt: null,
    completionOrder: null,
  }
}

interface ProjectSeed {
  id: string
  type: ProjectType
  name: string
  shortName: string
  color: string
  goal: string
  successCriteria: string
  priority: Priority
  risk: RiskStatus
  targetOffset: number | null
  plannedDurationWeeks: number | null
  weeklyCapacityMinutes: number
  tasks: PlannerTask[]
}

function project(seed: ProjectSeed): Project {
  const { targetOffset, ...projectSeed } = seed

  return {
    ...projectSeed,
    status: 'active',
    targetDate: targetOffset === null ? null : toDate(targetOffset),
    deliverables: [],
  }
}

export const mockProjects: Project[] = [
  project({
    id: 'statistics',
    type: 'learning',
    name: 'Statistics',
    shortName: 'STAT',
    color: '#ff6b6b',
    goal: 'Prepare confidently for the final statistics exam.',
    successCriteria: 'Complete the syllabus review, exercise sets, and one timed mock exam.',
    priority: 'urgent',
    risk: 'at-risk',
    targetOffset: 28,
    plannedDurationWeeks: null,
    weeklyCapacityMinutes: 360,
    tasks: [
      task(
        'statistics',
        'statistics-distributions',
        'Review distributions',
        0,
        45,
        'urgent',
        'Summarise normal, binomial, and Poisson distributions.',
      ),
      task(
        'statistics',
        'statistics-exercises',
        'Complete distribution exercises',
        0,
        45,
        'high',
        'Complete the assigned questions and flag uncertain answers.',
      ),
      task(
        'statistics',
        'statistics-hypothesis',
        'Review hypothesis testing',
        2,
        75,
        'high',
        'Work through one- and two-sided testing examples.',
      ),
    ],
  }),
  project({
    id: 'programming-es',
    type: 'learning',
    name: 'Programming ES',
    shortName: 'PES',
    color: '#4ecdc4',
    goal: 'Keep pace with weekly coursework and build reliable programming habits.',
    successCriteria: 'Finish weekly exercises and document open questions before each class.',
    priority: 'high',
    risk: 'on-track',
    targetOffset: 35,
    plannedDurationWeeks: null,
    weeklyCapacityMinutes: 300,
    tasks: [
      task(
        'programming-es',
        'pes-read-chapter',
        'Read language chapter',
        0,
        45,
        'high',
        'Annotate the key language concepts and open questions.',
      ),
      task(
        'programming-es',
        'pes-parser',
        'Refactor parser exercise',
        1,
        90,
        'high',
        'Split parsing, validation, and error reporting responsibilities.',
      ),
    ],
  }),
  project({
    id: 'music-analysis-tool',
    type: 'execution',
    name: 'Music Analysis Tool',
    shortName: 'MAT',
    color: '#ffd93d',
    goal: 'Build and evaluate a rule-based MIDI analysis baseline.',
    successCriteria: 'Generate stable per-window features and document baseline limitations.',
    priority: 'medium',
    risk: 'on-track',
    targetOffset: null,
    plannedDurationWeeks: 8,
    weeklyCapacityMinutes: 300,
    tasks: [
      task(
        'music-analysis-tool',
        'mat-histogram',
        'Add pitch histogram',
        1,
        60,
        'medium',
        'Calculate a pitch-class histogram for every harmonic window.',
      ),
      task(
        'music-analysis-tool',
        'mat-density',
        'Add note density features',
        3,
        60,
        'medium',
        'Add note_count and note_density to every harmonic window.',
      ),
    ],
  }),
  project({
    id: 'mir-application',
    type: 'execution',
    name: 'MIR Application',
    shortName: 'MIR',
    color: '#9b8afb',
    goal: 'Prepare strong applications for selected MIR master programmes.',
    successCriteria:
      'Submit a coherent portfolio, CV, motivation letter, and supporting documents.',
    priority: 'high',
    risk: 'at-risk',
    targetOffset: 120,
    plannedDurationWeeks: 16,
    weeklyCapacityMinutes: 180,
    tasks: [
      task(
        'mir-application',
        'mir-shortlist',
        'Confirm programme shortlist',
        2,
        45,
        'high',
        'Compare UPF and QMUL application requirements.',
      ),
      task(
        'mir-application',
        'mir-portfolio',
        'Collect portfolio evidence',
        5,
        60,
        'medium',
        'Select evidence from the MIDI tool and music AI evaluation report.',
      ),
    ],
  }),
]
