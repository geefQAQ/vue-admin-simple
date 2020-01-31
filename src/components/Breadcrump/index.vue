<template>
  <el-breadcrumb class="va-breadcrumb" separator="/">
    <!-- breadcrumb 样式在 transition.scss -->
    <transition-group name="breadcrumb">
      <!-- 注意：item 的 key 不能为index ，
      因为是index 的时候，如 table 换成 tree 时，index 没变，没有触发渲染，会没动画效果。
      因此改成 path 字段保证 item key 的唯一 -->
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <!-- 数组里最后一个元素是当前显示的，不需要是a标签 -->
          <span v-if="index == levelList.length - 1"  class="no-link">{{item.meta.title}}</span>
          <a v-else @click.prevent="handlClick(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrump',
  data: function () {
      return {
          levelList: null,
      }
  },
  watch: {
    // 监听url，变化时获取路由记录
    $route: function() {
      this.getBreadcrumb()
    }
  },
  created: function() {
      this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb: function() {
      /**
       https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7
       https://router.vuejs.org/zh/guide/advanced/meta.html
       $route.matched 当前路由及子路由的数组，
       如example/table，则返回[{path: 'example'}, {path:'table'}]
       *
       matched 的过滤条件是含有meta的路由记录   
       */ 
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0];
      // dashboard不是第一个元素，就插入为第一个元素
      if (!this.isDashboard(first)) {
        // 不用unshift 是因为返回的是数组长度
        matched = [{path: '/dashboard', meta: {title: 'Dashboard'}}].concat(matched)
      }
      this.levelList = matched
    },
    // 默认要dashboard为第一个面包屑
    isDashboard: function(route) {
      const name = route && route.name;
      if(!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() == 'Dashboard'.toLocaleLowerCase();
    },

    handlClick: function(route) {
      // vue-router 3.1.3 中， 如果从 /foo push 到 /foo 时，会弹出警告NavigationDuplicated
      const { redirect, path } = route;
      if(this.$route.path === redirect) {
        return
      } 
      if(redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.va-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  // margin-left: 8px;

  .no-link {
    color: #97a8be;
    cursor: text;
  }
}
</style>