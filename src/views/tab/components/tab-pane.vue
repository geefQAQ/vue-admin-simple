<template>
    <el-table :data="list" border fit highlight-current-row>
        <el-table-column prop="id" label="ID" width="80" align="center">
        </el-table-column>
        <el-table-column label="日期" width="160" align="center">
            <template slot-scope="{row}">
                {{row.date | parseTime( '{y}-{m}-{d} {h}:{i}' )}}
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
            <template slot-scope="{row}">
                {{row.title}}<el-tag type="primary">{{row.region}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="80" align="center">
        </el-table-column>
        <el-table-column label="重要性" width="100">
            <template slot-scope="{row}">
                <i v-for="n in row.imp" :key="n" class="el-icon-star-on" style="font-size: 22px;"/>
            </template>
        </el-table-column>
        <el-table-column label="阅读数" width="80" align="center">
            <template slot-scope="{row}">
                {{calcReadings(row.readings)}}
            </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
            <template slot-scope="{row}">
                <el-tag :type="row.status | statusFilter">{{row.status}}</el-tag>
            </template>
        </el-table-column>

    </el-table>
</template>
<script>
import { getComplexList } from '@/api/article'
import { parseTime } from '@/utils'
export default {
    name: 'TabPane',
    props: {
        region: {
            type: String,
            default: '中国'
        }
    },
    filters: {
        parseTime(date, format) {
            return parseTime(date, format)
        },
        statusFilter(status) {
            const statusMap = {
                '草稿': 'plain',
                '发布': 'success',
                '删除': 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            list: [],
            listQuery: {
                currentPage: 1,
                pageSize: 5,
                region: this.region
            }
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            this.$emit('create')
            getComplexList(this.listQuery)
                .then(res => {
                    this.list = res.data.items
                })
        },
        calcReadings(readings) {
            return readings.reduce((acc, cur) => acc + cur.pv, 0)
        }
    }
}
</script>