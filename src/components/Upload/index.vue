<template>
    <div>
        <el-upload
            class="image-uploader"
            drag
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            action="https://httpbin.org/post"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-loading="imageLoading" element-loading-text="正在上传中，请稍后" class="image-preview">
            <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i class="el-icon-delete" @click="removeImage" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Upload',
    props: {
        value: {
            type: String,
            default: ''
        }   
    },
    data() {
        return {
            // 添加loading，建议用其他组件来增强等待时的交互效果
            imageLoading: false
        }
    },
    computed: {
        imageUrl() {
            return this.value
        }
    },
    watch: {
        // 没有获取图片的事件，只能通过url的变化来控制loading
        imageUrl() {
            this.imageLoading = false
        }
    },
    methods: {
        // 注意参数
        handleSuccess(res) {
            this.$emit('input', res.files.file)
        },
        handleError(err) {
            console.log('upload-error', err)
        },
        // 上传前显示loading
        beforeUpload() {
            this.imageLoading = true
        },
        removeImage() {
            this.$emit('input', '')
        }
    }
}
</script>
<style lang="scss" scoped>
.image-uploader {
    float: left;
}
.image-preview {
    float: left;
    margin-left: 50px;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 180px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.image-preview-wrapper {
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
.image-preview-action {
    position: absolute;
    left: 0; top: 0;
    height: 100%; width: 100%;
    background: rgba(0,0,0, .5);
    text-align: center;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    line-height: 178px;
    opacity: 0;
    transition: opacity .3s;
    &:hover {
        opacity: 1;
    }
}
</style>