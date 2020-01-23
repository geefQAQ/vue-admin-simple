<template>
    <div>
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
        <el-row class="va-chart-wrapper">
            <line-chart :chart-data="lineChartData"/>
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="va-chart-wrapper">
                    <radar-chart />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="va-chart-wrapper">
                    <pie-chart />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="va-chart-wrapper">
                    <bar-chart />
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="8">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin-bottom: 32px;">
                <transaction-table />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RadarChart from './components/RadarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
const lineChartData = {
  newVisitors: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
    name: 'AdminDashboard',
    data() {
        return {
            lineChartData: lineChartData.newVisitors
        }
    },
    components: { PanelGroup, LineChart, RadarChart, PieChart, BarChart, TransactionTable},
    methods: {
        handleSetLineChartData(val) {
            this.lineChartData = lineChartData[val]
        }
    }
}
</script>
<style lang="scss" scoped>
.va-chart-wrapper {
    padding: 16px 16px 0;
    margin-bottom: 32px;
    background-color: #fff;
    height: 100%;
}
</style>