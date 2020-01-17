<template>
    <div ref="rightPanel" :class="{'show': show}" class="va-rightpanel-container" >
        <div class="va-rightpanel-bg"></div>
        <div class="va-rightpanel">
            <div @click="show=!show" class="va-rightpanel-button">
                <i :class="show?'el-icon-close':'el-icon-setting'"></i>
            </div>
            <div class="va-rightpanel-contents">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import { addClass, removeClass } from '@/utils'
export default {
    name: 'RightPanel',
    data() {
        return {
            show: false
        }
    },
    watch: {
        // 关于全局（window）侦听click事件
        // 1、监听show，值改变的时候触发，给window添加click事件
        // 2、事件是检查点击元素的祖先元素是否为指定的元素，这里是va-rightpanel
        // 3、如果是，则什么都不做。若不是，就改变show值，触发DOM，并解除window侦听的click事件
        show(value) {
            if(value) {
                window.addEventListener('click', this.closeRightpanel)
                addClass(document.body, 'showRightPanel')
                // document.body.classList.add('showRightPanel')
            }else {
                removeClass(document.body, 'showRightPanel')
                // document.body.classList.remove('showRightPanel')
            }
        }
    },
    // 渲染即把组件插入到body
    mounted() {
        this.insertToBody()
    },
    // 注销
    beforeDestroy() {
        const el = this.$refs.rightPanel
        // https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/remove
        el.remove();
    },
    methods: {
        closeRightpanel(e) {
            // closest返回参数（也就是指定的祖先元素），如果没有找到，就返回null
            // 不支持IE，可以用polyfill
            const p = e.target.closest('.va-rightpanel')
            if(!p) {
                this.show = false
                window.removeEventListener('click', this.closeRightpanel)
            }
        },
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
        insertToBody() {
            const el = this.$refs.rightPanel
            const body = document.querySelector('body')
            body.insertBefore(el, body.firstChild)
        }
    }
}
</script>
<style lang="scss">
.showRightPanel {
    // 保证rightpanel出现时，切割body，不出现滚动条
    overflow: hidden;
    // 减去滚动条宽度，不让内容跳动
    width: calc(100% - 15px)
}
</style>
<style lang="scss" scoped>
.va-rightpanel-bg {
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0;
    width: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 20;
    transition: opacity .3s cubic-bezier(.7, .3, .1, 1)
    // &.showBg {
    //     width: 100%;
    //     opacity: 1;
    //     height: 100vh;
    // }
}
.va-rightpanel {
    position: fixed;
    right: 0;
    top: 0;
    // 要这样设置max-width才有用，而且子元素的宽度就定了
    width: 100%;
    max-width: 230px;
    height: 100vh;
    background-color: #fff;
    transform: translateX(100%);
    z-index: 20;
    transition: transform .3s cubic-bezier(.7, .3, .1, 1)
    // &.showPanel {
    //     transform: translateX(0)
    // }
}
// 可以整合为这样来写
.show {
    // transition: all .3s cubic-bezier(0.7, 0.3, 0.1, 1);

   .va-rightpanel-bg {
       width: 100%;
       opacity: 1;
       height: 100vh;
   }
   .va-rightpanel {
       transform: translateX(0)
   }
}

.va-rightpanel-button {
    position: absolute;
    top:200px;
    left: -50px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(24, 144, 255);
    border-radius: 10px 0 0 10px;
    i {
        font-size: 24px;
        line-height: 50px;
        color: #fff;
    }
}
</style>