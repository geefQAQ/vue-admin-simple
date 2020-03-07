<template>
    <div class="va-app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="handleBeforeUpload"/>
        <el-table :data="list" border fit highlight-current-row style="margin-top: 15px;">
            <el-table-column v-for="(item, index) in header" :prop="item" :label="item" :key="index"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import UploadExcelComponent from '@/components/UploadExcel'
export default {
    data() {
        return {
            list: [],
            header: [],
        }
    },
    components: { UploadExcelComponent },
    methods: {
        handleSuccess(data) {
            const { header, results } = data
            this.list = results
            this.header = header
        },
        handleBeforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if(isLt1M) {
                return true
            } 
            this.$message({
                message: '请选择小于1Mb的文件上传',
                type: 'warning'
            })
            return false
        }
    }
}
</script>