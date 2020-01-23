// 处理窗口大小变化时的echarts图标的自适应(包括sidebar展开关闭时)
export default {
    
    mounted() {
        this.$_initWindowResizeEvent()
        this.$_initSidbarResizeEvent()
    },
    beforeDestroy() {
        this.$_initSidbarResizeEvent()
        this.$_destroySidebarResizeEvent()
    },
    methods: {
        $_resizeHandler() {
            // 这里必须用箭头函数，每个mixin绑定调用mixin的对象，也就是当前的vue组件
            // 用that = this / bind(this)会出现，只能绑定到一个组件，其他组件不起效的问题
            // function() {}直接丢失this，指向window
            setTimeout(() => {
                if(this.chart) {
                    this.chart.resize()
                }
            }, 200)
        },
        $_initWindowResizeEvent() {
            window.addEventListener('resize', this.$_resizeHandler)
        },
        $_destroyWindowResizeEvent () {
            window.removeEventListener('resize', this.$_resizeHandler)
        },
        $_sidebarResizeHandler(e) {
            // sidebar在bgc,opacity均有transition，仅在宽度时才触发
            if(e.propertyName === 'width' ) {
                this.$_resizeHandler()
            }
        },
        $_initSidbarResizeEvent() {
            this.$_sidebarElm = document.getElementsByClassName('va-sidebar-container')[0]
            this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
        },
        $_destroySidebarResizeEvent() {
            this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
        }
    }
}