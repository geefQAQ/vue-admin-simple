<template>
  <div class="va-app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.va-app-main {
    min-height: calc(100vh - 85px);
    // background-color: rgb(241, 183, 198);
    // 切割 否则当 transition 时，发生水平偏移，撑大元素，出现水平滚动条，页面颤动
    overflow: hidden;
}
// 很灵活使用了兄弟选择器
// 情况1：设置了fixed-header，但是不显示tag-view
.fixed-header + .va-app-main {
    padding-top: 50px;
  }
// 情况2：设置了fixed-header，且同时显示tag-view
.hasTagsView {
  .fixed-header + .va-app-main {
    padding-top: 85px;
  }
}
// 如果fixed-header没设置，是不会匹配任何样式的，高度自适应
</style>