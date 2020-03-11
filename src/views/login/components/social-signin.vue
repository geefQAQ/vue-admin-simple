<template>
    <div class="container"> 
        <div class="sign-btn" @click="handleWeChatLogin">
            <i class="el-icon-basketball"></i>
            <span>WeChat</span>
        </div>
        <div class="sign-btn" @click="handleQQLogin">
            <i class="el-icon-baseball"></i>
            <span>QQ</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SocialSignin',
    methods: {
        handleWeChatLogin() {
            alert('OK')
        },
        handleQQLogin() {
            alert('OK')
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    margin: 20px 0;
}
.sign-btn {
    display: inline-block;
    margin-right: 60px;
    cursor: pointer;
    .el-icon-basketball, .el-icon-baseball {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
    }
    .el-icon-basketball {
        color: #24da70;
    }
    .el-icon-baseball {
        color: #6BA2D6;
    }
}
</style>