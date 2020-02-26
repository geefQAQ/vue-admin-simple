import Mock from 'mockjs'
const count = 50
let mockNameList = []
for(let i = 0; i < count; i++) {
    mockNameList.push(
        Mock.mock({
            name: '@first'
        })
    )
}
export default [
    {
        url: '/transaction/list',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                'data|20': [{
                    // https://zh.wikipedia.org/wiki/%E5%85%A8%E5%B1%80%E5%94%AF%E4%B8%80%E6%A0%87%E8%AF%86%E7%AC%A6
                    // 唯一标识，通常表示成32个16进制数字
                    order_no: '@guid()',
                    username: '@name()',
                    // min, max, dmin, dmax, d: 小数位位数
                    price: '@float(1000, 15000, 0, 2)',
                    'status|1' : ['success', 'pending']
                }]
            }
        }
    },
    // 搜索作者
    {
        url: '/search/author',
        type: 'get',
        response: config => {
            const { name } = config.query
            const nameList = mockNameList.filter(i => {
                return i.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
            })
            return {
                code: 20000,
                data: {
                    items: nameList
                }
            }
        }
    }
]