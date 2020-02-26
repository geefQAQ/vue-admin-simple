<template>
<!-- 看起来很简单的功能，需要考虑的1、动态修改样式是直接修改属性还是添加类名 2、如何保证组件的可复用性 3、为什么不能用一个元素来实现要用2个 -->
    <div style="height: 50px;">
        <div :class="className" :style="{top:(isSticky ? stickyTop + 'px': ''), zIndex: zIndex, width: width + 'px', position, }">
            <slot>
                sticky
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sticky',
    props: {
        className: {
            type: String,
        },
        stickyTop: {
            type: Number,
            default: 0
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            isSticky: false,
            width: 'auto',
            position: '',
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        // 改变宽度时宽度也会动态改变
        window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('scroll', this.handleResize)
    },
    methods: {
        sticky() {
            this.width = this.width
            this.position = 'fixed'
            this.isSticky = true
        },
        reset() {
            this.isSticky = false
            this.width = this.width
            this.position = ''
        },
        handleScroll() {
            // 注意，top值的元素是最外层元素，相当于用两个元素来实现，因为fixed只会相对于视口定位，所以当脱离文档流的时候，不会影响父元素的top偏移量
            const top = this.$el.getBoundingClientRect().top
            // 需要计算宽度，如果直接用100%的话，会撑开，布局错误
            const width = this.$el.getBoundingClientRect().width
            // 注意，这里是当滚动发生时才赋值，若不滚动时，width为auto
            this.width = width
            // 为什么不动态添加类名来改变样式，因为width要动态获取，css中动态修改比js麻烦点
            if(top <= this.stickyTop) {
                this.sticky()
                return 
            }
            this.reset()
        },
        handleResize() {
            if(this.isSticky) {
                this.width = this.$el.getBoundingClientRect().width
            }
        }
    }
}
</script>