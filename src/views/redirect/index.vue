<script>
export default {
    created() {
        // $route.params 一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
        const { path } = this.$route.params
        // 注意，这里的params是如 example/table 这样的，在routes.js里面由:path*传过来的，所以要加上/
        this.$router.replace({ path: '/' + path })
    },
    render: function(h) {
        return h() // 避免警告
    }
}
</script>