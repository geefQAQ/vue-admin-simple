<template>
  <div class="va-navbar">
    <hamburger class="va-hamburger-container" :icon="icon" @toggleClick="toggleSidebar"/>
    <breadcrump />
    <userinfo />
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrump from '@/components/Breadcrump'
import Userinfo from '@/components/Userinfo'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrump,
    Userinfo
  },
  computed: {
    icon() {
      return this.$store.state.app.sidebar.opened
    }
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.va-navbar {
  height: 50px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  overflow: hidden;
  // 解决层级问题，不设置的话会被tagsview覆盖掉阴影
  position: relative;
}

.va-hamburger-container {
  float: left;
}

</style>