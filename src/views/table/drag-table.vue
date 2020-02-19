<template>
    <div class="va-app-container">
        <el-table
            :data="list"
            ref="table"
            border
            fit
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
            <el-table-column label="标题">
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
                    {{row.readings | calcReadings}}
                </template>
            </el-table-column>
            <!-- filter还可以用于属性内，常用法是类似parseTime -->
            <el-table-column align="center" prop="status" label="状态" width="80">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter ">
                        {{row.status}}
                    </el-tag>
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
import Sortable from 'sortablejs'
export default {
    name: 'DragTable',
    data() {
        return {
            list: null,
            tableLoading: false,
            sortable: null,
            listQuery: {
                pageSize: 10,
                currentPage: 1
            }
        }
    },
    filters: {
        parseTime(t, p) {
            return parseTime(t, p)
        },
        statusFilter(s) {
            const statusObj = {
                '发布': 'success',
                '草稿': 'plain',
                '删除': 'danger'
            }
            return statusObj[s]
        },
        calcReadings(r) {
            return r.reduce((acc, cur) => {
                return acc + cur.pv
            }, 0)
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        // 尝试用es7，非常好
        async fetchList() {
            const { data } = await getComplexList(this.listQuery)
            this.list = data.items
            this.$nextTick(() => {
                this.setSort()
            })
        },
        // 为了解决element-ui@2.13.0中与sortable结合使用时产生的错误：Error in callback for immediate watcher "data"，并不能理解(暂时是理解范围以外)换到旧版本@2.12.0，未出现次错误
        setSort() {
            // 获取可以拖拽的元素(通常是数组,所以用all)
            const el = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            // new一个Sortable对象，传入参数
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost',
                animation: 200,
                // 拖动结束
                onEnd: evt => {
                    const targetRow = this.list.splice(evt.oldIndex, 1)[0]
                    this.list.splice(evt.newIndex, 0, targetRow)
                }
            })
        }
    }
}
</script>