<template>
    <div :style="{width: width,height: height}"></div>
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
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if(!this.chart) {
            return
        }
        this.chart.dispose();
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions()
        },
        setOptions() {
            this.chart.setOption({
                radar: {
                    radius: '67%',
                    center: ['50%', '44%'],
                    splitNumber: 6,
                    // shape: 'circle',
                    splitArea: {
                        areaStyle:{
                            color: 'rgba(127, 95, 132, .3)',
                            opacity: 1,
                            shadowBlur: 45,
                            shadowColor: 'rgba(0, 0, 0, .5)',
                            // shadowOffsetX: 0,
                            shadowOffsetY: 15,
                        },
                    },
                    indicator: [
                        { name: '销售', max: 10000 },
                        { name: '管理', max: 20000 },
                        { name: '技术', max: 20000 },
                        { name: '客服', max: 20000 },
                        { name: '开发', max: 20000 },
                        { name: '市场', max: 20000 },
                    ],
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: [
                        '预算分配', '期望花销', '实际花销'
                    ]
                },
                series: [{
                    type: 'radar',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            shadowBlur: 13,
                            shadowColor: 'rgba(0, 0, 0, .2)',
                            shadowOffsetY: 10,
                            opacity: 1
                        }
                    },
                    data: [
                    {
                        value: [5000, 7000, 12000, 11000, 15000, 14000],
                        name: '预算分配',
                    },
                    {
                        value: [4000, 9000, 15000, 15000, 13000, 11000],
                        name: '期望花销'
                    },
                    {
                        value: [5500, 11000, 12000, 15000, 12000, 12000],
                        name: '实际花销'
                    }],
                }],
                // color: [] // 可以data颜色，包括对应的legend
                animationDuration: 3000
            })
        }
    }
}
</script>