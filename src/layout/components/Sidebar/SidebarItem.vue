<template>
  <!-- 外层根据hidden字段判断 -->
  <div v-if="!item.hidden">
    <!-- 内层根据children长度判断 -->
    <!-- 第一种情况：子路由长度 <= 1 -->
    <template v-if="hasOneShowingChild(item.children, item)">
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
    hasOneShowingChild: function(children = [], parent) {
      // 默认参数
      // children长度为1时
      if (children.length === 1) {
        // 当该路由只有一个子路由时，譬如form，会重定向到form/index，显示的内容是index
        this.onlyOneChild = children[0];
        return true;
      }
      // children长度为0时，显示该item
      // 组件是递归，当子路由没有children时，就显示自己
      if (children.length === 0) {
        // path: '' 覆盖的原因是，点击路由时不跳转
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
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>