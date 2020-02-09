<template>
  <div class="va-app-container">
    <el-table 
      v-loading="listLoading"
      :data="list"
      fit
      border
      highlight-current-row
    >
      <el-table-column
        label="ID"
        type="index"
        :index="0"
        align="center"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="display_time"
        label="发表日期"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="previews"
        label="查看数"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="文章状态"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: "Table",
  // filters
  // https://cn.vuejs.org/v2/guide/filters.html
  // <div v-bind:id="rawId | formatId"></div>
  filters: {
    statusFilter: function (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data: function() {
    return {
      list: [],
      listLoading: true
    };
  },
  
  created: function() {
    this.fetchData()
  },

  methods: {
    handleEdit: function (a, b) {
      console.log(a, b)
    },

    fetchData: function () {
      // this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }) 
    }
  }
};
</script>