<template>
  <!-- 外层根据hidden字段判断 -->
  <div v-if="!item.hidden">
    <!-- 内层根据children长度判断 -->
    <!-- 第一种情况：子路由长度 <= 1 -->
    <template v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </router-link>
    </template>

    <!-- 第二种情况：子路由长度 > 1，则递归组件，直到子路由长度 <= 1 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <!-- 注意ui组件的结构，要符合结构才能起效，这个slot就是组件里的用法，原理暂不清楚-->
      <template slot="title">
        <!-- 父元素 slot 配合子元素 v-if，有item.meta才有这个元素 -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- class="nest-menu" 是要来给样式定位的-_-!，参考Menu1背景颜色-->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import Item from "./Item";

export default {
  name: "SidebarItem",
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    // children=[]，默认参数，就算没有children，也让它整一个children
    hasOneShowingChild: function(children = [], parent) {
      // 默认参数
      // children长度为1时
      if (children.length === 1) {
        // 当该路由只有一个子路由时，显示子元素，譬如form，会重定向到form/index，显示的内容是index，不是该item
        // 所有的显示内容都根据onlyOneChild
        this.onlyOneChild = children[0];
        return true;
      }
      // children长度为0时，显示该item
      // 组件是递归，当子路由没有children时，就显示自己
      if (children.length === 0) {
        // path: '' 覆盖的原因是，结合后仍然为item的path，相当于没有结合（resolve）
        // 如果不覆盖的话，假如当前item的path是'menu1-2-1'，resolve后变成'/nested..../menu1-2-1/menu1-2-1
        this.onlyOneChild = { ...parent, path: "" };
        return true;
      }
    },
    resolvePath: function(routePath) {
      /**
       * example 为例，匹配到v-else
       * 此时 basepath 是 /example
       * 递归，child 的 path 为 table，所以 table 的 resultPath 为 /example/table
       */
      // 两个问题：1，为什么路由结构的children的path没有'/'
      // 2，为什么basePath要作为独立的属性，item里面不是已经包括了path吗
      // 答案1：http://nodejs.cn/api/path.html#path_path_resolve_paths
      // 根据resovle的用法，搞明白为什么路由表的结构中，children的path是'index'不带'/'
      // 答案2：form作为例子，第一次获取到的item确实有path，为'/form'
      // 但是form有children，path为'index'，如果直接传item，那么path就为'index'，要找到该item的上一级的path，再resolve才能得出'/form/index'
      // 所以，就干脆作为一个独立的属性，先处理再传递
      // 再观察路由结构，children里的除了path是需要与父路径（base-path）结合（to属性需要整个路径），其他都不需要作为额外的属性传递
      // 使用$route.fullPath可以返回完整路径，这是route的方法，我定义的路由表中并没有fullPath属性，而且官网的嵌套路由就是这样的规范
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>