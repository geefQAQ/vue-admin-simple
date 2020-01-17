<template>
    <div class="va-drawer-container">
        <h3 class="va-drawer-title">页面样式设置（注意：会存储到cookies）</h3>
        <!-- <div class="drawer-item">
            <span>主题颜色</span>
            <el-color-picker 
                :predefine="['#409EFF', '#1890ff']"
            />
        </div> -->
        <div class="va-drawer-item">
            <span class="va-drawer-item_title">开启标签页功能</span>
            <el-switch
                active-color="#1890ff"
                class="va-drawer-item_switch"
                v-model="tagsView"
            />
        </div>
        <div class="va-drawer-item">
            <span class="va-drawer-item_title">固定头部</span>
            <el-switch
                active-color="#1890ff"
                class="va-drawer-item_switch"
                v-model="fixedHeader"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Settings',
    data() {
        return {
            test: true
        }
    },
    computed: {
        // 这里是设置的关键
        // 为什么要这样实现呢？因为组件上v-model上的值是布尔值，也就是说tagsView只有true/false。
        // get()是一个getter，返回查询的值，渲染组件的时候就会触发，el-switch组件显示时都要查询。
        // set()是一个setter，改变v-model的值时会触发，根据store里setting的格式，传入参数
        tagsView: {
            get() {
                return this.$store.state.settings.tagsView
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'tagsView',
                    value: val
                })
            }
        },
        fixedHeader: {
            get() {
                return this.$store.state.settings.fixedHeader
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'fixedHeader',
                    value: val
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.va-drawer-container {
    padding: 24px;
    font-size: 14px;
}
.va-drawer-title {
    padding: 12px 0;
    font-size: 14px;
}
.va-drawer-item {
    padding: 12px 0;
    .va-drawer-item_title {
        color: rgba(0,0,0,0.65)
    }
    .va-drawer-item_switch {
        float: right;
    }
}
</style>