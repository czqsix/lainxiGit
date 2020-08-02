import Vue from 'vue'
import cookie from 'js-cookie'
import NProgress from 'nprogress'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: () => import('~v/Layout'),
            children: [
                {
                    path: "",
                    component: () => import('~v/Home')
                },
                {
                    path: "shiting",
                    component: () => import('~v/User/ShiTing')
                },
                {
                    path: "jiangshi",
                    component: () => import('~v/User/JiangShi')
                },
                {
                    path: "menu",
                    component: () => import('~v/Content/Menu')
                },
                {
                    path: "course",
                    component: () => import('~v/Content/Course')
                },
                {
                    path: "article",
                    component: () => import('~v/Content/Article')
                },
                {
                    path: "friendlylink",
                    component: () => import('~v/Site/FriendlyLink')
                },
                {
                    path: "siteinfo",
                    component: () => import('~v/Site/SiteInfo')
                }
            ]
        },
        {
            path: "/login",
            component: () => import('~v/Login')
        },

    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path !== '/login') {
        //需要判断登录
        if (!cookie.get('loginuser')) {
            return next('/login')
        }
    }
    setTimeout(() => {
        next()
    }, 500);
})


router.afterEach(() => {
    NProgress.done();
})

export default router