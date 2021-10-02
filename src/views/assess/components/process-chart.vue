<template>
  <!-- 进度图 -->
  <div class="process-charts-container">
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
      instance: '',
      colors: ['#FE4D4B', '#F79452', '#FFB952', '#FBD54A', '#ADDF84', '#3FDDC7']
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
    getChartOption(chartData) {
      const data = []
      const yAxisData = []
      let total = 0
      chartData.map(item => {
        data.push(item.count)
        total += item.count
        yAxisData.push(item.vulnerability_type)
      })
      const chartWidth = this.$el
        .querySelector("[name='chart']")
        .getBoundingClientRect().width
      return {
        grid: {
          left: '5%', // 距离dom间距
          right: '4%',
          top: '10%',
          bottom: '1%'
        },
        xAxis: [
          {
            type: 'value',
            axisPointer: {
              type: 'shadow'
            },
            // 横坐标 分割线等取消显示
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              verticalAlign: 'bottom',
              align: 'left',
              padding: [0, 1, 10, 6],
              textStyle: {
                fontSize: 12,
                color: value => {
                  const index = yAxisData.findIndex(item => item === value)
                  return this.colors[index]
                }
              }
            },
            // 纵坐标数据
            data: yAxisData,
            yAxisIndex: 0,
            // 横坐标 分割线等取消显示
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              inside: false,
              verticalAlign: 'bottom',
              // 位置 上右下左
              padding: [-20, 1, -7, -50],
              lineHeight: '40',
              textStyle: {
                fontSize: 12,
                color: '#202020'
              },
              formatter: function(val) {
                return ((val / total) * 100).toFixed(2) + '%'
              }
            },
            // 纵坐标模拟
            data
          }
        ],
        series: [
          {
            type: 'bar',
            // 宽度
            barWidth: '12',
            showBackground: true,
            // 全部背景
            backgroundStyle: {
              color: '#EEF2F9',
              borderRadius: 30
            },
            label: {
              show: true,
              position: [(chartWidth * 0.9) / 2, -15]
            },
            data,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: params => {
                  return this.colors[params.dataIndex]
                },
                show: true,
                textStyle: {
                  fontSize: 11
                }
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
.process-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
