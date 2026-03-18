import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // test
    {
      path: '/test',
      name: 'testView',
      component: () => import('@/views/testView/testView.vue'),
    },
    // auth
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/index.vue'),
    },
    // layout
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/Index.vue'),
    },
  ],
})

export default router
