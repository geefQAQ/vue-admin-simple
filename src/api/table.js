import request from '@/utils/request'

export function getList () {
    return request({
        url: '/table/list',
        method: 'get'
    })
}
export function getComplexList () {
    return request({
        url: '/table/complex',
        method: 'get'
    })
}
// export function getPv() {
//     return request({
//         url: '/table/pv',
//         methods: 'get'
//     })
// }
export function updateArticle (data) {
    return request({
        url: '/table/update',
        method: 'post',
        data
    })
}