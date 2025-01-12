import httpInstance from "@/utils/http";

// 用户注册
export function register(data) {
    return httpInstance({
        url: '/auth/register',
        method: 'post',
        data
    })
}

// 用户登录
export function login(data) {
    return httpInstance({
        url: '/auth/login',
        method: 'post',
        data
    })
}

// 获取用户登录状态
export function getLoginStatus(username) {
    return httpInstance({
        url: '/auth/status',
        method: 'post',
        data: {
            username: username
        }
    })
}