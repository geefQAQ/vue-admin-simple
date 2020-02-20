import Mock from 'mockjs'
const data = []
const count = 100
// 怎样才能刷新后还能保持之前的数据不变？是vue的设置还是mock的设置
for(let i = 0; i < count; i++) {
    data.push(Mock.mock({
        id: "@increment(1)",
        // 找了好久终于知道怎样生成随机时间戳了。。。
        date: "@datetime('T')",
        title: "@csentence(7, 17)",
        author: "@cname",
        imp: "@integer(1,3)",
        readings: [
          { key: 'PC', pv: "@integer(100, 5000)" },
          { key: 'IOS', pv: "@integer(100, 3000)" },
          { key: 'Android', pv: "@integer(100, 4000)" }
        ],
        'status|1': ['发布', '草稿', '删除'],
        'region|1': ['中国', '美洲', '欧洲', '日本']
    }))
}
// const data = Mock.mock({
//     'items|100': [
//         {
//             id: "@increment(1)",
//             // 找了好久终于知道怎样生成随机时间戳了。。。
//             date: "@datetime('T')",
//             title: "@sentence(2, 7)",
//             author: "@cname",
//             imp: "@integer(1,3)",
//             readings: [
//               { key: 'PC', pv: "@integer(100, 5000)" },
//               { key: 'IOS', pv: "@integer(100, 3000)" },
//               { key: 'Android', pv: "@integer(100, 4000)" }
//             ],
//             'status|1': ['发布', '草稿', '删除'],
//             'region|1': ['中国', '美洲', '欧洲', '日本']
//         }
//     ]
// })
export default [
    // complex-table
    {
        url: "/article/list",
        type: "get",
        response: config => {
            // 很奇怪，如果sort = '+id'，在这里会自动替换成' id'，原因不明
            // 定义分页参数的默认值，第1页，每页20条
            // 通过api中的参数，获取到filterData
            const { title, importance, region, sort, currentPage = 1, pageSize = 20 } = config.query

            // filter，筛选掉不符合要求的项
            // 1、filter不会改变原数组，要赋值给新数组
            // 2、filter中用if筛选，然后要return true,就能给符合条件的都通过筛选
            let mockList = data.filter(item => {
                // 筛选imp
                if(importance && item.imp !== +importance) return false
                // 过滤title
                if(title && item.title.indexOf(title) < 0) return false
                // 过滤region
                if(region && item.region !== region) return false
                return true
            })
            
            if(sort === 'descending') {
                mockList = mockList.reverse()
            }
            // 分页数据
            const startIndex = (currentPage - 1 )* pageSize
            const endIndex = currentPage * pageSize
            // slice(start, end)截取数组，包括start，不包括end，不改变原数组
            // 这里需要一点计算，如果第二页(每页10条)，那么要截取的数组是从11开始，到20，所以start应该为10(从0开始，也就是从10开始)，end为20(到19条结束)，根据参数调整为这两个数就可以
            let pageList = mockList.slice(startIndex, endIndex)
            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },
    // 更新文章
    {
        url: "/article/update",
        type: "post",
        response: () => {
          return {
            code: 20000,
            data: '编辑成功'
          }
        }
    },
    // 创建文章
    {
        url: "/article/create",
        type: "post",
        response: () => {
            return {
                code: 20000,
                data: '创建成功'
            }
        }
    }
]