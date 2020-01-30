<template>
    <el-table
        :data="list"
        highlight-current-row
        size="mini"
    >
       <el-table-column label="订单号">
           <template slot-scope="{row}" min-width="200">
               {{row.order_no | orderNoFilter}}
           </template>
       </el-table-column>
       <el-table-column label="价格" width="195" align="center">
           <template slot-scope="{row}">
               ￥{{row.price}}
           </template>
       </el-table-column>
       <el-table-column label="状态" width="100" align="center">
           <template slot-scope="{row}">
               <el-tag :type="row.status | statusFilter">
                   {{row.status}}
               </el-tag>
           </template>
       </el-table-column>
    </el-table>
</template>
<script>
import { transactionList } from '@/api/remote-search'
export default {
    filters: {
        orderNoFilter(str) {
            return str.substring(0, 30)
        },
        statusFilter(status) {
            const statusMap = {
                success: 'success',
                pending: 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            list : []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            transactionList().then(response => {
                this.list = response.data.slice(0, 8)
            })
        }
    }
}
</script>