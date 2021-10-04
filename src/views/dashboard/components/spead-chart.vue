<template>
  <div class="spead-charts-container">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [
        { name: '张三1', value: 18 },
        { name: '张三2', value: 21 },
        { name: '张三3', value: 18 },
        { name: '张三4', value: 18 },
        { name: '张三5', value: 18 },
        { name: '张三6', value: 18 },
        { name: '张三7', value: 18 },
        { name: '张三8', value: 18 },
        { name: '张三9', value: 18 },
        { name: '张三10', value: 18 },
        { name: '张三11', value: 18 },
        { name: '张三12', value: 18 },
        { name: '张三14', value: 18 },
        { name: '张三15', value: 18 },
        { name: '张三16', value: 18 },
        { name: '张三17', value: 18 }
      ]
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
        // itemGap: 20,
        //     left: 'center',
        //     top: '56%'
        title: [{
          text: '19823',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 26,
            textAlign: 'center',
          },
        }, {
          text: 'Brand Model',
          left: '50%',
          top: '40%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            color: '#fff',
            textAlign: 'center'
          }
        }],
        tooltip: {},
        color: [
          '#B32727',
          '#FF4141',
          '#D5511C',
          '#FF7837',
          '#FF9E33',
          '#E7981B',
          '#FFB933',
          '#FFD233',
          '#FFE633',
          '#C8EF2C',
          '#64EF2C',
          '#37D055',
          '#37D095',
          '#2FACDE',
          '#2077C5',
          '#4370DB',
          '#312DC3',
          '#7D4DF3',
          '#B34DF3',
          '#777888'
        ],
        series: [
          {
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['50%', '50%'],
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
