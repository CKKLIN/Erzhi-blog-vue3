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
    },
    //面经内容详情
    {
        path: '/mianjingContenth5/:id',
        meta: {
            title: '面经内容',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        children: [
            {
                path: '',
                component: () => import('@/h5/mainjing/content/contentIndex.vue'),
                props: true
            },
        ]
    },          //面经内容列表
    {
        path: '/mianjingListh5',
        meta: {
            title: '面经列表',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/mainjing/content/listIndex.vue')
            },
        ]
    },
]
