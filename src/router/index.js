import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Auth from '@/views/Auth/index.vue'
import Layout from '@/views/Layout/index.vue'
import Payment from '@/views/Payment/index.vue'
import Detail from '@/views/Detail/index.vue'
import User from '@/views/User/index.vue'
import { getLoginStatus } from "@/apis/user";

// 管理系统组件导入
import AdminLogin from '@/views/AdminSystem/AdminLogin.vue'
import AdminLayout from '@/views/AdminSystem/AdminLayout.vue'
import AdminHome from '@/views/AdminSystem/AdminHome.vue'
// import UserManage from '@/views/AdminSystem/UserManage.vue'
// import SushiManage from '@/views/AdminSystem/SushiManage.vue'
// import CommentManage from '@/views/AdminSystem/CommentManage.vue'

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
        {
          path: 'user',
          name: 'user',
          component: User,
        }
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
    },
    // 管理端路由
    {
      path: '/admin-login',
      name: 'adminLogin',
      component: AdminLogin,
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'adminHome',
          component: AdminHome,
        },
        // {
        //   path: 'users',
        //   name: 'userManage',
        //   component: UserManage,
        // },
        // {
        //   path: 'sushi',
        //   name: 'sushiManage',
        //   component: SushiManage,
        // },
        // {
        //   path: 'comments',
        //   name: 'commentManage',
        //   component: CommentManage,
        // }
      ],
      beforeEnter: (to, from, next) => {
        const adminName = localStorage.getItem('admin_name');
        if (!adminName) {
          next('/admin-login');
        } else {
          next();
        }
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/admin') || to.path === '/admin-login') {
    next();
    return;
  }

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