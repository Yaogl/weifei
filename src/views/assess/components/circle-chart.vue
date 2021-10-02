<template>
  <div class="circle-charts-container">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      instance: ''
    }
  },
  watch: {
    chartData(val) {
      this.initCharts(val)
    }
  },
  mounted() {
    if (this.chartData.length) {
      this.initCharts(this.chartData)
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
      var indata = []
      for (var i = 0; i < chartData.length; i++) {
        indata.push({
          name: chartData[i].danger_level,
          value: chartData[i].count
        })
      }

      return {
        color: ['#FF8C00', '#D73E43', '#979797'],
        title: {
          text: '漏洞级别',
          textStyle: {
            color: '#484848',
            fontSize: 17
          },
          itemGap: 20,
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['36%', '55%'],
            center: ['50%', '50%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 3,

            label: {
              show: true,
              position: 'outside',
              formatter: '{a|{b}}\n{b|{c}}\n',
              rich: {
                a: {
                  padding: [0, 0, -40, 0],
                  fontSize: 14
                },
                b: {
                  padding: [30, 0, 0, 0],
                  fontSize: 14
                }
              }
            },
            labelLine: {
              normal: {
                length: 30,
                length2: 30,
                lineStyle: {
                  width: 1,
                  color: '#CDCDCD'
                }
              }
            },
            data: indata
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.circle-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
