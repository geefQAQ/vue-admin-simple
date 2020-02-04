<template>
    <div>
        <!-- 参考 https://github.com/Inspiration1/asteroid/blob/master/src/components/tinymce-editor/tinymce-editor.vue -->
        <aside>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/rich-editor.html#%E5%B8%B8%E8%A7%81%E5%AF%8C%E6%96%87%E6%9C%AC" >链接</a>
            先埋一个坑，需要时再回来看看。
        </aside>
        <editor
            api-key="9b5rtor8j75t6fcvxkc4n0x7juyzfvpmgs7ddzoc5xys9ttt"
            :init="{
                height: 300,
                language_url: `/tinymce/langs/zh_CN.js`,
                language: 'zh_CN',
                plugins: plugins,
                toolbar: toolbar,
                menubar: 'file edit view format tools help',
                initial_value: 'test'
            }"
        />
    </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import plugins from './plugins.js'
import toolbar from './toolbar.js'
export default {
    name: 'Tinymce',
    components: {
        Editor
    },
    data() {
        return {
            // publicPath: process.env.BASE_URL
            plugins: plugins,
            toolbar: toolbar
        }
    },
    // methods: {
    //     init() {

    //     }
    // }
}
</script>