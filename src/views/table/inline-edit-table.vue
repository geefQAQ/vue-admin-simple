<template>
    <div class="va-app-container">
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            v-loading="listLoading"
        >
            <el-table-column label="ID" width="80" align="center">
                <template slot-scope="{row}">
                    {{row.id}}
                </template>
            </el-table-column>
            <el-table-column label="日期" width="160" align="center">
                <template slot-scope="{row}">
                    {{row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}
                </template>
            </el-table-column>
            <el-table-column label="作者" width="80" align="center">
                <template slot-scope="{row}">
                    {{row.author}}
                </template>
            </el-table-column>
            <el-table-column label="重要性" width="100">
                <template slot-scope="{row}">
                    <i v-for="n in row.imp" :key="n" class="el-icon-star-on" style="font-size: 22px;" />
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80" align="center">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                        {{row.status}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="标题" >
                <template slot-scope="{row}">
                    <!-- 这情况可以用template -->
                    <template v-if="row.edit">
                        <!-- small的高度刚好撑满 -->
                        <el-input  v-model="row.title" class="va-edit-input" size="small"></el-input>
                        <el-button @click="handleCancelEdit(row)" type="warning" class="va-cancel-button" icon="el-icon-circle-close" size="small">取消</el-button>
                    </template>
                    <span v-else>{{row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column label="编辑" width="120" align="center">
                <template slot-scope="{row}">
                    <el-button v-if="row.edit" @click="handleConfirmEdit(row)" type="success" size="mini" icon="el-icon-circle-check">确认</el-button>
                    <el-button v-else @click="row.edit = !row.edit" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getComplexList } from '@/api/article'
import { parseTime } from '@/utils'
export default {
    name: 'InlineEditTable',
    data() {
        return {
            list: null,
            listLoading: true,
            listQuery: {
                pageSize: 10,
                currentPage: 1
            }
        }
    },
    filters: {
        parseTime(v, f) {
            return parseTime(v, f)
        },
        statusFilter(r) {
            const statusObj = {
                '发布': 'success',
                '草稿': 'plain',
                '删除': 'danger'
            }
            return statusObj[r]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            const { data } = await getComplexList(this.listQuery)
            this.list = data.items.map(v => {
                // https://cn.vuejs.org/v2/guide/reactivity.html
                // 直接用v.edit = false，那这个属性就不是响应式的，也就不能动态改变视图
                // this.$set()可以动态添加响应式对象属性
                this.$set(v, 'edit', false)
                v.originTitle = v.title // 这里不需要响应式，只要在取消时可以取原始值
                return v
            })
            setTimeout(() => {
                this.listLoading = false
            }, 500)
        },
        handleCancelEdit(row) {
            row.edit = false
            row.title = row.originTitle
            this.$message({
                message: '已取消编辑，标题为上一个修改的标题',
                type: 'warning'
            })
        },
        handleConfirmEdit(row) {
            row.edit = false
            row.originTitle = row.title
            this.$message({
                message: '标题修改成功',
                type: 'success'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.va-edit-input {
    position: relative;
    padding-right: 100px;
}
.va-cancel-button {
    position: absolute;
    right: 10px;
    top: 13px;
    padding: 8px 15px;
}
</style>