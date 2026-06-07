export default [

    //面经
    {
        path: '/mianJingh5',
        meta: {
            title: '面经',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/mainjing/index.vue')
            },
        ]
    }, 
      //主页
    {
        path: '/myh5',
        meta: {
            title: '我的',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/my/index.vue')
            },
        ]
    },  //主页
    {
        path: '/myh52',
        meta: {
            title: '我的',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/my/index.vue')
            },
        ]
    },  //主页
    {
        path: '/myh51',
        meta: {
            title: '我的',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/my/index.vue')
            },
        ]
    },
]