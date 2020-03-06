<template>
    <div style="display: inline-block;">
        <label class="radio-label">自动宽度：</label>
        <el-radio-group v-model="autowidth">
            <el-radio :label="true" border style="margin-right: 0;">True</el-radio>
            <el-radio :label="false" border>False</el-radio>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    name: 'AutoWidthOption',
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        autowidth: {
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