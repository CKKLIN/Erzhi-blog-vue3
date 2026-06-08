import { createRouter, createWebHashHistory } from 'vue-router'
import h5 from './h5'

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    //首页
    {
      path: '/home',
      meta: {
        title: '首页',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/home/index.vue')
        },
      ]
    },
    //留言
    {
      path: '/note',
      meta: {
        title: '留言',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/note/index.vue')
        },
      ]
    },
    //论坛
    {
      path: '/chat',
      meta: {
        title: '论坛',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/chat/index.vue')
        },
      ]
    },
    //资源
    {
      path: '/resources',
      meta: {
        title: '资源',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/resources/index.vue')
        },
      ]
    },
    //摄影
    {
      path: '/picture',
      meta: {
        title: '摄影',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/picture/index.vue')
        },
      ]
    },
    
    //书单
    {
      path: '/book',
      meta: {
        title: '书单',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/book/index.vue')
        },
      ]
    },
        //主页
    {
      path: '/my',
      meta: {
        title: '主页',
        keepAlive: true
      },
      component: () => import('@/layout/home.vue'),
      // meta:{show:true},
      redirect: '/',
      children: [
        {
          path: '',
          component: () => import('@/views/my/index.vue')
        },
      ]
    },
    ...h5
  ],
})

// h5 页面路径列表
const h5Paths = h5.map(route => route.path)

// 移动端自动跳转到面经页面
router.beforeEach((to, _from, next) => {
  if (isMobileDevice() && !h5Paths.includes(to.path)) {
    next('/mianJingh5')
  } else {
    next()
  }
})

export default router
