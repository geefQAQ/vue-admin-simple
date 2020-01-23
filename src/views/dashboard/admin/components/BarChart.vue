<template>
    <div :style="{width: width, height: height}"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'
import resize from './mixin/resize'
export default {
    mixins: [ resize ],
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        // console.log('this', this)
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if(!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions()
        },
        setOptions() {
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: 0,
                    right: 10,
                    bottom: 10,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: '首页',
                    type: 'bar',
                    stack: '浏览人数',
                    barWidth: '60%',
                    data: [79, 52, 200, 334, 390, 330, 220],
                    animationDuration: 6000
                    }, {
                    name: '文章页',
                    type: 'bar',
                    stack: '浏览人数',
                    barWidth: '60%',
                    data: [80, 52, 200, 334, 390, 330, 220],
                    animationDuration: 6000
                    }, {
                    name: '视频页',
                    type: 'bar',
                    stack: '浏览人数',
                    barWidth: '60%',
                    data: [30, 52, 200, 334, 390, 330, 220],
                    animationDuration: 6000
                    }]
            })
        }
    }
}
</script>