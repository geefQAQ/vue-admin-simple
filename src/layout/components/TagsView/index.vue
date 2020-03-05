<template>
    <div class="va-tagsview-container">
        <!-- 为什么middle要加上native才能正常使用 -->
        <!-- 中键是原生事件，绑定到自定义的组件（router-link）就要用.native修饰符 -->
        <!-- key之前用的是name，但是path才是保证唯一的，name有可能在同一组件的时候重复 -->
        <!-- 显示的字符串之前用的是tag.meta.title，换成tag.title确保可以通过更新tagsViews时进行更新 -->
        <router-link
            v-for="tag in visitedViews"
            :key="tag.path"
            tag="span"
            :class="isActive(tag)? 'active' : ''"
            class="va-tagsview-item"
            :to="{path: tag.path}"
            @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
            @contextmenu.prevent.native="openMenu(tag, $event)"
        >{{tag.title}}
            <span v-if="!isAffix(tag)" class="el-icon-close" @click.stop="closeSelectedTag(tag)"></span>
        </router-link>
        <ul v-show="visible" :style="{left: left + 'px', top: top + 'px'}" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
            <li @click="closeSelectedTag(selectedTag)" v-if="!isAffix(selectedTag)">Close</li>
            <li @click="closeOtherTags">Close Other</li>
            <li @click="closeAllTags(selectedTag)">Close All</li>
        </ul>
    </div>
</template>
<script>
import { constantRoutes } from '@/router'
import path from 'path'
export default {
    name: 'TagsView',
    data () {
        return {
           visible: false,
           left: 0,
           top: 0,
           // 存储右击菜单时选中的标签页
           selectedTag: {},
           affixTags: []
        }
    },
    computed: {
        // 只要store的visitedViews变化了，就肯定发生变化，确保是最新的数据
        visitedViews() {
            // console.log('visitedViews发生变化')
            return this.$store.state.tagsView.visitedViews
        }
    },
    watch: {
        // 监听路由
        $route() {
            this.addTags()
        },
        // 动态body监听click事件，还能这样获取visible的值！！
        visible(value) {
            if(value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
        // 激活状态的tag，添加样式
        isActive(view) {
            return view.path === this.$route.path
        },
        // 拥有affix属性的tag，初始化就存在，没有关闭按钮
        isAffix(tag) {
            return tag.meta && tag.meta.affix
        },
        // 右击tag打开选项菜单
        openMenu(tag, e) {
            // $el是根DOM元素，也就是.va-tagsview-container。碰巧，这个元素与relative元素的offsetLeft是一样的。
            // getBoundingClientRect:除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect

            // 根DOM元素的相对于视口的left
            const rootOffsetLeft = this.$el.getBoundingClientRect().left
            // 点击时相对视口的left
            const clientX = e.clientX
            const left = clientX - rootOffsetLeft + 15
            this.left = left
            this.top = e.clientY
            // 禁用文字选择
            document.body.style.userSelect = 'none';
            this.visible = true
            // ！！！菜单的view参数是在这里！！！
            this.selectedTag = tag
            // 下一帧恢复选择能力
            setTimeout(() => {
              document.body.style.userSelect = 'auto';
            }, 100);
            
        },
        closeMenu() {
            this.visible = false;
        },
        // 初始化标签页
        initTags() {
            // 要把affixTags优先添加
            const affixTags = this.affixTags = this.filterAffixTags(constantRoutes)
            for(const tag of affixTags) {
                if(tag.name) {
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        },
        // 添加标签
        addTags() {
            const { name } = this.$route
            // name只是一个判断作用，有了name在history中能够记录到，所以要来当判断条件
            if(name) {
                this.$store.dispatch('tagsView/addVisitedView', this.$route)
            }
        },
        // 关闭选定标签
        closeSelectedTag(view) {
            this.$store.dispatch('tagsView/delVisitedView', view)
                .then(({ visitedViews }) => {
                    // 跳转到最后一个元素的路由
                    this.toLastView(visitedViews)
                })
        },
        // 刷新选定标签页
        refreshSelectedTag(view) {
            // 个人觉得是难点，很难去理解为什么用cached来解决这个问题
            // 直接重定向，然后触发重新渲染不就完事了吗？
            this.$router.replace({
                path: '/redirect' + view.fullPath
            })
        },
        // 关闭其他标签
        closeOtherTags() {
            // 无论右击时选中的路由是哪一个，都先跳转到选中的路由
            this.$router.push(this.selectedTag.path)
            this.$store.dispatch('tagsView/delOtherViews', this.selectedTag)
        },
        // 关闭所有标签
        closeAllTags() {
            // store里面已经对affixTag进行过处理
            this.$store.dispatch('tagsView/delAllViews')
                .then(({ visitedViews }) => {
                    this.toLastView(visitedViews)
                })
        },
        // 跳转到最后的标签
        toLastView(visitedViews) {
            // 获取最新store里最新的路由数组的最后一个元素
            const latestView = visitedViews.slice(-1)[0]
            // 跳转，注意一定要用fullPath，解决嵌套的路径问题
            this.$router.push(latestView.fullPath)
        },
        // 找到有affix属性的路由
        filterAffixTags(routes) {
            let tags = []
            // 什么时候用forEach，什么时候用filter,some
            // some适用于单个元素，filter是不改变数组，forEach相当于for循环，可以更容易处理元素
            // 这里是把符合要求的Push到一个数组，forEach比较合适
            
                // 找到affix属性的route，但是一般的都放在children里面啊，这里我就不递归了
                // if(route.mata && route.meta.affix) {
                //     const tagPath = path.resolve(basePath, route.path)
                //     tags.push({
                //         fullPath: tagPath,
                //         path: tagPath,
                //         name: route.name,
                //         meta: { ...route.meta }
                //     })
                // }
                // 基本affix属性都放在route.children的数组的对象里，所以要进行递归
                // 递归函数自己，要注意函数返回的是什么，然后举个例子嵌套来搞清楚逻辑
            
            // 有一个问题是，是递归容易理解还是双循环容易理解，当然，递归更加灵活，只是对个人而言，递归较难理解
            // 而且递归有一个好处是参数的处理，特别是命名，就不会太混乱
            for(let route of routes) {
                if(route.children) {
                    route.children.forEach(childRoute => {
                        if(childRoute.meta && childRoute.meta.affix) {
                            const tagPath = path.resolve(route.path, childRoute.path)
                            tags.push({
                                fullPath: tagPath,
                                path: tagPath,
                                name: childRoute.name,
                                meta: { ...childRoute.meta }
                            })
                        }
                    })
                }
            }
            return tags
        }
    }
}
</script>
<style lang="scss" scoped>
    .va-tagsview-container {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    }
    .va-tagsview-item {
        display: inline-block;
        cursor: pointer;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        margin-left: 5px;
        margin-top: 5px;
        background-color: #fff;
        border: 1px solid #d8dce5;
        margin-left: 5px;
        font-size: 12px;
        &:first-of-type {
            margin-left: 15px;
            
        }
        &.active {
            background-color: #42b983;
            color: #fff;
            border-color: #42b983;
            &::before {
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: #fff;
                border-radius: 50%;
                // 伪元素和文本之间有个间隙，估计是幽灵节点，建议翻翻书。。。原来是文本前的空格
                // 为什么name前后都有个空格？？？
                // span里面文本前后的换行变成了空格
                margin-right: 8px;
            }
        }
    }
    .contextmenu {
        position: absolute;
        left: 100px;
        top: 0;
        cursor: pointer;
        background-color: #fff;
        list-style-type: none;
        z-index: 3;
        border-radius: 4px;
        padding: 5px 0;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        &>li {
            font-size: 12px;
            // text-align: center;
            padding: 7px 16px;
            &:hover {
                background-color: #eee;
            }
        }
    }
</style>

<style lang="scss">
// 重置ui，为什么不能用scoped
.va-tagsview-item {
    .el-icon-close {
        width: 16px;
        height: 16px;
        // 先调整圆框的垂直位置
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        // transform-origin: 100% 50%;
        &:before {
            // 设置display让transform生效
            display: inline-block;
            transform: scale(.6);
            // 再调整x的垂直位置
            vertical-align: -2px;
        }
        &:hover {
            background-color: #b4bccc;
            color: #fff;
        }
    }
}
</style>