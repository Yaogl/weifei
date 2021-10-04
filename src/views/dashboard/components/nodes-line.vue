<template>
  <div class="nodes-line-container">
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
      default: () => []
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
        grid: {
          top: '18%',
          bottom: '20%',
          left: '5%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#A9AEB1'
            }
          },
          data: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27']
        },
        yAxis: {
          type: 'value',
          name: 'Volume (10K)',
          nameTextStyle: {
            color: '#fff',
            padding: [0, 0, 0, 15]
          },
          axisLine: {
            lineStyle: {
              color: '#3F4C5A'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#A9AEB1'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#3F4C5A'
            }
          }
        },
        series: [
          {
            data: [1, 1.5, 1.4, 1.7, 3, 2.3, 1.3, 1, 1.5, 1.4, 1.7, 3, 2.3, 1.3],
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: '#01E776'
            },
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(1, 223, 114, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(1, 223, 114, 0.3)'
                }
              ])
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.nodes-line-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
