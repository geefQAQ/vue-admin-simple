<template>
  <!-- el-scrollbar 官方没有提供文档 -->
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- el-menu 上的属性要作用在 el-menu-item 上 -->
    <!-- 如果值不是string，如boolean，变量名，要用v-bind -->
    <el-menu 
      :default-active="activeMenu"
      mode="vertical"
      :collapse="isCollapse"
      text-color="#bfcbd9"
      background-color="#304156"
      active-text-color="#409EFF"
      :unique-opened="false"
      :collapse-transition="false"
      class="va-sidebar-menu">
      <sidebar-item 
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
         />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  data: function() {
    return {
      path: ''
    }
  },
  // computed 当$router改变时才重新计算，methods是每次都会重新触发
  computed: {
    // sidebar随着url改变而获得激活对应的导航
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    },
    routes: function() {
      return this.$router.options.routes
    },
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse: function() {
      return !this.sidebar.opened
    }
  }
}
</script>