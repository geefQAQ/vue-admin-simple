<template>
    <div>
        <div style="margin: 20px 0;">
            表头顺序固定，添加顺序始终按照表头数组顺序
        </div>
        <el-checkbox-group v-model="checkboxVal" style="padding-bottom: 10px;">
            <el-checkbox label="apple"></el-checkbox>
            <el-checkbox label="banana"></el-checkbox>
            <el-checkbox label="orange"></el-checkbox>
        </el-checkbox-group>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            :key="key"
        >
            <el-table-column label="水果名" width="100" style="width: 100%">
                <template slot-scope="{row}">
                    {{row.name}}
                </template>
            </el-table-column>
            <el-table-column v-for="item in formThead" :key="item" :label="item">
                <template slot-scope="{row}">
                    {{row[item]}}
                </template> 
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
const  fruitsDefaultOptions = ['apple', 'banana']
export default {
    name: 'FixedThead',
    data() {
        return {
            tableData: [
                {
                    name: '水果-1',
                    apple: '苹果-1',
                    banana: '香蕉-1',
                    orange: '橙子-1'
                },
                {
                    name: '水果-2',
                    apple: '苹果-2',
                    banana: '香蕉-2',
                    orange: '橙子-2'
                }
            ],
            fruitsOptions: ['apple', 'banana', 'orange'],
            formThead: fruitsDefaultOptions,
            checkboxVal: fruitsDefaultOptions,
            key: 1
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.formThead = this.fruitsOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1 // 确保每次都会重新渲染，不加key的话，会有明显的撑开闪现
        }
    }
}
</script>