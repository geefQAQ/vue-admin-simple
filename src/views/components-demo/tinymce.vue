<template>
    <div class="va-app-container">
        <aside>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/rich-editor.html#%E5%B8%B8%E8%A7%81%E5%AF%8C%E6%96%87%E6%9C%AC" >链接</a>
            先埋一个坑，需要时再回来看看。
        </aside>
        <tinymce />
        <!-- <div style="background: lightgreen; height: 100px;" v-html="content" /> -->
    </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index'
export default {
    name: 'TinymceDemo',
    components: {
        Tinymce
    },
}
</script>