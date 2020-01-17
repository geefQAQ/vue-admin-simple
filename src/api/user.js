import request from '@/utils/request'

// `data` 是作为请求主体被发送的数据
// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// `params` 是即将与请求一起发送的 URL 参数
export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}