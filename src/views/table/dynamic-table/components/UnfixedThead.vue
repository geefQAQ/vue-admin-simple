<template>
    <div>
        <div style="margin: 20px 0;">
            表头顺序不固定，添加顺序按照点击顺序
        </div>
        <el-checkbox-group v-model="formThead" style="padding-bottom: 10px;">
            <el-checkbox label="apple"></el-checkbox>
            <el-checkbox label="banana"></el-checkbox>
            <el-checkbox label="orange"></el-checkbox>
        </el-checkbox-group>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
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
            formThead: ['apple', 'banana'],
        }
    },
}
</script>