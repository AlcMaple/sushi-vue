import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Auth from '@/views/Auth/index.vue'
import Layout from '@/views/Layout/index.vue'
import Payment from '@/views/Payment/index.vue'
import Detail from '@/views/Detail/index.vue'

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
        {
          // path: 'detail/:id',
          path: '/detail',
          name: 'detail',
          component: Detail,
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

router.beforeEach((to, from, next) => {
  localStorage.setItem('use-auth', true);
  console.log("localStroage token: ", localStorage.getItem('use-auth'));

  if (to.name === 'auth' && localStorage.getItem('use-auth')) {
    next('/')
  } else if (to.name !== 'auth' && !localStorage.getItem('use-auth')) {
    next('/auth')
  } else {
    next()
  }
})

export default router
