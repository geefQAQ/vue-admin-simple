<template>
<!-- classObj 是通过 vuex 控制，如sidebar 宽度 -->
  <div :class="classObj" class="va-app-wrapper">
    <!-- 添加mobile端遮罩层，在sidebar出现时出现，添加点击事件控制sidebar是否显示 -->
    <div  v-if="device==='mobile' && sidebar.opened" class="va-drawer-bg" @click="handleClickDrawer"></div>
    <sidebar class="va-sidebar-container"></sidebar>
    <div :class="{'hasTagsView': needTagsView}" class="va-main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import AppMain from './components/AppMain';
import Sidebar from './components/Sidebar';
import TagsView from './components/TagsView';
import RightPanel from '@/components/RightPanel';
import Settings from './components/Settings';
import ResizeMixin from './mixin/ResizeHanlder'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar,
    TagsView,
    RightPanel,
    Settings
  },
  mixins: [ResizeMixin],
  data: function() {
    return {
      test: this.$store.state.app
    }
  },
  computed: {
    // computed的值是响应式的，也就是可以当成是data里的
    sidebar() {
      return this.$store.state.app.sidebar
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        // 动态控制类名，值为 false 时删除类名，然后设置hideSidebar样式
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickDrawer() {
      this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
    }
  },
}
</script>

<style lang="scss" scoped>
  .va-app-wrapper {
    position: relative;
    height: 100%;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    width: calc(100% - 210px);
    transition: width 0.2s;
  }
  .hideSidebar {
    .fixed-header {
      width: calc(100% - 54px);
    }
  }
  // mobile端
  .va-drawer-bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 20;
  }
  // sidebar显示，且为mobile端，改为fixed布局
  // 第一，可以让sidebar通过层级覆盖app-wrapper
  // 第二，可以裁切app-wrapper，不拥有滚动长度
  .mobile {
    .fixed-header {
      width: 100%;
    }
    &.va-app-wrapper.openSidebar {
      position: fixed;
      top: 0;
      width: 100%;
    }
  }
</style>