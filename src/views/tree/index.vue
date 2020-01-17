<template>
  <div class="va-app-container">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      style="margin-bottom:30px;"
    >

    </el-input>
    <el-tree
      ref="tree"
      :data="treeData"
      :filter-node-method="filterNode"
      default-expand-all
    >
      
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Tree',

  watch: {
    // 如果'filterText'发生变化，这个函数就会运行
    filterText(val) {
      // 注意，这是 Tree 实例的filter方法，参数为关键字。配合 filter-node-method
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 过滤函数 
    filterNode(value, data) {
      if(!value) return true;
      // 注意 data 参数
      // console.log('value', value, 'data', data)
      return data.label.indexOf(value) !== -1;
    }
  },
  data: function() {
    return {
      filterText: '',
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }]
        }]
      },
      {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
          children: [{
            id: 3,
            label: '三级 2-1-1'
          }]
        }]
      }]
    }
  }
}
</script>