<template>
  <!-- 仪表盘 -->
  <div class="dashboard-charts-container">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    score: {
      type: [Number, String],
      default: 0
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
    score(val) {
      this.initCharts(val)
    }
  },
  beforeDestroy() {
    this.instance && this.instance.dispose()
  },
  methods: {
    initCharts(data) {
      this.instance && this.instance.dispose()
      this.instance = echarts.init(this.$el.querySelector("[name='chart']"))
      const option = this.getChartOption(data)
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('没有实例化')
      }
      this.instance.setOption(option)
    },
    getChartOption(score) {
      return {
        series: [
          {
            name: '信用评分',
            type: 'gauge',
            detail: {
              fontSize: 40,
              offsetCenter: [0, 0]
            },
            data: [
              {
                value: score || 0,
                name: '评估得分'
              }
            ],
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              offsetCenter: [0, '40%'],
              fontSize: 12,
              color: '#434444'
            },
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLabel: {
              distance: -13,
              fontSize: 6,
              color: '#1C1E1F'
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 4,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: '#E43F3D'
                      },
                      {
                        offset: 0.15,
                        color: '#E98E2C'
                      },
                      {
                        offset: 0.2,
                        color: '#DDBD4D'
                      },
                      {
                        offset: 0.8,
                        color: '#7CBB55'
                      },
                      {
                        offset: 1,
                        color: '#9CD6CE'
                      }
                    ])
                  ]
                ]
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.dashboard-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
