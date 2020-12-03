import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import common from "./part/common";

let components = []
let routes=components.concat(common)

let router = new Router({
    routes
})

//当路由进入前
router.beforeEach((to, from , next) => {
    next();
});

//当路由进入后
router.afterEach(() => {

})

export default router
