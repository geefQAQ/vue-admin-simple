<template>
    <div class="va-app-container">
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
    }
}
</script>