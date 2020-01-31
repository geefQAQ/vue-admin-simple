<template>
   <section>
        <!-- 头部 左边是全选，右边是输入框，回车可以添加todo-->
       <header>
           <div class="va-todo-toggle-all">
               <input type="checkbox" id="toggle-all" class="va-todo-toggle-all__checkbox" 
                    :checked="allChecked"
                    @change="toggleAll({ done: !allChecked })">
               <label for="toggle-all">
                   <i class="el-icon-arrow-down"></i>
               </label>
           </div>
            <input class="va-todo-addtodo" placeholder="new todo" type="text" @keyup.enter="addTodo">
       </header>
       <!-- main todoitem 选中=完成 双击可以编辑 经过添加删除按钮 -->
       <ul>
        <todo 
            v-for="(todo, index) in filteredTodos" 
            :key="index"
            :todo="todo"
            @deleteTodo="deleteTodo"
            @toggleTodo="toggleTodo"
        />
       </ul>
       <!-- footer 主要是显示和filter -->
       <footer class="va-todo-footer">
           <span class="va-todo-remaining">
               <strong>{{remaining}}</strong>
                {{remaining | pluralize('item')}} left
            </span>
           <ul class="va-todo-filter">
               <li v-for="(val, key) in filters" :key="key" >
                   <a @click.prevent = "visibility = key" :class="{selected: visibility === key}">{{ key | capitalize}}</a>
               </li>
            </ul>
       </footer>
   </section>
</template>
<script>
import Todo from './Todo.vue'
const defaultTodos = [
    {text: 'webpack',done: false}, 
    {text: 'axios',done: true},
    {text: 'vue', done: false},
    {text: 'element-ui', done: false},
    {text: 'css', done: true}
]
const filters = {
    'all' : function(todos) { return todos },
    'completed': function (todos) { return todos.filter(todo => todo.done) },
    'active': function (todos) { return todos.filter(todo => !todo.done) }
}
const STORAGE_KEY = 'todos'
export default {
    components: { Todo },
    data() {
        return {
            visibility: 'all',
            // 注意，储存到localstorage必须要先序列化，读取时要反序列化，
            // JSON.parse('')会报错type error，清空要用null
            todos : JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defaultTodos,
            filters
        }
    },
    filters: {
        // 区分单复数
        pluralize(n, w) {
            return n === 1 ? w : w + 's'
        },
        // 首字母大写
        capitalize(n) {
            // return n.charAt(0).toUpperCase() + n.split(n.charAt(0))[1]
            return n.charAt(0).toUpperCase() + n.slice(1)
        }
    },
    computed: {
        // 全部todo的done都为true，allChecked才为true，否则为false，这是初始化
        // 为什么不能用some，因change事件需要取反，自己领悟
        allChecked() {
            return this.todos.every(todo => todo.done)
        },
        // footer
        remaining() {
            return this.todos.filter(todo => !todo.done).length
        },
        filteredTodos() {
            return this.filters[this.visibility](this.todos)
        },
        
    },
    methods: {
        // 本地存储
        setLocalStorage() {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        },
        // header
        // 选择全部和取消选择全部
        toggleAll({ done }) {
            this.todos.forEach(todo => {
                todo.done = done
            })
            this.setLocalStorage()
        },
        addTodo(e) {
            const text = e.target.value
            // trim之后要确保还有内容
            if(text.trim()) {
                this.todos.push({
                    text,
                    done: false
                })
            this.setLocalStorage()
            }
            e.target.value = ''
        },
        // main
        deleteTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
            this.setLocalStorage()
        },
        toggleTodo(todo) {
            todo.done = !todo.done
            this.setLocalStorage()
        }
    }
}
</script>
<style lang="scss" scoped>

// header
header {
    border-bottom: 1px solid #ededed;
}
.va-todo-toggle-all {
    float: left;
    width: 44px;
    background: #fff;
    height: 42px;
    
}
.va-todo-addtodo {
    box-sizing: border-box;
    width: calc(100% - 44px);
    line-height: 42px;
    padding: 0;
    padding-left: 20px;
    font-size: 16px;
}
.va-todo-toggle-all__checkbox {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
    &+label {
        display: block;
        width: 100%;
        height: 42px;
        text-align: center;
        i {
            font-size: 28px;
            line-height: 42px;
            font-weight: bold;
            color: #666;
        }
    }
}
// footer
.va-todo-footer {
    position: relative;
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    background: #fff;
    font-size: 12px;
    &::before {
        content: '';
        position: absolute;
        height: 42px;
        top: 0; left: 0; right: 0;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
}
.va-todo-remaining {
    color: #999;
    float: left;
}
.va-todo-filter {
    position: relative;
    z-index: 1;
    float: right;
    li {
        float: left;
        a {
            color: #999;
            border: 1px solid transparent;
            padding: 3px 5px;
            &:hover {
                border: 1px solid rgba(175,47,47,0.1);
            }
            &.selected {
                border: 1px solid rgba(175,47,47,0.3);
            }
        }
    }
}
</style>