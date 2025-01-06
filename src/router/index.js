import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Auth from '@/views/Auth/index.vue'
import Layout from '@/views/Layout/index.vue'
import Payment from '@/views/Payment/index.vue'

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
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
    }
  ],
})

export default router
