<template>
    <div class="error-page-container">
        <el-button @click="goBack" type="primary"><i class="el-icon-arrow-left" />返回</el-button>
        <el-row>
            <el-col :span="12">
                <h1>Oops!</h1>
                gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
                <h2>你没有权限去该页面</h2>
                <h6>如有不满请联系你的领导</h6>
                <ul class="list-unstyled">
                    <li>或者你可以去：</li>
                    <li>
                        <router-link to="/dashboard">
                            回首页
                        </router-link>
                    </li>
                    <li>
                        <a href="https://www.taobao.com/" target="blank">随便看看</a>
                    </li>
                    <li>
                        <a href="#" @click="dialogVisible = true">点我看图</a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img :src="errGif" width="313" height="428" alt="小女孩的雪糕掉了">
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" title="随便康康"> 
            <img :src="ewizardClap" alt="巫师鼓掌">
        </el-dialog>
    </div>
</template>
<script>
import errGif from '@/assets/401/401.gif'
export default {
    data() {
        return {
            // 不明白为什么要在gif后加上时间戳
            errGif: errGif + '?' + +new Date(),
            dialogVisible: false,
            ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.error-page-container {
    width: 800px;
    margin: 100px auto;
}
h1 {
    margin: 32px 0;
    font-size: 60px;
    font-weight: 700;
    color: #484848
}
h2 {
    margin: 20px 0;
}
.el-icon-arrow-left {
    margin-right: 10px;
}
.list-unstyled {
    list-style-type: disc;
    padding-left: 40px;
    font-size: 14px;
    li {
        list-style-type: inherit;
    }
}
</style>