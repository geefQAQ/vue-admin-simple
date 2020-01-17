<template>
  <div
    class="hamburger"
    @click="toggleClick"
  >
    <i class="va-icon va-icon__setting"></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  methods: {
      toggleClick() {
        this.$emit('toggleClick')
    }
  }
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
.va-icon__setting {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
}
</style>