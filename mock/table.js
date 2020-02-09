import Mock from "mockjs";

const data = Mock.mock({
  "items|30": [
    {
      // id 相当于 身份证，是 mock 里的方法，前面带@
      id: "@id",
      // 相当于 5 到 10 个单词组成的句子
      title: "@sentence(5, 10)",
      //状态，3选1
      'status|1': ['published', 'draft', 'deleted'],
      // 中文名
      author: "@cname",
      // 可以带参数
      display_time: '@datetime("yyyy-mm-dd hh:mm:ss")',
      // 300 到 5000 之间的整数
      previews: "@integer(300, 5000)"
    }
  ],
  "complexTableItems|3": [
    {
      id: "@increment(1)",
      date: "@datetime()",
      // date: +Mock.Random.date('T'),
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
});

export default [
  {
    // 匹配的条件 
    url: "/table/list",
    type: "get",
    // 返回的数据模板
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  },
  // complex-table
  {
    url: "/table/complex",
    type: "get",
    response: () => {
      const items = data.complexTableItems;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // pv数据
  // {
  //   url: "/table/pv",
  //   type: "get",
  //   response: () => {
  //     return {
  //       code: 20000,
  //       pvData: [
  //         { key: 'PC', pv: 1000 },
  //         { key: 'Mobile', pv: 1000 },
  //         { key: 'IOS', pv: 1000 },
  //         { key: 'Android', pv: 1000 },
  //       ]
  //     }
  //   }
  // }
  
  // 更新文章
  {
    url: "/table/update",
    type: "post",
    response: () => {
      // const items = data.complexTableItems;
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
];
