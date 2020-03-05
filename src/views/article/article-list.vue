<template>
    <div class="va-app-container">
        <el-table :data="list" border highlight-current-row fit>
            <el-table-column prop="id" label="ID" width="80" align="center">

            </el-table-column>
            <el-table-column prop="date" label="日期" width="160" align="center">
                 <template slot-scope="{row}">
                   {{row.date | parseTime('{y}-{m}-{d} {h}-{i}')}}
                </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="80" align="center">
                
            </el-table-column>
            <el-table-column prop="imp" label="重要性" width="80">
                <template slot-scope="{row}">
                    <i v-for="n in row.imp" :key="n" class="el-icon-star-on" style="font-size: 18px;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80" align="center">
                <template slot-scope="{row}">
                    <el-tag :type="row | statusFilter">{{row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
                <template slot-scope="{row}">
                    <router-link :to="'/article/edit/' + row.id" class="va-link-type">
                        <span>{{row.title}}</span>
                    </router-link>
                </template>

            </el-table-column>
            <el-table-column label="操作" width="120" align="center"> 
                <template slot-scope="{row}">
                    <router-link :to="'/article/edit/' + row.id">
                        <el-button type="primary" size="small">Edit</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getComplexList } from '@/api/article'
import { parseTime } from '@/utils'
const statusType = {
    '草稿': 'plain',
    '发布': 'success',
    '删除': 'danger'
}
export default {
    name: 'ArticleList',
    data() {
        return {
            list: []
        }
    },
    filters: {
        statusFilter(row) {
            return statusType[row.status]
        },
        parseTime(row, format) {
            return parseTime(row, format)
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            getComplexList().then(res => {
                this.list = res.data.items
            })
        }
    }
}
</script>