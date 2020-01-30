<template>
    <el-card class="va-box-card">
        <div slot="header" class="va-box-card-header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="背景图片">
        </div>
        <!-- 这里是默认的el-card__body -->
        <div style="position: relative;">
            <thumb :image="avatar"/>
            <div style="padding-top: 30px;" class="va-progress-item">
                <span>Vue</span>
                <el-progress :percentage="80" />
            </div>
            <div class="va-progress-item">
                <span>Javascript</span>
                <el-progress :percentage="18" status="exception"/>
            </div>
            <div class="va-progress-item">
                <span>CSS</span>
                <el-progress :percentage="25" status="warning"/>
            </div>
            <div class="va-progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success"/>
            </div>
        </div>
    </el-card>
</template>
<script>
import Thumb from '@/components/Thumb'
export default {
    name: 'BoxCard',
    components: { Thumb },
    computed: {
        avatar() {
            return this.$store.state.user.avatar
        }
    }
}
</script>
<style lang="scss">
.va-box-card {
    .el-card__header {
        padding: 0;
    }
}
</style>
<style lang="scss" scoped>
.va-box-card-header {
    height: 220px;
    img {
        width: 100%;
        height: 100%;
        transition: all .2s linear;
        &:hover {
            transform: scale(1.1);
            filter: contrast(130%)
        }
    }
}
.va-progress-item {
    margin-bottom: 10px;
}
</style>