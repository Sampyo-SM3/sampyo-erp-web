import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import MainPage from '@/components/MainPage.vue'
import DynamicComponentLoader from '@/components/DynamicComponentLoader.vue'

// CA 메뉴 라우터 import
import caRoutes from './CA/router.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage,
    redirect: '/views/CA/CA1000_10', // 여기 추가!!
    children: [
      {asd
        path: '/views/:folder/:file',
        name: 'DynamicComponent',
        component: DynamicComponentLoader
      },
      // CA 라우터 모듈 추가
      ...caRoutes      
    ]
  }// tset
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
