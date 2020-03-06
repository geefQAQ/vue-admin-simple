<template>
<div style="display: inline-block;">
<label class="radio-label">表格文件类型：</label>
    <el-select v-model="booktype" placeholder="请选择">
        <el-option
        v-for="item in booktypeOptions"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
    </el-select>
</div>
</template>
<script>
export default {
    name: 'BooktypeOption',
    props: {
        value: {
            type: String,
            default: 'xlsx'
        }
    },
    data() {
        return {
            booktypeOptions: ['xlsx', 'csv', 'txt'],
        }
    },
    computed: {
        booktype: {
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