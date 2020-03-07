<template>
    <div class="va-app-container">
        <el-button type="primary" @click="handleDownload" style="margin: 0 0 20px 20px;"><i class="el-icon-document"/>导出Excel</el-button>
        <el-table :data="list" fit border highlight-current-row>
            <el-table-column prop="id" label="ID" width="80" align="center">

            </el-table-column>
            <el-table-column label="主要信息" align="center">

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
export default {
    name: 'MergeHeader',
    data() {
        return {
            list: [],
            listQuery: {
                pageSize: 20,
                currentPage: 1,
            }
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
        handleDownload() {
            import('@/vendor/Export2Excel')
                .then(excel => {
                    const multiHeader = [['ID', '主要信息', '', '', 'Date']]
                    const tableHeader = ['', '标题', '标题', '阅读数', '']
                    const filterVal = ['id', 'title', 'author', 'readings', 'date']
                    const data = this.formatJSON(this.list, filterVal)
                    const merges = ['A1:A2', 'B1:D1', 'E1:E2']
                    
                    excel.export_json_to_excel({
                        data,
                        multiHeader,
                        header: tableHeader,
                        merges
                    })
                })
        },
        formatJSON(list, filter) {
            return list.map(l => {
                return filter.map(f => {
                    if(f === 'date') {
                        return parseTime(l[f])
                    }else if (f === 'readings') {
                        return this.calcReadings(l[f])
                    }else {
                        return l[f]
                    }
                })
            })
        }
    }
}
</script>