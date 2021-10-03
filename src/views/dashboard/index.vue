<template>
  <div class="dashboard-container">
    <div class="left">
      <div class="protocol-distribution">
        <h3 class="title">Protocol distribution</h3>
        <ProcessBar />
      </div>
      <div class="global-distribution">
        <h3 class="title">Global distribution</h3>
        <el-row :gutter="10" style="margin-bottom: 0.2rem;">
          <el-col :span="15" offset="4" style="color: #A8AAAF;">Countries/Regions</el-col>
          <el-col :span="5" style="color: #A8AAAF;">Ratio</el-col>
        </el-row>
        <el-row :gutter="10" v-for="(item, index) in globlList" :key="index" class="global-item">
          <el-col :span="4">{{ index + 1 }}</el-col>
          <el-col :span="15" class="center-flex">
            <div class="img">
              <img src="../../assets/img/up.png" alt="" v-if="item.status === 1">
              <img src="../../assets/img/down.png" alt="" v-if="item.status === 2">
              <img src="../../assets/img/unchanged.png" alt="" v-if="item.status === 3">
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </el-col>
          <el-col :span="5" style="color: #FF4141;font-weight: 900;">{{ item.radio }}</el-col>
        </el-row>
      </div>
    </div>
    <div class="center">1111</div>
    <div class="right">
      <div class="top">
        <h3 class="title">Top 10 of domainame across</h3>
        <el-row style="margin-bottom: 0.2rem;">
          <el-col :span="15" style="color: #A8AAAF;">Domain name</el-col>
          <el-col :span="9" style="color: #A8AAAF;" align="right">Visit number</el-col>
        </el-row>
        <div class="top-flex" v-for="i in 8" :key="i">
          <div class="top-left">
            <img src="../../assets/img/inter.png" alt="">
            <div class="url">
              http://baidu.comhttp://baidu.comhttp://baidu.com
            </div>
          </div>
          <div class="top-right">
            38382991
          </div>
        </div>
      </div>
      <div class="brand-spreading">
        <h3 class="title">Brand spreading</h3>
        <SpeadChart :chartData="devicesData" class="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import SpeadChart from './components/spead-chart'
import ProcessBar from './components/process-bar.vue'

export default {
  name: 'Dashboard',
  components: {
    SpeadChart,
    ProcessBar
  },
  data() {
    return {
      globlList: [
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 2, radio: '15%' },
        { name: '美国', status: 3, radio: '15%' },
        { name: '美国美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' },
        { name: '美国', status: 1, radio: '15%' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #15181F;
  .center{
    flex: 1;
  }
  .title{
    font-family: Helvetica-Bold;
    font-size: 0.24rem;
    color: #FFFFFF;
    line-height: 0.24rem;
    font-weight: 700;
    margin-bottom: 0.15rem;
  }
  .protocol-distribution, .global-distribution, .top, .brand-spreading{
    background: #212631;
    border-radius: 0.02rem;
    padding: 0.2rem;
  }
  .protocol-distribution{
    width: 4.4rem;
    height: 4rem;
    margin: 0.2rem 0 0.1rem 0.2rem;
  }
  .global-distribution{
    width: 4.4rem;
    height: 5.4rem;
    margin: 0.2rem 0 0.1rem 0.2rem;
    font-family: DIN-Medium;
    font-size: 0.2rem;
    font-weight: 500;
    .global-item{
      margin: 0.18rem 0;
    }
    .center-flex{
      display: flex;
      color: #F4F4F5;
      align-items: center;
      .img{
        padding: 0 0.1rem;
      }
      .name{
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img{
        width: 0.14rem;
      }
    }
  }
  .top{
    width: 4.66rem;
    height: 5.68rem;
    margin: 0.2rem 0.2rem 0.1rem 0;
    font-size: 0.2rem;
    .top-flex{
      display: flex;
      margin-bottom: 0.16rem;
      .top-left{
        flex: 1;
        background: #2E3442;
        border-radius: 3px;
        height: 0.4rem;
        display: flex;
        align-items: center;
        img{
          margin: 0 0.08rem;
        }
        .url{
          flex: 1;
          overflow: hidden;
          width: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .top-right{
        margin-left: 0.38rem;
        line-height: 0.4rem;
      }
    }
  }
  .brand-spreading{
    width: 4.66rem;
    height: 3.7rem;
    margin: 0.2rem 0.2rem 0.1rem 0;
    .chart{
      height: 3.2rem;
    }
  }
}
</style>
