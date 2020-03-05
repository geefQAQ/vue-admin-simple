<template>
    <el-dropdown :show-timeout="100" class="ca-dropdown" trigger="click">
        <el-button size="medium" type="plain">
            链接<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="ca-dropdown-menu">
            <el-input placeholder="请输入链接" style="width: 400px;" v-model="source_uri">
                <template slot="prepend">URL</template>
            </el-input>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'SourceUriDropdown',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        source_uri: {
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
</style>