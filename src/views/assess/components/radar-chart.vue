<template>
  <!-- 雷达图 -->
  <div class="radar-charts-container">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {}
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
    chartData() {
      this.initCharts()
    }
  },
  mounted() {
    if (JSON.stringify(this.chartData) !== '{}') {
      this.initCharts()
    }
  },
  beforeDestroy() {
    this.instance && this.instance.dispose()
  },
  methods: {
    initCharts() {
      this.instance && this.instance.dispose()
      this.instance = echarts.init(this.$el.querySelector("[name='chart']"))
      const option = this.getChartOption()
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('没有实例化')
      }
      this.instance.setOption(option)
    },
    getChartOption() {
      const data = []
      const names = []
      let max = 100
      if (this.chartData && this.chartData.groupResult) {
        Object.keys(this.chartData.groupResult).map(key => {
          const val = this.chartData.groupResult[key]
          max = max > val ? max : val
          names.push({ name: key, min: 0 })
          data.push(val)
        })
        // 外圈设置统一最大值
        names.map(item => {
          item.max = max
        })
      }
      return {
        color: ['rgba(89, 203, 116, 1)'],
        radar: [
          {
            radius: '60%',
            name: {
              textStyle: {
                color: '#000',
                fontSize: 12
              },
              formatter: function(params) {
                const i = names.findIndex(item => item.name === params)
                return `${params}\n${data[i]}`
              }
            },
            indicator: names,
            center: ['50%', '50%'], // 位置
            shape: 'circle', // 形状
            splitArea: {
              areaStyle: {
                color: 'transparent', // 圆环颜色
                shadowColor: 'rgba(2, 187, 80, 0.13)', // 圆颜色
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: '#E1E7F2' // 分割线
              }
            },
            splitLine: {
              lineStyle: {
                color: '#E1E7F2', // 圆线
                width: 1
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            data: [
              {
                value: data,
                symbolSize: 0,
                areaStyle: {
                  shadowColor: 'rgba(2, 187, 80, 0.13)' // 圆颜色
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.radar-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
