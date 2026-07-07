import axios from 'axios'
import { useUserStore } from '../store';
let request = axios.create({
    timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = 'Bearer ' + token
    }
    return config
});

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // if (response.headers.authorization) {
        //     localStorage.setItem('token', response.headers.authorization)
        // }
        return response.data
    },
    (err) => {
        if (err.response?.status === 403) {
            localStorage.removeItem('token')
        }
        return Promise.reject(err)
    }
)

export default request


