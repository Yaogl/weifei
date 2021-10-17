<template>
  <div class="dashboard-container">
    <div class="left">
      <div class="protocol-distribution">
        <h3 class="title">Protocol distribution</h3>
        <ProcessBar ref="protocal" />
      </div>
      <div class="global-distribution" v-loading="globalLoading">
        <h3 class="title">Global distribution</h3>
        <el-row :gutter="10" style="margin-bottom: 0.2rem;">
          <el-col :span="15" offset="3" style="color: #A8AAAF;">Countries/Regions</el-col>
          <el-col :span="6" style="color: #A8AAAF;">Ratio</el-col>
        </el-row>
        <el-row :gutter="10" v-for="(item, index) in globlList" :key="index" class="global-item">
          <el-col :span="3">{{ index + 1 }}</el-col>
          <el-col :span="15" class="center-flex">
            <div class="img">
              <img src="../../assets/img/up.png" alt="" v-if="item.rise === 1">
              <img src="../../assets/img/down.png" alt="" v-if="item.rise === -1">
              <img src="../../assets/img/unchanged.png" alt="" v-if="item.rise === 0">
            </div>
            <div class="name">
              {{ item.country }}
            </div>
          </el-col>
          <el-col :span="6" style="color: #FF4141;font-weight: 900;">{{ item.percent }}%</el-col>
        </el-row>
      </div>
    </div>
    <div class="center">
      <div class="map-search" style="position: relative;">
        <div class="mb-20" style="position: relative;z-index: 4;">
          <el-input v-model="country" placeholder="Enter Country/ Region" @focus="showmore = true" @blur="blurinput">
            <i
              class="el-icon-search"
              slot="suffix"
              @click="handleIconClick">
            </i>
            <span slot="prefix">
              World
            </span>
          </el-input>
          <div v-show="showmore" style="position: absolute;z-index: 3; width: 4.4rem;background: #212631;padding: 0.15rem;">
            <p style="font-family: PingFangSC-Regular;font-size: 0.14rem;color: #777777;line-height: 24px;">
              Top searchedCountries
            </p>
            <div style="flex-wrap: wrap;display: flex;">
              <span class="country-name" @click="setQuery('U.S.A')">U.S.A</span>
              <span class="country-name" @click="setQuery('U.S.A')">U.S.A</span>
            </div>
          </div>
        </div>
        <el-row style="position: relative;z-index: 2;pointer-events: none;">
          <el-col :span="14">
            <h2 style="font-family: Helvetica-Bold;font-size: 0.32rem;color: #4BFC48;line-height: 0.7rem;font-weight: 700;">
              ACTIVE NODES 2,090,023
            </h2>
            <h3 style="font-family: Helvetica-Bold;font-size: 0.24rem;color: #CCC;line-height: 0.6rem;font-weight: 700;">ALL NODES 2,090,023</h3>
          </el-col>
          <el-col :span="10" align="right">
            <el-row class="level">
              <el-col :span="12" class="circle-before high" align="center" style="color: #DC3939">
                High density
              </el-col>
              <el-col :span="12" class="circle-before low" align="center" style="color: #DC3939;">
                Low density
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;z-index: 1">
          <WorldMap ref="worldMap" />
        </div>
      </div>
      <div class="center-chart">
        <el-row type="flex" align="middle">
          <el-col :span="8" class="chart-title">
            Active nodes
          </el-col>
          <el-col :span="16" align="right" class="chart-btn">
            <el-radio-group v-model="month" @change="changeMonth" :disabled="activeLoading">
              <el-radio-button label="1">1 months</el-radio-button>
              <el-radio-button label="3">3 months</el-radio-button>
              <el-radio-button label="6">6 months</el-radio-button>
              <el-radio-button label="12">12 months</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <NodesLine style="height: 2rem;" v-loading="activeLoading" :chartData="activeList" />
      </div>
    </div>
    <div class="right">
      <div class="top" v-loading="topTenLoading">
        <h3 class="title">Top 10 of domainame across</h3>
        <el-row style="margin-bottom: 0.2rem;">
          <el-col :span="15" style="color: #A8AAAF;">Domain name</el-col>
          <el-col :span="9" style="color: #A8AAAF;" align="right">Visit number</el-col>
        </el-row>
        <div class="top-flex" v-for="item in topTenList" :key="item.name">
          <div class="top-left">
            <img src="../../assets/img/inter.png" alt="">
            <div class="url">
              {{ item.name }}
            </div>
          </div>
          <div class="top-right">
            {{ item.cnt }}
          </div>
        </div>
      </div>
      <div class="brand-spreading">
        <h3 class="title">Brand spreading</h3>
        <SpeadChart class="chart" ref="brand" />
      </div>
    </div>
  </div>
</template>

<script>
import SpeadChart from './components/spead-chart'
import ProcessBar from './components/process-bar.vue'
import NodesLine from './components/nodes-line.vue'
import WorldMap from './components/world-map.vue'
import { domainTop, globalStatic, activeStatic } from '@/api/home'

export default {
  name: 'Dashboard',
  components: {
    SpeadChart,
    ProcessBar,
    NodesLine,
    WorldMap
  },
  mounted () {
    this.init()
  },
  data() {
    return {
      month: '1',
      country: '',
      showmore: false,
      globalLoading: false,
      activeLoading: false,
      topTenLoading: false,
      activeList: [],
      topTenList: [],
      globlList: []
    }
  },
  methods: {
    init () {
      // 协议统计页面获取方法 传入国家参数
      this.$refs.protocal.getListInfo(this.country)
      // 获取世界地图数据
      this.$refs.worldMap.getWorldData(this.country)
      this.initGlobal() // 获取全球统计信息
      this.initActive() // 获取活跃统计
      this.initTopTen() // 获取域名统计 top10
      // 品牌统计 top20+其他
      this.$refs.brand.getBrandInfo(this.country)
    },
    initTopTen () {
      this.topTenLoading = true
      const params = this.country ? { country: this.country } : {}
      domainTop(params).then(res => {
        this.topTenList = res
        this.topTenLoading = false
      }).catch(err => {
        console.log(err)
        this.topTenLoading = false
      })
    },
    changeMonth () {
      this.initActive()
    },
    initActive () {
      this.activeLoading = true
      const { country, month } = this
      const params = { country, month }
      activeStatic(params).then(res => {
        if (res && res.length) {
          this.activeList = res
        }
        this.activeLoading = false
      })
    },
    initGlobal () {
      this.globalLoading = true
      const params = this.country ? { country: this.country } : {}
      globalStatic(params).then(res => {
        this.globlList = res
        this.globalLoading = false
      }).catch(err => {
        console.log(err)
        this.globalLoading = false
      })
    },
    handleIconClick () {
      this.init()
    },
    setQuery (item) {
      this.country = item
    },
    blurinput () {
      setTimeout(() => {
        this.showmore = false
      }, 300)
    }
  }
}
</script>
<style lang="scss">
.dashboard-container {
  .map-search{
    .el-input__prefix, .el-input__suffix{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
      font-size: 0.18rem;
    }
    input::-webkit-input-placeholder {
      color: #333;
    }
    input::-moz-input-placeholder {
      color: #333;
    }
    input::-ms-input-placeholder {
      color: #333;
    }
    .el-input{
      width: 4.4rem;
      border: none;
    }
    .el-input__inner{
      padding-left: 60px;
      background: #4BFC48;
      height: 0.48rem;
      width: 4.4rem;
    }
    .el-input__suffix-inner{
      .el-icon-search{
        font-size: 0.18rem;
        font-weight: 700;
      }
    }
    .el-input__prefix, .el-input__suffix-inner{
      color: #333;
    }
  }
  .country-name{
    margin-right: 0.2rem;
    font-size: 0.14rem;
    color: #FFFFFF;
    line-height: 0.24rem;
    cursor: pointer;
  }
  .chart-btn{
    .el-radio-button__inner{
      background: #2E3442;
      border-radius: 2px;
      color: #CCCCCC;
      font-size: 0.16rem;
      border-color: #15181F;
    }
    .is-active{
     .el-radio-button__inner{
        background: #fff;
        border-radius: 2px;
        color: #000;
        border-color: #15181F;
      } 
    }
  }
}
</style>
<style lang="scss" scoped>
.dashboard-container {
  min-height: 100%;
  width: 100%;
  background: #15181F;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .center{
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .map-search{
      flex: 1;
      width: 8.94rem;
      margin-top: 0.2rem;
    }
    .center-chart{
      width: 8.94rem;
      height: 2.65rem;
      background: #212631;
      border-radius: 0.04rem;
      margin-bottom: 0.1rem;
      padding: 0.2rem;
    }
    .chart-title{
      font-family: Helvetica;
      font-size: 0.24rem;
      color: #4BFC48;
    }
    .level{
      display: inline-block;
      margin-top: 0.2rem;
      width: 2.62rem;
      height: 0.32rem;
      background: rgba(255,255,255,0.15);
      border-radius: 0.16rem;
      .circle-before {
        font-size: 0.14rem;
        line-height: 0.32rem;
        &:before {
          display: inline-block;
          content: "";
          width: 0.14rem;
          height: 0.14rem;
          border-radius: 50%;
          margin-right: 0.04rem;
          vertical-align: middle;
        }
        &.high {
          &:before {
            background: #FF4141;
          }
        }
        &.low {
          &:before {
            background: #4F1718;
          }
        }
      }
    }
    .chart-btn{
      .el-radio-button__inner{
        background: #2E3442;
        border-radius: 2px;
      }
    }
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
