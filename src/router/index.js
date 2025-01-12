import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Auth from '@/views/Auth/index.vue'
import Layout from '@/views/Layout/index.vue'
import Payment from '@/views/Payment/index.vue'
import Detail from '@/views/Detail/index.vue'
import { getLoginStatus } from "@/apis/user";

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
          path: 'detail',
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

router.beforeEach(async (to, from, next) => {
  const user_name = localStorage.getItem('user_name');
  let isavailable = false;

  // 判断用户是否存在
  await getLoginStatus(user_name).then(res => {
    if (res.data.exists) {
      isavailable = true;
    }
  }).catch(err => {
    console.log(err);
  })

  if (to.name === 'auth' && isavailable) {
    next('/')
  } else if (to.name !== 'auth' && !isavailable) {
    next('/auth')
  } else {
    next()
  }
})

export default router
