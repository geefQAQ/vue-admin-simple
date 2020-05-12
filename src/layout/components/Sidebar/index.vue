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
        v-for="route in permission_routes"
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
    // activeMenu应用的一个例子是编辑文章(article/edit)，修改文章而出现新的页面时，会找不到path，sidebar会失去高亮的选项，这时就需要给一个属性来指定path
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if(meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    routes: function() {
      // 只有静态路由，不能查看addRoutes添加后的完整路由，也没有官方api
      // return this.$router.options.routes
      return this.$router
    },
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    isCollapse: function() {
      return !this.sidebar.opened
    }
  }
}
</script>