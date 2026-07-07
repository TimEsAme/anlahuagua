import request from "./request";

export function login(loginId, loginPwd) {
    return request.post('api/admin/login', { loginId, loginPwd })
}

export function loginOut() {
    localStorage.removeItem('token')
}

export function info() {
    return request.get('api/admin/info')
}