<template>
   <div class="va-app-container">
       <el-tag>mounted times: {{createTimes}}</el-tag>
        <el-alert :closable="false" style="width: 200px;display:inline-block;vertical-align: middle;margin-left: 30px;" title="Tab with keep-alive" type="success" />
       <el-tabs v-model="activeName" type="border-card" style="margin-top: 15px;">
           <!-- 注意name 与选项卡绑定值 value 对应的标识符，表示选项卡别名，也就是点击的时候，value就是name，v-model绑定的值就是name 的值-->
           <!-- https://element.eleme.cn/2.7/#/zh-CN/component/tabs#tab-pane-attributes -->
            <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
                <keep-alive>
                    <tab-pane v-if="activeName == item.key" :region="item.label" @create="showCreateTimes"/>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
   </div>
</template>
<script>
import TabPane from './components/tab-pane'
export default {
    name: 'Tab',
    components: {
        TabPane
    },
    data() {
        return {
            tabMapOptions: [
                { label: '中国', key: 'CN' },
                { label: '美国', key: 'US' },
                { label: '日本', key: 'JP' },
                { label: '欧洲', key: 'EU' },
            ],
            activeName: 'CN',
            createTimes: 0,
        }
    },
    watch: {
        activeName(val) {
            // 很神奇的是，当带着tab参数进入链接时，也会触发activeName值的改变
            this.$router.push(`${this.$route.path}?tab=${val}`)
        }
    },
    created() {
        const tab = this.$route.query.tab
        if(tab) {
            this.activeName = tab
        }
    },
    methods: {
        showCreateTimes() {
            this.createTimes += 1
        }
    }
}
</script>