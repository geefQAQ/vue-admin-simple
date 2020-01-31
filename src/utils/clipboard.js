import Clipboard from 'clipboard'
import Vue from 'vue'

function clipboardSuccess () {
    // 不能用this.$message，此时this指向window，引入vue，然后用原型链找到$message方法
    // 在main.js已经使用了Vue.use(elementUI)，所以直接用原型链上的方法即可
    Vue.prototype.$message({
        message: '复制成功',
        type: 'success',
        duration: 1000
    })
}
function clipboardError () {
    Vue.prototype.$message({
        message: '复制失败',
        type: 'error',
    })
}

function handleClipboard(text, event) {
    // 点击第一次时会打印，但是不会触发on事件
    console.log('clip', text, event)
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', function() {
        clipboardSuccess()
        clipboard.destroy()
    })
    clipboard.on('error', function() {
        clipboardError()
        clipboard.destroy()
    })
    // 为什么要点两次？？？尚未明白
    clipboard.onClick(event)
}
export default handleClipboard