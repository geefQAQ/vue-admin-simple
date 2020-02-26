import request from '@/utils/request'

export function transactionList () {
    return request({
        url: '/transaction/list',
        method: 'get',
    })
}

export function searchAuthor (name) {
    // 为什么有些不用{}，这里要，要搞清楚传的参数的类型，这里是字符串，要转换为对象
    return request({
        url: '/search/author',
        method: 'get',
        params: { name }
    })
}