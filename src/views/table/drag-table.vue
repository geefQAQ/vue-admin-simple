<template>
    <div class="va-app-container">
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            v-loading="tableLoading"
        >
            <el-table-column align="center" prop="id" label="ID" width="80">
                <template slot-scope="{row}">
                    {{row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="日期" width="150">
                <template slot-scope="{row}">
                    {{row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
                <template slot-scope="{row}">
                    {{row.title}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="author" label="作者" width="80">
                <template slot-scope="{row}">
                    {{row.author}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="imp" label="重要性" width="100">
                <template slot-scope="{row}">
                    <i v-for="n in row.imp" :key="n" class="el-icon-star-on" style="font-size: 22px;" />
                </template>
            </el-table-column>
            <el-table-column align="center" prop="readings" label="阅读数" width="80">
                <template slot-scope="{row}">
                    {{calcReadings(row.readings)}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="状态" width="80">
                <template slot-scope="{row}">
                    {{row.status}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="可拖拽" width="80">
                <i class="el-icon-rank" style="font-size: 20px; font-weight: bold;"/>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getComplexList } from '@/api/article'
import { parseTime } from '@/utils'
export default {
    data() {
        return {
            list: null,
            tableLoading: false,
            listQuery: {
                pageSize: 10,
                currentPage: 1
            }
        }
    },
    filters: {
        parseTime(t, p) {
            return parseTime(t, p)
        }
    },
    mounted() {
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
            return r.reduce((acc, cur) => {
                return acc + cur.pv
            }, 0)
        }
    }
}
</script>