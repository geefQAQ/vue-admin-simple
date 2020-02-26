<template>
    <div>
        <!-- 参考 https://github.com/Inspiration1/asteroid/blob/master/src/components/tinymce-editor/tinymce-editor.vue -->
        <editor ref="tinymce"
            api-key="9b5rtor8j75t6fcvxkc4n0x7juyzfvpmgs7ddzoc5xys9ttt"
            :init="{
                height: 400,
                language_url: `/tinymce/langs/zh_CN.js`,
                language: 'zh_CN',
                plugins: plugins,
                toolbar: toolbar,
                menubar: 'file edit view format tools help',
            }"
            model-events = "change keyup undo redo"
            @input="handleInput"
            :value="value"
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
    props: {
        value: String,
    },
    data() {
        return {
            // publicPath: process.env.BASE_URL
            plugins: plugins,
            toolbar: toolbar,
            content: this.value
        }
    },
    methods: {
        // value要分清楚属性和组件自身的value，名一样，但是必须要赋值才能有值
        handleInput(val) {
            this.$emit('input', val)

        },
    },
    // watch: {
    //     // 父组件v-model传的是value属性，如果这里不作赋值content=this.value，
    //     // 就取不到初始值，至于为什么要v-model，因为@input事件不足够好，触发频率比较高，v-model相当于经过处理的input事件，暂时没发现v-model有什么副作用
    //     content(val) {
    //         this.$emit('input', val)
    //     }
    // },
}
</script>