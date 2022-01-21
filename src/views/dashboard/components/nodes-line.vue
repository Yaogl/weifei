<template>
  <div class="nodes-line-container">
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
    }
  },
  watch: {
    chartData (newVal) {
      this.initCharts(newVal)
    }
  },
  data () {
    return {
      instance: ''
    }
  },
  beforeDestroy() {
    this.instance && this.instance.dispose()
    window.removeEventListener('resize', this.chartResize, false)
  },
  methods: {
    chartResize() {
      this.instance.resize()
    },
    initCharts (data) {
      this.instance && this.instance.dispose()
      this.instance = echarts.init(this.$el.querySelector('[name="chart"]'))
      const option = this.getChartOption(data)
      this.createChart(option)
    },
    createChart(option) {
      if (!this.instance) {
        return Promise.reject('error')
      }
      this.instance.setOption(option)
      this.chartResize()
      window.addEventListener('resize', this.chartResize)
    },
    getChartOption(chartData) {
      const xAxis = []
      const data = []
      // 获取数据最大值
      
      const max = Math.max.apply(null, chartData.map(item => item.num))
      let unit = ''
      if (max > 1000 * 100 && max < 1000 * 1000) {
        unit = 'Volume (K)'
      } else if (max >= 1000 * 1000){
        unit = 'Volume (10K)'
      } else {
        unit = 'Volumn'
      }
      chartData.forEach(it => {
        xAxis.push(it.date)
        data.push({
          name: it.date,
          value: unit === 'Volumn' ? it.num : unit === 'Volume (K)' ? it.num / 1000 : it.num / 10000,
          realValue: it.num
        })
      })
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderColor: 'rgba(255,255,255,0.15)',
          textStyle: {
            color: '#CFD1D5'
          },
          axisPointer: {
            lineStyle: {
              type: 'solid',
              color: '#131820'
            }
          },
          // 重置 圆点样式
          formatter: function(params) {
        　　var result = ''
        　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:12px;height:12px;background-color:#02E475;border: 3px solid #071122;"></span>'
        　　params.forEach(function (item) {
        　　　result += item.axisValue + "</br>" + dotHtml + item.data.realValue
        　　})
        　　return result
          }
        },
        grid: {
          top: '18%',
          bottom: '14%',
          left: '2%',
          right: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#A9AEB1'
            }
          },
          data: xAxis
        },
        yAxis: {
          type: 'value',
          name: unit,
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
            data,
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
