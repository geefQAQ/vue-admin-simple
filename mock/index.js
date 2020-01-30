import Mock from "mockjs";
import { param2Obj } from "../src/utils";
import user from "./user";
import table from "./table";
import search from "./remote-search";

// mock = [{}, {}, {}]
const mocks = [...user, ...table, ...search];

export function mockXHR() {
  function XHR2ExpressReqWrap(respond) {
    let result = null;
    // options 指向本次请求的 Ajax 选项集，包含url，type，body 这三个字段(只能记住了)
    // 说是根据 XMLHttpRequest 规范，但我不会找
    return function(options) {
        // respond可以为两种类型，具体看mock文档
      if (respond instanceof Function) {
        const { body, type, url } = options;
        // options={url: '/user/info', type:'GET', body: null}
        // 为什么要转换成这种格式？应该与 respond 的参数有关
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        });
      } else {
        // result 就是根据 token 返回的数据
        result = respond;
      }
      // 只有一个参数时，是template，那可以理解为，这里是返回一个template?
      return Mock.mock(result);
    };
  }

  for(const i of mocks) {
    // 注意，XHR2ExpressReqWrap 返回一个函数，这个函数才是mock的第三个参数
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}
