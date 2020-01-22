// mixin，混入到layout的index，所以方法要用变为“私有”，用$_来区分
// https://cn.vuejs.org/v2/style-guide/index.html#%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7%E5%90%8D-%E5%BF%85%E8%A6%81
import store from '@/store'
const { body } = document
const WIDTH = 992 // 根据BOOTSTRAP
let resizeTimer = null

export default {
    // 在layout渲染之前侦听resize事件
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    },
    // 取消侦听
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    // 渲染的时候就可以确定是mobile还是desktop
    mounted() {
        const isMobile = this.$_isMobile()
        // console.log('isMobile', isMobile)
        if(isMobile) {
            // 关闭sidebar，改变设备为mobile
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
            store.dispatch('app/toggleDevice', 'mobile')
        }
        console.log('route', this.$route.fullPath)
    },
    methods: {
        // mounted的时候调用
        $_isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        },
        // resize的时候调用
        $_resizeHandler() {
            // 好像就是触发两次resize，其实影响也不是很大
            // 可以添加定时器来解决触发两次resize的问题，但要注意this的指向
            if(resizeTimer) {
                clearTimeout(resizeTimer)
            }
            // 获取body元素尺寸，确定是否mobile设备
            const isMobile = this.$_isMobile()
            store.dispatch('app/toggleDevice', isMobile? 'mobile': 'desktop')
            resizeTimer = setTimeout(function() {
                if(isMobile) {
                    // console.log('resize => isMobile')
                    store.dispatch('app/closeSideBar', { withoutAnimation: true })
                }
            }, 100)
        }
    }
}