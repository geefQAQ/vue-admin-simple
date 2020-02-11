import request from '@/utils/request'

export function getComplexList (query) {
    // console.log('query', query)
    return request({
        url: '/article/list',
        method: 'get',
        // axios 接收参数要用params
        params: query
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
        url: '/article/update',
        method: 'post',
        data
    })
}