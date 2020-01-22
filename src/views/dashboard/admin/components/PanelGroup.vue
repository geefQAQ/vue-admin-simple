<template>
    <el-row :gutter="40" class="va-panel-group">
        <!-- 在 el-col 等下添加 click 事件，要添加修饰符.native，原理暂不清楚 -->
        <el-col :span="6" class="va-card-panel-col">
            <div @click="handleClick('newVisitors')" class="va-panel-content">
                <div class="va-panel-icon-wrapper va-icon-visitor">
                    <div class="el-icon-user-solid va-panel-icon"></div>
                </div>
                <div class="va-panel-des">
                    <div class="va-panel-des-title">新增用户</div>
                    <count-to 
                        :start-val="0"
                        :end-val="102400"
                        :duration="2000"
                        class="va-panel-des-num" 
                    />
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="va-card-panel-col">
            <div @click="handleClick('messages')" class="va-panel-content">
                <div class="va-panel-icon-wrapper va-icon-message">
                    <div class="el-icon-chat-dot-square va-panel-icon"></div>
                </div>
                <div class="va-panel-des">
                    <div class="va-panel-des-title">消息数量</div>
                    <count-to 
                        :start-val="0"
                        :end-val="81212"
                        :duration="2000"
                        class="va-panel-des-num" 
                    />
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="va-card-panel-col">
            <div @click="handleClick('purchases')" class="va-panel-content">
                <div class="va-panel-icon-wrapper va-icon-money">
                    <div class="el-icon-money va-panel-icon"></div>
                </div>
                <div class="va-panel-des">
                    <div class="va-panel-des-title">交易金额</div>
                    <count-to 
                        :start-val="0"
                        :end-val="9280"
                        :duration="2000"
                        class="va-panel-des-num" 
                    />
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="va-card-panel-col">
           <div @click="handleClick('shoppings')" class="va-panel-content">
                <div class="va-panel-icon-wrapper va-icon-shopping">
                    <div class="el-icon-shopping-cart-full va-panel-icon"></div>
                </div>
                <div class="va-panel-des">
                    <div class="va-panel-des-title">购买总数</div>
                    <count-to 
                        :start-val="0"
                        :end-val="13600"
                        :duration="2000"
                        class="va-panel-des-num" 
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import CountTo from 'vue-count-to'

export default {
    name: 'PanelGroup',
    components: { CountTo },
    methods: {
        handleClick(val) {
            // 触发父组件名为 handleSetLineChartData 的事件，并传递参数
            this.$emit('handleSetLineChartData', val)
        }
    }
}
</script>
<style lang="scss" scoped>
.va-panel-group {
    margin-bottom: 30px;
}
.va-panel-content {
    height: 108px;
    overflow: hidden;
    background-color: #fff;
    &:hover {
        .va-panel-icon-wrapper {
            color: #fff;
        }
        .va-icon-visitor {
            background: #40c9c6;
        }
        .va-icon-message {
            background: #36a3f7;
        }
        .va-icon-money {
            background: #f4516c;
        }
        .va-icon-shopping {
            background: #34bfa3;
        }
    }
    .va-icon-visitor {
        color: #40c9c6;
    }
    .va-icon-message {
        color: #36a3f7;
    }
    .va-icon-money {
        color: #f4516c;
    }
    .va-icon-shopping {
        color: #34bfa3;
    }
    .va-panel-icon-wrapper {
        margin: 14px 0 0 14px;
        padding: 8px;
        float: left;
        border-radius: 10px;
        transition: all .2s linear;
        .va-panel-icon {
            color: currentColor;
            font-size: 64px;
        }
    }
    .va-panel-des {
        float: right;
        margin: 26px 26px 0 0;
        .va-panel-des-title {
            letter-spacing: 2px;
            line-height: 18px;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 12px;
            color: rgba(0, 0, 0, .5);
        }
        .va-panel-des-num {
            line-height: 20px;
            font-size: 20px;
            font-weight: bold;
            color: rgba(0, 0, 0, .7)
        }
    }
}
</style>