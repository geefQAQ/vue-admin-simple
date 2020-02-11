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
];
