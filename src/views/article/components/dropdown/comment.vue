<template>
    <el-dropdown :show-timeout="100" class="ca-dropdown" trigger="click">
            <el-button size="medium" class="ca-button" type="plain">
            评论：{{!comment_disabled ? '开启' : '关闭'}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="ca-dropdown-menu">
            <!-- 加入item标签，在change事件后会自动消失，如果删除item标签，change后不会消失-->
            <el-dropdown-item class="ca-dropdown-item">
                <el-radio-group v-model="comment_disabled">
                    <el-radio :label="false">开启评论</el-radio>
                    <el-radio :label="true">关闭评论</el-radio>
                </el-radio-group>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'CommentDropdown',
    props: {
        value: {
            required: true,
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 这是作者常用的v-model封装手法
        comment_disabled: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.ca-dropdown {
    margin-right: 5px;
}
.ca-dropdown-menu {
    padding: 0;
}
.ca-dropdown-item {
    padding: 0 20px;
     &:hover {
        // inherit的话是透明
        background-color: #fff;
        color: inherit
    }
}
.ca-button {
    &:hover, &:focus {
        background-color: #fff;
    }
}
</style>