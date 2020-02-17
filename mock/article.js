import Mock from 'mockjs'

const data = Mock.mock({
    'items|30': [
        {
            id: "@increment(1)",
            // 找了好久终于知道怎样生成随机时间戳了。。。
            date: "@datetime('T')",
            title: "@sentence(2, 7)",
            author: "@cname",
            imp: "@integer(1,3)",
            readings: [
              { key: 'PC', pv: "@integer(100, 5000)" },
              { key: 'IOS', pv: "@integer(100, 3000)" },
              { key: 'Android', pv: "@integer(100, 4000)" }
            ],
            'status|1': ['发布', '草稿', '删除'],
            'region|1': ['中国', '美洲', '欧洲', '日本']
        }
    ]
})
export default [
    // complex-table
    {
        url: "/article/list",
        type: "get",
        response: config => {
            // 很奇怪，如果sort = '+id'，在这里会自动替换成' id'，原因不明
            // 定义分页参数的默认值，第1页，每页20条
            const { title, importance, region, sort, currentPage = 1, pageSize = 20 } = config.query

            // filter，筛选掉不符合要求的项
            // 1、filter不会改变原数组，要赋值给新数组
            // 2、filter中用if筛选，然后要return true,就能给符合条件的都通过筛选
            let mockList = data.items.filter(item => {
                // 筛选imp
                if(importance && item.imp !== +importance) return false
                // 过滤title
                if(title && item.title.indexOf(title) < 0) return false
                // 过滤region
                if(region && item.region !== region) return false
                return true
            })
            
            if(sort === 'des_id') {
                mockList = mockList.reverse()
            }
            // 分页数据
            const startIndex = (currentPage - 1 )* pageSize
            const endIndex = currentPage * pageSize
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
            data: 'success'
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
                data: 'success'
            }
        }
    }
]