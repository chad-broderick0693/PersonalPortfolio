import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/polyrhythm-visualizer',
      name: 'polyrhythm-visualizer',
      component: () => import('@/views/PolyrhythmVisualizer.vue')
    }
  ]
})

export default router
