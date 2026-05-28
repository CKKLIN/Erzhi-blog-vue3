import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        path:'/home',
        meta:{
          title:'首页',
          keepAlive: true
        },
        component:()=>import('@/layout/home.vue'),
        // meta:{show:true},
        redirect:'/',
        children:[          
          {
          path:'',
          component:()=>import('@/views/home/index.vue')
        },
      ]
      },
            //留言
      {
        path:'/note',
        meta:{
          title:'留言',
          keepAlive: true
        },
        component:()=>import('@/layout/home.vue'),
        // meta:{show:true},
        redirect:'/',
        children:[          
          {
          path:'',
          component:()=>import('@/views/note/index.vue')
        },
      ]
      },
            //论坛
      {
        path:'/chat',
        meta:{
          title:'论坛',
          keepAlive: true
        },
        component:()=>import('@/layout/home.vue'),
        // meta:{show:true},
        redirect:'/',
        children:[          
          {
          path:'',
          component:()=>import('@/views/chat/index.vue')
        },
      ]
      },
  ],
})

export default router
