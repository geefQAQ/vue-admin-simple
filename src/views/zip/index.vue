<template>
    <div class="va-app-container">
        <el-input v-model="fileName" placeholder="请输入文件名(默认为file)" prefix-icon="el-icon-document" style="width: 300px;"></el-input>
        <el-button :disabled="downloadLoading" type="primary" @click="handleDownload" style="margin: 0 0 20px 20px;"><i class="el-icon-document"/>下载Zip</el-button>
        <el-table v-loading="listLoading" :data="list" fit border highlight-current-row>
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
export default {
    name: 'Zip',
    data() {
        return {
            list: [],
            listQuery: {
                pageSize: 20,
                currentPage: 1,
            },
            fileName: '',
            listLoading: false,
            downloadLoading: false
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
        async fetchList() {
            this.listLoading = true
            const { data } = await getComplexList(this.listQuery)
            this.list = data.items
            this.listLoading = false
        },
        calcReadings(r) {
            return r.reduce((acc, cur) => acc + cur.pv, 0)
        },
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Zip')
                .then(zip => {
                    const tHeader = ['ID', '标题', '作者', '阅读数', '时间']
                    const filterVal = ['id', 'title', 'author', 'readings', 'date']
                    const data = this.formatJSON(this.list, filterVal)
                    zip.export_txt_to_zip(tHeader, data, this.fileName, this.fileName)
                    this.downloadLoading = false
                })
        },
        formatJSON(list, fitler) {
            return list.map(l => fitler.map(f => {
                if(f === 'date') {
                    return parseTime(l[f])
                }
                if(f === 'readings') {
                    return this.calcReadings(l[f])
                }
                return l[f]
            }))
        }
    }
}
</script>