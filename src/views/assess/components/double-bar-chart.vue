<template>
  <!-- 双轴柱状图 -->
  <div class="double-bar-charts-container">
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
    chartData(val) {
      if (val.assessVulnerability && val.topologyNode) {
        this.initCharts()
      }
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
    // 计算最大值
    calMax(arr) {
      const max = Math.max(...arr)
      const maxint = Math.ceil(max / 9.5) // 不让最高的值超过最上面的刻度
      let maxval = maxint * 10 // 让显示的刻度是整数

      // 为了防止数据为0时，Y轴不显示，给个最大值
      if (maxval == 0) {
        maxval = 1
      }
      return maxval
    },
    // 计算最小值
    calMin(arr) {
      const min = Math.min(...arr)
      const minint = Math.floor(min / 10)
      const minval = minint * 10 // 让显示的刻度是整数
      return minval
    },
    getChartOption() {
      const xaxisData = this.chartData.topologyNode.map(item => item.type)
      const data1 = this.chartData.topologyNode.map(item => item.count)
      const data2 = this.chartData.assessVulnerability.map(item => item.sum)
      const Max1 = this.calMax(data1)
      const Min1 = this.calMin(data1)
      const Max2 = this.calMax(data2)
      const Min2 = this.calMin(data2)
      return {
        color: ['#59CB74', '#D73E43'],
        grid: {
          top: '8%',
          bottom: '20%',
          left: '10%',
          right: '10%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'circle',
          data: ['工控产品', '漏洞'],
          bottom: '2%'
        },
        xAxis: {
          data: xaxisData,
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: 'rgba(228, 228, 228, 1)',
              width: 1
            }
          },
          axisTick: {
            show: false // 隐藏X轴刻度
          },
          axisLabel: {
            rotate: 40,
            show: true,
            textStyle: {
              color: '#AAABBB',
              fontSize: 16
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            min: Min1,
            max: Max1,
            splitNumber: 5,
            interval: (Max1 - Min1) / 5,
            nameTextStyle: {
              color: '#ebf8ac',
              fontSize: 16
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#AAABBB',
                fontSize: 16
              }
            }
          },
          {
            type: 'value',
            /* name: "同比",*/
            nameTextStyle: {
              color: '#ebf8ac',
              fontSize: 16
            },
            min: Min2,
            max: Max2,
            splitNumber: 5,
            interval: (Max2 - Min2) / 5,

            position: 'right',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FF4141',
                fontSize: 16
              }
            }
          }
        ],
        series: [
          {
            name: '工控产品',
            type: 'bar',
            barWidth: '25%',
            data: data1
          },
          {
            name: '漏洞',
            yAxisIndex: 1,
            type: 'bar',
            barWidth: '25%',
            data: data2
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.double-bar-charts-container {
  height: 100%;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
