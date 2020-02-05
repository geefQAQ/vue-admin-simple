import Vue from 'vue'
const drag = {
    bind(el, binding, vnode) {
        const dialogDOM = el.querySelector('.el-dialog');
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        // dialogDOM.style.cssText += ';'
        dialogHeaderEl.style.cssText += '; cursor: move;'
        // 每次关闭对话框时，都保持对话框left top，相当于一个存储状态
        // 注意立即函数的封装形式，返回值是一个函数，函数返回的是一个值，是包含单位的字符串
        const getStyle = (function() {
            return (dom, attr) => getComputedStyle(dom)[attr]
        })()

        dialogHeaderEl.addEventListener('mousedown', e => {

            // mousedown 鼠标水平位置
            const downX = e.clientX
            const downY = e.clientY

            // 每次打开对话框获取样式，注意要先格式化
            const styL = Number(getStyle(dialogDOM, 'left').replace(/px/g, ''))
            const styT = Number(getStyle(dialogDOM, 'top').replace(/px/g, ''))

            // 屏幕宽度screenWidth，注意是clientWidth
            const screenWidth = document.body.clientWidth
            const screenHeight = document.body.clientHeight

            // 最小left
            const minLeft = dialogDOM.offsetLeft
            const minTop = dialogDOM.offsetTop

            // 最大left
            const maxLeft = screenWidth - dialogDOM.offsetLeft - dialogDOM.offsetWidth
            const maxTop = screenHeight - dialogDOM.offsetTop - dialogDOM.offsetHeight

            document.addEventListener('mousemove', _handleMousemove)
            document.addEventListener('mouseup', _handleMouseup)

            function _handleMousemove(e) {
                // left 值为move后的X值 - down时的X值，注意，往左移动时left为复制
                let left = e.clientX - downX
                let top = e.clientY - downY
                // 边界情况
                // 左边缘
                if(-(left) >= minLeft) {
                    left = -minLeft
                }
                // 右边缘
                if(left >= maxLeft) {
                    left = maxLeft
                }
                // 上边缘
                if(-(top) >= minTop) {
                    top = -minTop
                }
                // 下边缘
                if(top >= maxTop) {
                    top = maxTop
                }
                // 根据left 和 top 改变样式
                dialogDOM.style.cssText += `left: ${left + styL}px; top: ${top + styT}px;`

                 // emit事件，注意，是在mousemove事件中emit的
                vnode.child.$emit('dragDialog')
            }

            function _handleMouseup() {
                document.removeEventListener('mousemove', _handleMousemove)
                document.removeEventListener('mouseup', _handleMouseup)
            }
        })
    },
}
export default Vue.directive('drag-dialog', drag)