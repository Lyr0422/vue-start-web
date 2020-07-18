/**
 * author: Lyr
 * createTime: 2020/7/17 10:15
 * desc: 公共路由
**/
export default [
    {
        path: '/app',
        component: resolve => require(['@/App.vue'], resolve),
        meta: {
            title:'员工管理系统'
        }
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: resolve => require(['~views/login/login.vue'], resolve),
    //     meta: {
    //
    //     }
    // }
]