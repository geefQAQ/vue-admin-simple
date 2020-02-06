<template>
    <div>
        <sticky :className="'va-sticky-bg'">
            <el-dropdown style="margin-right: 5px;" trigger="click">
                <el-button plain>
                    选择平台<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu>
                    <el-checkbox-group v-model="checklist" style="padding: 5px 15px;">
                        <el-checkbox v-for="item in platformOptions" :label="item.label" :key="item.index"></el-checkbox>
                    </el-checkbox-group>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown style="margin-right: 5px;" trigger="click">
                <el-button>
                    链接<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu style="padding: 0; width: 400px">
                    <el-input placeholder="请输入内容" v-model="inputLink">
                        <template slot="prepend">Url</template>
                    </el-input>
                </el-dropdown-menu>
            </el-dropdown>
            <div style="display: inline-block; margin-right: 5px;">
                <el-date-picker
                    v-model="datePicker"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <el-button type="success">发布</el-button>
        </sticky>
        <div class="va-app-container">
            <aside>sticky</aside>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <sticky :sticky-top="200">
                <el-button type="primary">placeholder</el-button>
            </sticky>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
        </div>
    </div>
</template>
<script>
import Sticky from '@/components/Sticky'
export default {
    components: {
        Sticky
    },
    data() {
        return {
            platformOptions: [
                {label: '平台A'},
                {label: '平台B'},
                {label: '平台C'}
            ],
            inputLink: '',
            datePicker: '',
            checklist: ['选中且禁用','复选框 A']
        }
    }
}
</script>
<style lang="scss" scoped>
.va-data-picker {
    display: inline-block;
}
</style>