<template>
<div class="va-app-container">
    <!-- v-model的value是找到相应value的option的label -->
    <drag-select v-model="value" multiple placeholder="请选择" class="va-drag-select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">

        </el-option>
    </drag-select>
    <div>
        <el-tag v-for="item in value" :key="item" style="margin-right: 10px;">
            {{item}}
        </el-tag>
    </div>
</div>
</template>
<script>
import DragSelect from '@/components/DragSelect'
export default {
    name: 'DragSelectDemo',
    components: {
        DragSelect
    },
    data() {
        return {
            options: [
                {
                    value: '黄金糕',
                    label: '黄金糕'
                },
                {
                    value: '双皮奶',
                    label: '双皮奶'
                },
                {
                    value: '凤爪',
                    label: '凤爪'
                },
                {
                    value: '排骨',
                    label: '排骨'
                }
            ],
            value: ['黄金糕', '双皮奶']
        }
    }
}
</script>
<style lang="scss" scoped>
.va-drag-select {
    width: 400px;
    margin-bottom: 20px;
}
</style>