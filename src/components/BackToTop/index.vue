<template>
    <transition name="fade">  
        <div v-show="visible" @click="backToTop" class="va-backtotop">
            <i class=el-icon-top />
        </div>
    </transition>  
</template>
<script>
export default {
    name: 'BackToTop',
    data() {
        return {
            visible: false,
            interval: null,
            isMoving: false,
            backPosition: 0
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
        if(this.interval) {
            clearInterval(this.interval)
        }
    },
    methods: {
        handleScroll() {
            this.visible =  window.pageYOffset > 300
        },
        backToTop() {
            // 匀速
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // })

            // 定制曲线函数（easeOutQuad）
            if(this.isMoving) return
            let i = 0;
            const start = window.pageYOffset
            this.isMoving = true
            this.interval = setInterval(() => {
                const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
                if (next <= 0) {
                    window.scrollTo(0, 0)
                    clearInterval(this.interval)
                    this.isMoving = false
                } else {
                    window.scrollTo(0, next)
                }
                i++
                }, 
            // 为什么是16.7？？？
            16.7)

        },
        // 需要慢慢去理解，简单说就是两个函数，前半时间是函数1，后半是2，斜率是从缓到陡再到缓，所以速度也随斜率
        // 为什么要用这种方法，而不用匀速
        // 1、这样体验更好 2、时间是固定的，不会随内容高度增加而延长
        // 至于这个函数是怎样确定的，我也不清楚，函数1还勉强能理解，函数2的 --t 我是不明白什么意思了
        easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) {
            const e = c / 2 * t * t + b
            return e
        }
        const a = -c / 2 * (--t * (t - 2) - 1) + b
        return a
        }
    },
}
</script>
<style lang="scss" scoped>
.va-backtotop {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: rgb(231, 234, 241);
}
.el-icon-top {
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
}

// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>