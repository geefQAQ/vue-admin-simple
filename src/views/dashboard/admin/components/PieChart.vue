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
            this.chart = echarts.init(this.$el, 'macarons'),
            this.setOptions()
        },
        setOptions() {
            this.chart.setOption({
                tooltips: {
                    trigger: 'item',
                    // https://www.echartsjs.com/zh/option.html#tooltip.formatter
                    // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: ['工业', '技术', '外汇', '黄金', '展望']
                },
                series: {
                    name: '每周文章',
                    type: 'pie',
                    // radius 通过圆心表示百分比，通过半径表示数据大小
                    roseType: 'radius',
                    // 15是内圆半径，95外圆半径
                    radius:[15, 95],
                    center: ['50%', '40%'],
                    data: [
                        { value: 320, name: '工业' },
                        { value: 240, name: '技术' },
                        { value: 149, name: '外汇' },
                        { value: 100, name: '黄金' },
                        { value: 59, name: '展望' }
                    ],
                    animationType: 'scale',
                    animationDuration: 2600,
                    animationEasing: 'elasticOut'
                }
            })
        }
    }
}
</script>