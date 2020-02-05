<template>
    <div class="va-app-container">
        <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>
        <el-dialog
            v-drag-dialog
            title="提示"
            :visible.sync="dialogVisible"
            @dragDialog="handleDrag"
        >
            <el-select ref="select" v-model="value" placeholder="please select">
                <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"/>
            </el-select>
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" >取消</el-button>
                <el-button type="primary" @click="dialogVisible = false" >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
    name: 'DragDialogDemo',
    directives: { elDragDialog },
    data() {
        return {
            dialogVisible: false,
            value: '',
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' },
                { value: '选项4', label: '龙须面' },
            ],
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    methods: {
        handleDrag() {
            this.$refs.select.blur()
        }
    }
}
</script>