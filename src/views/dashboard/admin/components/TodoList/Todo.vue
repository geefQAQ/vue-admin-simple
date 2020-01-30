<template>
<!-- 还需要优化 -->
    <!-- <transition name="slide"> -->
        <li class="va-todo">
            <label 
                @click.prevent="toggleTodo(todo)"
                class="va-todo-checkbox-container">
                <input type="checkbox">
                <div class="va-todo-checkbox">
                    <i :class="todo.done ? 'icon':''" class="el-icon-check"></i>
                </div>
            </label>
            <div :class="todo.done ? 'done':''" class="va-todo-text">{{todo.text}}</div>
            <button 
                @click.prevent="deleteTodo(todo)"
                class="va-todo-delete">
                <i class="el-icon-close"></i>
            </button>
        </li>
    <!-- </transition> -->
</template>
<script>
export default {
    name: 'Todo',
    props: {
        todo: {
            type: Object,
        }
    },
    data() {
        return {
            done: true
        }
    },
    methods: {
        toggleTodo(todo) {
            // label 与 input 的 click 事件问题，当label包含input时，给label添加点击事件会触发两次，prevent后空格不能触发点击事件
            this.$emit('toggleTodo', todo)
        },
        deleteTodo(todo) {
            this.$emit('deleteTodo', todo)
        }
    
    }
}
</script>
<style lang="scss" scoped>
.va-todo {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    // transition: all .2s linear;
    &:hover {
        .va-todo-delete {
            visibility: visible;
            opacity: 1;
        }
    }
}
.va-todo-checkbox-container {
    position: relative;
    float: left;
    width: 44px;
    height: 44px;
    background: #fff;
    border: none;
    z-index: 10;
    // outline: 2px solid lightblue;
    input {
        opacity: 0;
        outline: none;
        position: absolute;
        margin: 0;
        width: 0;
        height: 0;
        z-index: -1;
    }
}
.va-todo-checkbox {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    transform: translate(8px, 8px);
    border: 1px solid #d9d9d9;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;

}
.va-todo-text {
    word-break: break-all;
    margin-left: 44px;
    padding: 13px 0 13px 20px;
    background: #fff;
    font-size: 16px;
    transition: color .2s linear;
    &.done {
        color: #d9d9d9;
        text-decoration: line-through;
    }
}
.el-icon-check {
    font-size: 26px;
    line-height: 28px;
    transform: scale(0);
    transition: transform .2s linear;
    color: #13ce66;
    &.icon {
        transform: scale(1)
    }
}

.va-todolist-input {
    width: 100%;
    line-height: 24px;
    padding-left: 40px;
    box-sizing: border-box;
}
.va-todo-delete{
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 0; bottom: 0;
    right: 10px;
    height: 40px;
    width: 40px;
    transform: translateY(2px);
    border: none;
    background-color: #fff;
    color: #cc9a9a;
    font-size: 26px;
    transition: all .1s linear;
}
.va-todolist-item-checkbox {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-color: lightblue;
}
.va-todolist-item-button {
    // display: none;
    visibility: hidden;
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    width: 44px;
    height: 100%;
    font-size: 26px;
    // background: lightgreen;
    transition: all .2s linear;
}
.va-todolist-item-checkbox + label {
    line-height: 1;
    display: block;
    padding: 15px 15px 15px 50px
}

</style>