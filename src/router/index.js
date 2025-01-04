import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Auth from '@/views/Auth/index.vue'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
  ],
})

export default router
