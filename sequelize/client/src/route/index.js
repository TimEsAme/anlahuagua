import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store";
const routes = [
    {
        path: "/",
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: "/login",
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: "/ash",
        name: 'ash',
        component: () => import('../components/Ash.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});



router.beforeEach(async (to) => {
    const userStore = useUserStore();
    // 1. 没token
    if (!userStore.token) {
        if (to.path === '/login' || to.path === '/') {
            return true
        }
        return '/login'
    } else {
        if (to.path === '/login') {
            return '/';
        }

        // 2. 有token，但是没有用户信息
        if (!userStore.userInfo.loginId) {
            try {
                await userStore.getUserInfo();
                return true
            } catch (err) {
                // token失效
                userStore.token = '';
                userStore.userInfo = {};
                localStorage.removeItem('token');
                return "/login";
            }
        } else {
            return true
        }
    }
});

export default router;