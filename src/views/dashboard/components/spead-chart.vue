<template>
  <div class="spead-charts-container">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getHomeDevices } from '@/api/topo'

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [
        { name: '张三1', value: 18 },
        { name: '张三2', value: 21 },
        { name: '张三3', value: 18 },
        { name: '张三4', value: 18 }
      ]
    },
    title: {
      type: [String, Object],
      default: ''
    }
  },
  mounted () {
    this.initCharts(this.chartData)
  },
  data() {
    return {
      instance: ''
    }
  },
  beforeDestroy() {
    this.instance && this.instance.dispose()
  },
  methods: {
    initCharts(data) {
      this.instance && this.instance.dispose()
      this.instance = echarts.init(this.$el.querySelector('[name="chart"]'))
      const option = this.getChartOption(data)
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('没有实例化')
      }
      this.instance.setOption(option)
    },
    getChartOption(chartData) {
      return {
        tooltip: {},
        color: [
          '#20D78F',
          '#3BC2D7',
          '#E8E8E8',
          '#F7D301',
          '#FF8B00',
          '#AE49F6',
          '#64EF2D',
          '#2A83EF'
        ],
        legend: {
          orient: 'vertical',
          right: '2%',
          top: '15%',
          icon: 'pin',
          textStyle: {
            color: '#fff'
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['45%', '55%'],
            center: ['35%', '44%'],
            label: {
              show: false
            },
            itemStyle: {
              borderColor: '#1D253E',
              borderWidth: 2
            },
            labelLine: {
              show: false
            },
            data: this.chartData
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.spead-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
