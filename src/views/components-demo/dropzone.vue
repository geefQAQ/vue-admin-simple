<template>
    <div class="va-app-container">
        <aside>dropzone
            <a target="_blank" href="https://rowanwins.github.io/vue-dropzone/docs/dist/#/demo">具体看这里</a>
        </aside>
        <dropzone />
    </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
export default {
    name: 'DropzoneDemo',
    components: { Dropzone }
}
</script>