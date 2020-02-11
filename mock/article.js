import Mock from 'mockjs'

const data = Mock.mock({
    'items|10': [
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
            // console.log('config', config)
            const { title, importance, region } = config.query
            // console.log('article', title, importance)

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
            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: mockList
                }
            }
        }
    },
    // 更新文章
    {
        url: "/article/update",
        type: "post",
        response: () => {
          // const items = data.complexTableItems;
          return {
            code: 20000,
            data: 'success'
          }
        }
    },
]