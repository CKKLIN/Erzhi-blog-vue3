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
    //面经内容表格
    {
        path: '/mianjingTableh5',
        meta: {
            title: '面经内容表格',
            keepAlive: true
        },
        component: () => import('@/h5/layout/main.vue'),
        // meta:{show:true},
        redirect: '/',
        children: [
            {
                path: '',
                component: () => import('@/h5/mainjing/content/tableIndex.vue')
            },
        ]
    },          //面经内容列表
    {
        path: '/mianjingListh5',
        meta: {
            title: '面经内容列表',
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
