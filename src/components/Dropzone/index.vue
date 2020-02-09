<template>
    <!-- https://rowanwins.github.io/vue-dropzone/docs/dist/#/demo -->
    <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
    ></vue-dropzone>
</template>
<script>
import VueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    name: 'Dropzone',
    components: { VueDropzone },
    data() {
        return {
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 200,
                addRemoveLinks: true,
                dictDefaultMessage: "<i class=el-icon-upload />点击上传或者拖图片到此处",
                headers: { "My-Awesome-Header": "header value" }
            }
        }
    }
}
</script>