<template>
  <div class="page">
    <!-- 异常详情 -->
    <div class="anomaly-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="anomaly-title">安全能力情况</p>
          <div class="safe-ability-chart">
            <RadarChart :chartData="collectionInfo" />
          </div>
        </el-col>
        <el-col :span="12">
          <p class="anomaly-title">设备与漏洞</p>
          <div class="safe-ability-chart">
            <DoubleBarChart :chartData="analyseTypeData" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="anomaly-title">工业漏洞分布</p>
          <div class="leak-chart">
            <ProcessChart :chartData="vulnerabilitiesChart" />
          </div>
        </el-col>
        <el-col :span="12">
          <p class="anomaly-title">漏洞级别</p>
          <div class="leak-chart">
            <CircleChart :chartData="safeLevelChart" />
          </div>
        </el-col>
      </el-row>
      <div style="position: relative;">
        <el-button
          size="small"
          style="position: absolute;right: 0;top: 20px;z-index: 1000;"
          @click.stop="expandAll"
        >
          展开全部漏洞
          <i v-if="allDeExpand" class="el-icon-caret-top" />
          <i v-else class="el-icon-caret-bottom" />
        </el-button>
        <el-tabs v-model="activeName" class="mt-20">
          <el-tab-pane label="设备" name="first">
            <div
              v-for="(item, index) in deviceList"
              :key="index"
              class="leak-item"
            >
              <div class="header">
                <el-row type="flex" align="middle" justify="center">
                  <el-col :span="18" class="left">
                    <span>{{ index + 1 }}</span>
                    <span>{{ item.device && item.device.label }}</span>
                    <span>{{ item.device && item.device.type }}</span>
                    <span>{{ item.device && item.device.data.model }}</span>
                  </el-col>
                  <el-col :span="6" align="right" style="padding-right: 20px;">
                    <span
                      style="cursor: pointer;"
                      @click="expandItem(item)"
                    >展开
                      <i v-if="item.expand" class="el-icon-caret-top" />
                      <i v-else class="el-icon-caret-bottom" />
                    </span>
                  </el-col>
                </el-row>
              </div>
              <div v-show="item.expand" class="content">
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">漏洞编号</el-col>
                  <el-col :span="17" class="info" style="color: #02BB50;">
                    <a
                      v-for="(vul, idx) in item.vulnerabilities.filter(e=>e.cnvdLink)"
                      :key="idx"
                      :href="vul.cnvdLink"
                      target="_blank"
                      style="margin: 0 20px;"
                    >
                      {{ vul.cnvdId }}
                    </a>
                  </el-col>
                </el-row>
                <el-row v-if="item.device.data.system" :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">操作系统</el-col>
                  <el-col :span="17" class="info">
                    {{ item.device.data.system }}
                  </el-col>
                </el-row>
                <el-row v-if="item.device.data.system_version" :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">系统版本</el-col>
                  <el-col :span="17" class="info" style="color: #FF8C00;">{{
                    item.device.data.system_version
                  }}</el-col>
                </el-row>
                <el-row v-if="item.device.data.vendor" :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">厂商</el-col>
                  <el-col :span="17" class="info" style="color: #FE4D4B;">{{
                    item.device.data.vendor
                  }}</el-col>
                </el-row>
                <el-row v-if="item.device.data.model" :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">型号</el-col>
                  <el-col :span="17" class="info" style="color: #FE4D4B;">{{
                    item.device.data.model
                  }}</el-col>
                </el-row>
                <el-row v-if="item.device.data.firmware" :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">固件</el-col>
                  <el-col :span="17" class="info" style="color: #FE4D4B;">{{
                    item.device.data.firmware
                  }}</el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">产品介绍</el-col>
                  <el-col :span="17" class="info">
                    <p v-for="(vul, idx) in item.vulnerabilities" :key="idx">
                      {{ vul.vulnerabilitySummary }}
                    </p>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">产品分类</el-col>
                  <el-col :span="17" class="info">{{
                    item.device.label
                  }}</el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="漏洞" name="second">
            <div
              v-for="(item, index) in vulnerabilities"
              :key="index"
              class="leak-item"
            >
              <div class="header">
                <el-row type="flex" align="middle" justify="center">
                  <el-col :span="18" class="left">
                    <span>{{ index + 1 }}</span>
                    <span>{{ item.dangerLevel }}危漏洞</span>
                    <span>{{ item.cnvdId }}</span>
                    <span>{{ item.vulnerabilityType }}</span>
                  </el-col>
                  <el-col :span="6" align="right" style="padding-right: 20px;">
                    <span
                      style="cursor: pointer;"
                      @click="expandItem(item)"
                    >展开
                      <i v-if="item.expand" class="el-icon-caret-top" />
                      <i v-else class="el-icon-caret-bottom" />
                    </span>
                  </el-col>
                </el-row>
              </div>
              <div v-show="item.expand" class="content">
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">漏洞编号</el-col>
                  <el-col :span="17" class="info" style="color: #02BB50;">
                    <a :href="item.cnvdLink" target="_blank">{{
                      item.cnvdId
                    }}</a>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">描述</el-col>
                  <el-col :span="17" class="info">
                    {{ item.vulnerabilitySummary }}
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">漏洞级别</el-col>
                  <el-col :span="17" class="info" style="color: #FF8C00;">{{
                    item.dangerLevel
                  }}</el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">漏洞类型</el-col>
                  <el-col :span="17" class="info" style="color: #FE4D4B;">{{
                    item.vulnerabilityType
                  }}</el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">影响设备</el-col>
                  <el-col :span="17" class="info" style="color: #FE4D4B;">{{
                    item.affectedProducts
                  }}</el-col>
                </el-row>
                <el-row :gutter="10" class="border">
                  <el-col :span="7" class="sub-title">解决方案</el-col>
                  <el-col :span="17" class="info">{{ item.suggestion }}</el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from './components/radar-chart'
import DoubleBarChart from './components/double-bar-chart'
import ProcessChart from './components/process-chart'
import CircleChart from './components/circle-chart'
import {
  getVulnerabilities,
  getDevicesUnnormal,
  getVulnerabilitiesChart,
  getSafeLevelChart,
  getAnalyseTypeChart
} from '@/api/topo'

export default {
  components: {
    RadarChart,
    DoubleBarChart,
    ProcessChart,
    CircleChart
  },
  props: {
    collectionInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeName: 'first',
      deviceList: [],
      vulnerabilities: [],
      loading: true,
      vulnerabilitiesChart: [],
      safeLevelChart: [],
      analyseTypeData: {}
    }
  },
  computed: {
    allDeExpand() {
      if (this.activeName === 'first') {
        return !this.deviceList.find(item => !item.expand)
      } else {
        return !this.vulnerabilities.find(item => !item.expand)
      }
    }
  },
  async created() {
    const id = this.$route.query.id
    this.initChart(id)
    const device = await getDevicesUnnormal(id)
    if (device.code === 200) {
      this.deviceList = this.uniqListByType(device.data)
    }
    const vul = await getVulnerabilities(id)
    if (vul.code === 200) {
      this.vulnerabilities = vul.data.map(item => {
        item.expand = false
        return item
      })
    }
    this.loading = false
  },
  methods: {
    uniqListByType (list) {
      const map = new Map()
      list.map(item => {
        item.expand = false
        const { display_type, data: { firmware, model, vendor }} = item.device
        const key = display_type + firmware + model + vendor
        if (!map.has(key)) {
          map.set(key, item)
        }
      })
      const clone = []
      for (const value of map.values()) {
        clone.push(value)
      }
      return clone
    },
    initChart(id) {
      getVulnerabilitiesChart(id).then(res => {
        if (res.code === 200) {
          this.vulnerabilitiesChart = res.data
        }
      })
      getSafeLevelChart(id).then(res => {
        if (res.code === 200) {
          this.safeLevelChart = res.data
        }
      })
      getAnalyseTypeChart(id).then(res => {
        if (res.code === 200) {
          this.analyseTypeData = res.data
        }
      })
    },
    expandItem(item) {
      item.expand = !item.expand
    },
    expandAll() {
      if (this.activeName === 'first') {
        const hasOpen = this.deviceList.every(item => item.expand)
        this.deviceList.map(item => {
          item.expand = !hasOpen
        })
      } else {
        const hasOpen = this.vulnerabilities.every(item => item.expand)
        this.vulnerabilities.map(item => {
          item.expand = !hasOpen
        })
      }
    }
  }
}
</script>
<style lang="scss">
.anomaly-info {
  .el-tabs__active-bar {
    background: transparent;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__content {
    padding: 10px 0 !important;
    border: none !important;
  }
}
</style>
<style lang="scss" scoped>
.anomaly-info {
  padding: 0 40px;
  .anomaly-title {
    font-size: 14px;
    color: #202020;
    line-height: 46px;
  }
  .leak-chart,
  .safe-ability-chart {
    height: 466px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(217, 223, 235, 0.59);
    border-radius: 2px;
    border: 1px solid #e1e7f2;
  }
  .leak-chart {
    height: 300px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .leak-item {
    .header {
      height: 60px;
      border: 1px solid #f0f0f0;
      font-size: 14px;
      color: #202020;
      line-height: 60px;
      .left {
        span {
          padding: 0 20px;
        }
      }
    }
    .content {
      color: #333444;
      border: 1px solid #f0f0f0;
      border-top: none;
      font-size: 14px;
      .sub-title,
      .info {
        padding: 20px !important;
        background: #f8f8f8;
      }
      .sub-title {
        border-right: 1px solid #f0f0f0;
      }
      .info {
        color: #575757;
      }
      .border {
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        line-height: 24px;
      }
    }
  }
}
</style>
