import request from '@/utils/request'

export function getComplexList (query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query // axios 接收参数要用params，这里接收的参数是filterData
    })
}
export function updateArticle (data) {
    return request({
        url: '/article/update',
        method: 'post',
        data
    })
}
export function createArticle (data) {
    return request ({
        url: 'article/create',
        method: 'post',
        data
    })
}
export function fetchArticle (id) {
    return request({
        url: 'article/detail',
        method: 'get',
        params: { id }
    })
}