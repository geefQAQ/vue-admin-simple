<template>
    <div class="va-schedule">
        <h3 class="va-schedule-header">{{headerText}}</h3>
        <!-- 注意，v-bind="$attrs"意思是把父组件的属性传递，结合props来使用 -->
        <!-- 但是这里就算传递了list和group，也要在子组件中手动添加该属性，才会生效，原因暂不明白 -->
        <!-- 关于emptyInsertThreshold，不设置的话，在空列表中，很难再添加新的。
        https://github.com/SortableJS/Vue.Draggable/issues/673#issuecomment-510417630 -->
        <draggable
            class="va-schedule-ul"
            tag="ul"
            :list="list"
            :group="group"
            :emptyInsertThreshold="300"
            v-bind="$attrs"
            ghostClass="ghost"
        >
            <transition-group name="flit-list">
                <li v-for="item in list" :key="item.order" class="va-schedule-li"
                    @click="addItem(item)" 
                >
                    {{ item.name }}{{ item.order }}
                    <i v-if="listFunction === 'delete'" @click="deleteItem(item)" class=el-icon-delete />
                </li>
            </transition-group>
        </draggable>
        <el-button style="margin-top: 5px;" type="primary" @click="handleClick(list)">从小到大排列</el-button>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
    name: 'DragSchedule',
    components: { Draggable },
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        },
        group: {
            type: String,
            default() {
                return '默认'
            }
        },
        headerText: {
            type: String,
            default() {
                return '默认标题'
            }
        },
        transitionKey: {
            type: String
        },
        listFunction: {
            type: String
        }
    },
    methods: {
        // 传递事件之前，要想清楚事件是在哪里触发的，一般要这样传递的，都是把子组件的参数数据传递到父组件
        handleClick(list) {
            this.$emit('sort', list)
        },
        deleteItem(item) {
            this.$emit('deleteItem', item)
        },
        addItem(item) {
            this.$emit('addItem', item)
        }
    }
}
</script>
<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background-color: blue !important;
  color: red;
}
.flit-list-move {
    transition: transform .5s;
}
.va-schedule {
    float: left;
    min-width: 500px;
    min-height: 100px;
    margin-right: 30px;
}
.va-schedule-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: lightblue;
}
.va-schedule-ul {
    height: auto;
    overflow: hidden;
    min-height: 60px;
    background: #eee;
    border: 10px solid transparent;
}
.va-schedule-li {
    position: relative;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    background: white;
    margin: 5px 0;
    & > i {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 10px;
        &:hover {
            cursor: pointer;
            color: red;
        }
    }
}
</style>