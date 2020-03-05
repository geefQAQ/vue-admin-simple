<template>
    <el-dropdown :show-timeout="100" class="ca-dropdown" trigger="click">
        <el-button size="medium" class="ca-button" type="plain">
            平台{{`(${platforms.length})`}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="ca-dropdown-menu" style="padding: 10px 20px;">
            <el-checkbox-group v-model="platforms">
                <el-checkbox label="平台1"></el-checkbox>
                <el-checkbox label="平台2"></el-checkbox>
                <el-checkbox label="平台3"></el-checkbox>
            </el-checkbox-group>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'PlatformDropdown',
    props: {
        value: {
            required: true,
            type: Array,
            default() {
                return ['平台1']
            }
        }
    },
    computed: {
        platforms: {
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