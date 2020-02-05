<template>
    <!-- https://cn.vuejs.org/v2/api/#vm-attrs -->
    <!-- 我的理解是除了 style 和 class , 父组件的属性都传递过来，如multiple,placeholder -->
    <el-select ref="dragSelect" class="va-drag-select" v-model="selectVal" v-bind="$attrs">
        <slot />
    </el-select>
</template>
<script>
import Sortable from 'sortablejs'
export default {
    name: 'DragSelect',
    props: {
        // v-model 其实是一个语法糖，这背后其实做了两个操作
        // v-bind 绑定一个 value 属性
        // v-on 指令给当前元素绑定 input 事件
        value: {
            type: Array,
            required: true,
        }
    },
    // data() {
    //     return {
    //         // 如果用这种方法，会发现改变select值时，tag并不会发生变化，就是说父组件的value没有发生改变，只能用setter来改变父组件的值
    //         selectVal: this.value
    //     }
    // },
    computed: {
        // 为什么getter和setter，因为要获取/修改父组件的值
        // 注意这里的set是触发input事件，父组件会监听到，触发事件，获取参数
        selectVal: {
            get() {
                return [...this.value]
            },
            set(val) {
                // console.log('set')
                this.$emit('input', [...val])
            }
        }
    },
    mounted() {
        this.setSort()
    },
    methods: {
        setSort() {
            const el = this.$el.querySelectorAll('.el-select__tags > span')[0]
            // console.log('el', el)
            // http://www.sortablejs.com/options.html
            this.sortale = new Sortable(el, {
                ghostClass: "sortable-ghost",  // drop placeholder的css类名
                animation: 150,
                // 拖拽结束
                onEnd: evt => {
                    // oldIndex 拖拽前的序列号
                    // 要el-tag也按照顺序排列，因此要改变父组件的value数组
                    // 1、删除拖拽元素对应在value数组上的值 2、获取被删除的元素
                    const targetRow = this.value.splice(evt.oldIndex, 1)[0]
                    // 3、在拖拽位置上添加被拖拽的元素
                    this.value.splice(evt.newIndex, 0, targetRow)
                }
            })
        }
    }
}
</script>
<style scoped>
/* vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过>>>，穿透scoped。 */
/* 有些Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符( >>> 的别名) */
.va-drag-select >>> .sortable-ghost {
/* /deep/ .sortable-ghost {  */
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
.va-drag-select >>> .el-tag {
    cursor: pointer;
}
</style>