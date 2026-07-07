import { defineStore } from "pinia";
import { login, info } from "../service/login";
export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        userInfo: {},
    }),
    actions: {
        async userLogin(loginId, loginPwd) {
            const res = await login(loginId, loginPwd);
            if (res.code === 200) {
                localStorage.setItem('token', res.data)
                this.token = res.data
                return 'ok'
            }
            return Promise.reject(new Error(res.msg));

        },
        async userInfo() {
            const res = await info()
            this.userInfo = res.data
        }
    }
})