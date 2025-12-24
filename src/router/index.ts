import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: () => import('@/views/mainView/mainView.vue'),
    },
    {
      path: '/test',
      name: 'testView',
      component: () => import('@/views/testView/testView.vue'),
    },
  ],
})

export default router
