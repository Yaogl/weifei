<template>
  <div class="spead-charts-container" v-loading="loading">
    <div class="chart" name="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { brandTop } from '@/api/home'

export default {
  data() {
    return {
      instance: '',
      chartData: [],
      loading: false,
      total: 0
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
    getBrandInfo (country) {
      this.loading = true
      const params = country ? { country } : {}
      brandTop(params).then(res => {
        this.total = 0
        if (res && res.length) {
          res.map(item => {
            if (item.count) {
              this.total++
            }
            item.name = item.brandName
            item.value = item.count
          })
        }
        this.chartData = res || []
        this.loading = false
        this.initCharts(this.chartData)
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    initCharts(data) {
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
    getChartOption(data) {
      return {
        // itemGap: 20,
        //     left: 'center',
        //     top: '56%'
        title: [{
          text: this.total,
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
            data
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
