<template>
    <div class="va-app-container">
        <aside>
            Guide页面是给第一次进入网站的用户作简单的介绍作用。
        </aside>
        <el-button type="primary" @click.prevent.stop="guide" style="font-weight: bold;">
            <i class="el-icon-question" />
            <span style="margin-left: 5px;">
                开始导航
            </span>
        </el-button>
    </div>
</template>
<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
export default {
    name: 'Guide',
    data() {
        return {
            driver: null
        }
    },
    mounted() {
        this.driver = new Driver({
            doneBtnText: "完成",
            nextBtnText: "下一步",
            prevBtnText: "上一步",
            closeBtnText: "关闭",
            padding: 0
        })
    },
    methods: {
        guide() {
            this.driver.defineSteps(steps);
            this.driver.start()
        }
    }
}
</script>