<template>
  <div
    class="hamburger"
    @click="toggleClick"
  >
    <i :class="icon? 'el-icon-s-fold':'el-icon-s-unfold'"></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    icon: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
      toggleClick() {
        this.$emit('toggleClick')
    }
  },
}
</script>

<style lang="scss" scoped>
.hamburger {
    line-height: 50px;
    text-align: center;
    padding: 0 15px;

    &:hover {
      background: rgba(0,0,0,0.025)
    }
}
.el-icon-s-fold, .el-icon-s-unfold {
  font-size: 20px;
  vertical-align: middle;
}
</style>