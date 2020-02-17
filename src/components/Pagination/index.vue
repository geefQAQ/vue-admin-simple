<template>
<!-- 为什么cuurent-page要加sync修饰符，暂时搞不懂 -->
<!-- 有可能是当currentPage的set方法，会触发与@update:current-page的事件，因为本质上都是改变绑定的值
    可能set与this.$emit('update:current-page', val)是同一回事，不然我理解不了
 -->

 <!-- sync算是一个高级技巧，这个组件很有思考的价值，弄懂prop是怎样一回事，怎样实现父子的双向绑定 -->
    <el-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="pageSizes"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
    >
    </el-pagination>
</template>
<script>
export default {
    name: 'Paginaiton',
    // 封装组件的时候，必须要想清楚到底需要什么属性，特别是二次封装
    // 像这里的paginaiton，组件已有的属性，如page-size，如果要用，就必须在props或者computed上有对应的变量的赋值
    // 不能因为这个属性是组件自带，会传递过来，而直接使用，是不行的
    // 想要使用父组件传递过来的属性，1、在父组件上赋值，2、在子组件上，先在html上注册属性，再用props/computed/data赋值
    props: {
        total: {
            type: Number,
            required: true,
        },
        pageSizes: {
            type: Array,
            default() {
                return [2, 5, 10, 20, 30]
            }
        },
        background: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                return this.$emit('update:limit', val)
            }
        },
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                return this.$emit('update:page', val)
            }
        }
    },
    methods: {
        handleSizeChange() {
            this.$emit('pagination')
            window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
            });
        },
        handleCurrentChange() {
            this.$emit('pagination')
            window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
            });
        },
    }
}
</script>