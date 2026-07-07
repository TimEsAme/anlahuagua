import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import { useUserStore } from "../store";
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Login
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
        if (to.path === '/login') {
            return true
        }
    } else {
        // 2. 有token，但是没有用户信息
        if (!userStore.userInfo.loginId) {
            try {
                await userStore.userInfo();
                return { ...to, replace: true };
            } catch (err) {
                // token失效
                userStore.token = '';
                localStorage.removeItem('token');
                return "/login";
            }
        } else {
            return true
        }
    }





    return true;
});

export default router;