<template>
    <div class="va-app-container">
        <filename-option v-model="fileName"/>
        <el-button @click="handleDownload" type="primary"  style="margin: 0 0 20px 20px;"><i class="el-icon-document"/>导出Excel</el-button>
        <el-table @selection-change="handleSelectChange" :data="list" fit border highlight-current-row>
            <el-table-column type="selection" width="60" align="center">

            </el-table-column>
            <el-table-column prop="id" label="ID" width="80" align="center">

            </el-table-column>
            <el-table-column prop="title" label="标题">

            </el-table-column>
            <el-table-column label="作者" width="120" align="center">
                <template slot-scope="{row}">
                    <el-tag type="primary">{{row.author}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="阅读数" width="120" align="center">
                <template slot-scope="{row}">
                    {{calcReadings(row.readings)}}
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200" align="center">
                <template slot-scope="{row}">
                    <i class="el-icon-time" style="margin-right: 5px;" />{{ row.date | parseTime( '{y}-{m}-{d} {h}:{i}' ) }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getComplexList } from '@/api/article'
import { parseTime } from '@/utils'
import FilenameOption from './components/filename-option'
export default {
    name: 'ExportSelected',
    components: { FilenameOption },
    data() {
        return {
            list: [],
            selectedList: [],
            listQuery: {
                pageSize: 20,
                currentPage: 1
            },
            // 要undefined才能，因为插件中用了fileName = 'excel-list'这样的默认参数形式，并不好用，''和null都不会采用默认参数
            // 如果参数用 fileName = fileName || 'excel-list' 就好用了
            fileName: ''
        }
    },
    filters: {
        parseTime(t, f) {
            return parseTime(t, f)
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            getComplexList(this.listQuery)
                .then(res => {
                    this.list = res.data.items
                })
        },
        calcReadings(r) {
            return r.reduce((acc, cur) => acc + cur.pv, 0)
        },
        handleSelectChange(val) {
           this.selectedList = val
        },
        handleDownload() {
            import('@/vendor/Export2Excel')
                .then(excel => {
                    const tHeader = ['ID', '标题', '阅读数', '日期']
                    const filterVal = ['id', 'title', 'readings', 'date']
                    const data = this.formatJSON(this.selectedList, filterVal)
                    excel.export_json_to_excel({
                        data,
                        header: tHeader,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType,
                        fileName: this.fileName
                    })
                })
        },
        formatJSON(list, filter) {
            return list.map(l => {
                return filter.map(f => {
                    if(f === 'date') {
                        return parseTime(l[f])
                    }
                    else if(f === 'readings') {
                        return this.calcReadings(l[f])
                    }
                    else {
                        return l[f]
                    }
                })
            })
        }
    }
}
</script>