import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/today',
    },
    {
      path: '/today',
      name: 'today',
      component: () => import('@/views/TodayView.vue'),
    },
    {
      path: '/week',
      name: 'week',
      component: () => import('@/views/WeekView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/projects/new',
      name: 'new-project',
      component: () => import('@/views/NewProjectView.vue'),
    },
    {
      path: '/projects/:projectId',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
      props: true,
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
