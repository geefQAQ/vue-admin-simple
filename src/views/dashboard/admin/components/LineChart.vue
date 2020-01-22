<template>
    <div :style="{width: width, height: height}"></div>
</template>
<script>
import echarts from 'echarts'
// 为什么要用require，不用import
// require('echarts/theme/macarons') 
import 'echarts/theme/macarons'
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '350px'
        },
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null,
        }
    },
    watch: {
        chartData: {
            // https://cn.vuejs.org/v2/api/#watch
            // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
            deep: true,
            handler(val) {
                this.setOptions(val)
            }
        }
    },
    mounted() {
        // https://cn.vuejs.org/v2/api/#mounted
        // 确保整个 dashboard 这个 view 渲染完后，再挂载
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if(this.chart) {
            return
        }
        // 销毁实例，实例销毁后无法再被使用。
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData)
        },
        setOptions({ expectedData, actualData } = {} ) {
            // 属性不懂看文档https://www.echartsjs.com/zh/option.html
            this.chart.setOption({
                xAxis: {
                    data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"],
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    top: 30,
                    left: 10,
                    right: 20,
                    bottom: 30,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                legend: {
                    data:['期望值','实际值']
                },
                yAxis: {},
                series: [{
                    name: '期望值', 
                    itemStyle: {
                        // normal 表默认状态
                        normal: {
                            color: '#FF005A',
                            lineStyle: {
                                width: 2
                            }
                        },
                        // emphasis 表高亮状态
                        // emphasis: {
                        //     color: '#000000',
                        // }
                    },
                    smooth: true,
                    type: 'line',
                    data: expectedData,
                    animationDuartion: 3000,
                    animationEasing: 'cubitInout'
                },
                {
                    name: '实际值',
                    itemStyle: {
                        normal: {
                            color: '#3888fa',
                            lineStyle: {
                                width: 2,
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    data: actualData,
                    type: 'line',
                    smooth: false,
                    animationDuration: 500,
                    animationEasing: 'quadraticOut'

                }]
            })
        }
    }
}
</script>