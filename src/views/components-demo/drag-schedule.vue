<template>
    <div class="va-app-container">
        <drag-schedule :list="list1" :group="group" header-text="Todo" transition-key="Todo" 
            list-function="delete"            
            @sort="handleSort"
            @deleteItem="deleteItem"
        />
        <drag-schedule :list="list2" :group="group" header-text="Working" transition-key="Working" 
            list-function="add"  
            @sort="handleSort"
            @addItem="addItem"
        />
        <!-- <drag-schedule :list="list3" :group="group" header-text="Done" transition-key="Done" @sort="handleSort"/> -->
    </div>
</template>

<script>
import DragSchedule from "@/components/DragSchedule";
export default {
  name: "DragScheduleDemo",
  components: {
    DragSchedule
  },
  data() {
    return {
        group: 'mission',
        list1: [
            { name: 'item', order: 1 },
            { name: 'item', order: 2 },
            { name: 'item', order: 3 },
            { name: 'item', order: 4 },
            { name: 'item', order: 5 },
            { name: 'item', order: 6 }
        ],
        list2: [
            { name: 'item', order: 7 },
            { name: 'item', order: 8 },
            { name: 'item', order: 9 },
            { name: 'item', order: 10 },
            { name: 'item', order: 11 },
            { name: 'item', order: 12 }
        ],
        list3: [
            { name: 'item', order: 13 },
            { name: 'item', order: 14 },
            // { name: 'item15', order: 15 },
            // { name: 'item16', order: 16 },
            // { name: 'item17', order: 17 },
            // { name: 'item18', order: 18 }
        ]
    };
  },
  methods: {
    // 这里还是挺有意思的，可以动态看出sort是怎样运行的，就直接一次就定好顺序，而不是逐个对比排列
    handleSort(list) {
        list.sort((a, b) => a.order - b.order)
    },
    // 这里的做法纯粹是懒，一般分开两个组件来实现
    // 如果要实现在同一组件内动态添加事件，应该是由数据驱动，而不是事件驱动 https://segmentfault.com/q/1010000018679307
    // 左边列表删除item
    deleteItem(item) {
        const deleteItem = this.list1.splice(this.list1.indexOf(item), 1)[0]
        // 简单处理吧，其实不适合在分开的组件上用，应该整合在一个组件上的，为了方便，就先不重复了
        this.list2.unshift(deleteItem)
    },
    addItem(item) {
        const deleteItem = this.list2.splice(this.list2.indexOf(item), 1)[0]
        this.list1.unshift(deleteItem)
    }
  },
};
</script>