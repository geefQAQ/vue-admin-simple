<template>
    <div class="va-app-container clearfix">
        <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
            <el-tooltip placement="top">
                <div slot="content">
                    {{generateIconCode(item)}}
                </div>
                <div class="va-icon-item">
                    <i :class="'el-icon-' + item" />
                    <span>{{item}}</span>
                </div>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
import clipboard from '@/utils/clipboard'
import elementIcons from './element-icons'
export default {
    name: 'Icons',
    data() {
        return {
            elementIcons
        }
    },
    methods: {
        generateIconCode(item) {
            return `<i class=el-icon-${item} />`
        },
        handleClipboard(text, event) {
            clipboard(text, event)
        }
    },
}
</script>
<style lang="scss" scoped>
[class^="el-icon-"] {
    font-size: 40px;
}
.va-icon-item {
    text-align: center;
    float: left;
    margin-right: 15px;
    margin-bottom: 15px;
    width: 80px;
    height: 70px;
    & > span {
        display: block;
        font-size: 13px;
    }
}
</style>