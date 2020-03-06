<template>
    <div class="va-app-container">
        <filename-option v-model="fileName"/>
        <autowidth-option v-model="autoWidth" />
        <booktype-option v-model="bookType" />
        <el-button type="primary" @click="handleDownload" style="margin: 0 0 20px 20px;"><i class="el-icon-document"/>导出Excel</el-button>
        <el-table :data="list" fit border highlight-current-row>
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
import AutowidthOption from './components/autowidth-option'
import BooktypeOption from './components/booktype-option'
export default {
    name: 'ExportExcel',
    components: {
        FilenameOption, AutowidthOption, BooktypeOption
    },
    data() {
        return {
            list: [],
            listQuery: {
                pageSize: 20,
                currentPage: 1, 
            },
            fileName: '',
            autoWidth: true,
            bookType: 'xlsx',
        }
    },
    filters: {
        parseTime(time, format) {
            return parseTime(time, format)
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
        calcReadings(readings) {
            return readings.reduce((acc, cur) => acc + cur.pv, 0)
        },
        handleDownload() {
            // 插件体积比较大，所以建议这样的懒加载
            import('@/vendor/Export2Excel')
                .then(excel => {
                    const tHeader = ['ID', '标题', '阅读数', '日期']
                    const filterVal = ['id', 'title', 'readings', 'date']
                    const data = this.formatJSON(this.list, filterVal)
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
            // map的作用是修改每一个项，这里并没有减少项，而是对项里的对象进行了筛选，也就是修改了项
            return list.map(v => {
                return filter.map(f => {
                    if(f === 'date') {
                        return parseTime(v[f])
                    }
                    else if(f === 'readings') {
                        return this.calcReadings(v[f])
                    }
                    else {
                        return v[f]
                    }
                })
            })
        }
    }
}
</script>
<style>
.radio-label {
	font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
}
</style>