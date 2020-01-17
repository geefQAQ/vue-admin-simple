<template>
    <el-dropdown 
    trigger="click"
    placement="bottom-end" 
    class="va-dropdown">
      <div class="va-user-avatar-container">
          <img 
            class="va-user-avatar"
            :src="avatarImg" alt="">
            <i class="el-icon-caret-bottom"></i>
      </div>
        <el-dropdown-menu class="va-dropdown-menu" slot="dropdown">
            <a target="_blank" href="https://zhihu.com">
                <el-dropdown-item>外链跳转到知乎</el-dropdown-item>
            </a>
            <el-dropdown-item disabled>不可用状态</el-dropdown-item>
            <el-dropdown-item divided @click="logout">
                <!-- 为什么要加一个子元素，还要设置db -->
                <!-- el-dropdown 是 绝对定位+动态计算的，这里估计是不让它添加dn样式，具体要看el源码 -->
                <span style="display: block;" @click="logout">Log Out</span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
  name: 'Userinfo',
  data: function() {
      return {
          avatarImg: this.$store.state.user.avatar
      }
  },
  methods: {
    // 如果不用async，不会发生跳转，因为都是回调函数，顺序不一定，async可以解决这个问题，而且dispatch 是一个promise
    logout: async function() {
        await this.$store.dispatch('user/logout')
        this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.va-dropdown{
    float: right;
    margin-right: 30px;
}

.va-dropdown-menu {
    padding: 15px 0;
}

.va-user-avatar-container {
    position: relative;
    margin-top: 5px;
}

.va-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
}

.el-icon-caret-bottom {
    position: absolute;
    top: 25px;
    right: -20px;
}
</style>