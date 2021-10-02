<template>
  <div class="page">
    <bread />
    <!-- 评估详情 -->
    <div ref="content" class="assess-info">
      <el-card :body-style="{ padding: '20px' }">
        <el-row class="flex">
          <el-col :span="18" class="flex">
            <span
              class="title"
            >评估企业：{{ assessInfo.assessDetail.companyName }}</span>
            <span class="label">智能制造</span>
          </el-col>
          <el-col :span="6" align="right">
            <el-button type="primary" size="small" @click="downHtmlToPDF">导出评估报告</el-button>
          </el-col>
        </el-row>
        <div class="flex mt-20">
          <div class="charts">
            <DashboardChart v-if="collectionInfo" :score="collectionInfo.all" />
          </div>
          <div class="divider">
            <el-divider direction="vertical" />
          </div>
          <div
            style="flex: 1;height: 116px; background: #F7F8FA; border-radius: 2px; border: 1px solid #E1E7F2; padding: 25px 30px;"
          >
            <el-row>
              <el-col :span="4" class="flex-bw">
                <p class="sub-label">评估状态</p>
                <el-button
                  v-if="assessInfo.assessDetail.status === 0"
                  type="info"
                  size="mini"
                  style="width: 74px;"
                  plain
                >未评估</el-button>
                <el-button
                  v-if="assessInfo.assessDetail.status === 1"
                  type="info"
                  size="mini"
                  style="width: 74px;"
                  plain
                >评估中</el-button>
                <el-button
                  v-if="assessInfo.assessDetail.status === 2"
                  type="primary"
                  size="mini"
                  style="width: 74px;"
                  plain
                >评估完成</el-button>
              </el-col>
              <el-col :span="4" class="flex-bw">
                <p class="sub-label">安全级别</p>
                <el-button
                  type="primary"
                  size="mini"
                  style="width: 74px;"
                  plain
                >{{
                  assessInfo.assessDetail.safeLevel
                    ? assessInfo.assessDetail.safeLevel + '危漏洞'
                    : '未知'
                }}</el-button>
              </el-col>
              <el-col :span="4" class="flex-bw">
                <p class="sub-label">攻击链路数量</p>
                <p class="number">{{ assessInfo.attackLinkTotal }}</p>
              </el-col>
              <el-col :span="4" class="flex-bw">
                <p class="sub-label">发现漏洞数量</p>
                <p class="number">
                  {{ assessInfo.vulnerabilityNum || 0 }}
                </p>
              </el-col>
              <el-col :span="8" class="flex-bw">
                <p class="sub-label">评估时间</p>
                <p>
                  <span class="time">{{
                    assessInfo.assessDetail &&
                      dayjs(assessInfo.assessDetail.createtime).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )
                  }}</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>

      <div class="mt-20">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="拓扑与攻击链路" name="first" />
          <el-tab-pane label="异常详情" name="second" />
          <el-tab-pane label="整改意见" name="third" />
        </el-tabs>
        <el-card>
          <div v-show="activeName === 'first'" style="display: flex;">
            <div style="flex: 1;">
              <el-form label-width="120px">
                <el-form-item label="查询链路：">
                  <el-input
                    v-model="query.nodeStart"
                    size="small"
                    class="w-2"
                    placeholder="起点链路组件编号"
                  />
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  <el-input
                    v-model="query.nodeEnd"
                    class="w-2"
                    size="small"
                    placeholder="终点链路组件编号"
                  />
                  <el-button
                    type="primary"
                    size="small"
                    style="margin-left: 20px;"
                    @click="getLinks"
                  >查询链路</el-button>
                </el-form-item>
              </el-form>
              <div v-loading="loading" class="link-topo">
                <Topology
                  ref="topo"
                  :nodes="nodeDatas"
                  showScroll
                  :interacting="false"
                  :useLayout="useLayout"
                  @postGraph="postGraph"
                />
                <div class="tool-bar">
                  <div class="color-item">
                    <span
                      v-for="(item, index) in colorList"
                      :key="index"
                      class="color-span"
                      :style="{
                        background: item,
                        height: '10px',
                        display: 'inline-block',
                        width: '72px',
                        position: 'relative'
                      }"
                    >
                      <i
                        style="position: absolute; display: inline-block;height: 6px;width: 1px; background: #eee;top: 13px; left: 0;"
                      >
                        <em
                          style="fontSize: 11px;color: #888; display: inline-block;transform: translateX(-50%)"
                        >{{ 20 * index }}</em>
                      </i>
                      <i
                        v-if="index === 4"
                        style="position: absolute; display: inline-block;height: 6px;width: 1px; background: #eee;top: 13px; right: 0;"
                      >
                        <em
                          style="fontSize: 11px;color: #888; display: inline-block;transform: translateX(-50%)"
                        >100</em>
                      </i>
                    </span>
                  </div>
                  <div class="tool-add">
                    <i
                      class="el-icon-plus tool-icon"
                      @click="topoZoom(true)"
                    />
                    <i
                      class="el-icon-minus tool-icon"
                      @click="topoZoom(false)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <el-card
              style="margin-left: 20px;"
              :body-style="{ padding: '8px', width: '266px' }"
            >
              <div slot="header">
                <span>链路详情</span>
              </div>
              <el-collapse
                v-loading="loading"
                :value="collapse"
                accordion
                @change="changeCollape"
              >
                <el-collapse-item
                  v-for="(item, i) in tableList"
                  :key="i"
                  :title="`链路${i + 1}详情`"
                  :name="i"
                >
                  <div v-loading="item.loading" class="collapse-constainer">
                    <div
                      v-for="(device, index) in item.deviceInfo"
                      :key="index"
                    >
                      <p class="device-title">设备{{ device.deviceId }}</p>
                      <p class="device-info">
                        <span class="info-label">设备信息：</span>
                        <span
                          class="info"
                        >{{ device.deviceLabel }}、{{
                          device.deviceData.model
                        }}、{{ device.deviceData.vendor }}</span>
                      </p>
                      <p
                        v-for="(it, idx) in device.deviceVulnerabilities"
                        :key="idx"
                        class="device-info"
                      >
                        <span
                          class="info-label"
                        >{{ it.vulnerabilityType }}：</span>
                        <span class="info">{{ it.vulnerabilityName }}</span>
                      </p>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div
                v-if="!tableList.length && !loading"
                style="lineHeight: 250px;text-align: center;"
              >
                暂无数据
              </div>
              <el-pagination
                v-if="total > 0"
                :current-page="query.page"
                :page-sizes="[5, 10, 20, 30, 40]"
                :page-size="query.pageSize"
                :total="total"
                :pager-count="4"
                layout="prev, pager, next"
                @size-change="changePages"
                @current-change="currentChange"
              />
            </el-card>
          </div>
          <AnomalyInfo
            v-if="activeName === 'second' || isHtmlToPdf"
            :collectionInfo="collectionInfo"
          />
          <el-table v-show="activeName === 'third' || isHtmlToPdf" :data="suggestionList" style="width: 100%">
            <el-table-column prop="type" label="名称" width="120px" />
            <el-table-column prop="text" label="整改意见" />
          </el-table>
        </el-card>

      </div>
    </div>
  </div>
</template>

<script>
import Topology from '@/components/topology/show'
import DashboardChart from './components/dashboard-chart'
import AnomalyInfo from './anomaly-info'
import {
  getAssessInfo,
  getTopoInfo,
  attackLinksList,
  attackLinksInfo,
  attackLinksAnalyse,
  getSurveyCollectionAssess,
  getSuggestions
} from '@/api/topo'
import dayjs from 'dayjs'
import List from '@/components/List'
import { getTopoNodes } from './components/util'
import { downloadPDF } from '@/utils/htmlToPdf'
import { mapActions } from 'vuex'

export default {
  name: 'AssessInfo',
  components: {
    Topology,
    DashboardChart,
    AnomalyInfo
  },
  extends: List,
  data() {
    return {
      dayjs,
      graph: '',
      isHtmlToPdf: false,
      createdSearch: false,
      activeName: 'first',
      collapse: '',
      useLayout: false,
      assessInfo: { assessDetail: {}},
      colorList: [
        '#39D939',
        '#8FC30E',
        '#FBD02B',
        '#FE8A01',
        '#FE0100'
      ],
      query: {
        topologyId: '',
        nodeStart: '',
        nodeEnd: '',
        pageSize: 10,
        page: 1
      },
      nodeDatas: [],
      linksMap: [],
      suggestionList: [],
      collectionInfo: null,
      nodePercent: {}
    }
  },
  created() {
    const id = this.$route.query.id
    getAssessInfo(id).then(res => {
      this.assessInfo = res.data
      const topoId = this.assessInfo.assessDetail?.topologyId
      const surveyCollectionId = this.assessInfo.assessDetail?.surveyCollectionId
      this.query.topologyId = topoId
      topoId && this.initTopoDetail(topoId)
      surveyCollectionId && this.surveyCollection(surveyCollectionId)
    })
    if (!this.suggestionList.length) {
      getSuggestions(this.$route.query.id).then(res => {
        if (res.code === 200) {
          this.suggestionList = res.data
        }
      })
    }
  },
  methods: {
    downHtmlToPDF() {
      if (this.activeName !== 'second') {
        this.activeName = 'second'
        return this.$notify({
          title: '提示',
          message: '已为您切换至异常详情，请等待页面初始化完成后，点击导出'
        })
      }
      this.isHtmlToPdf = true
      setTimeout(() => {
        downloadPDF(this.$refs.content, this.assessInfo.assessDetail.companyName + '评估报告').then(res => {
          this.isHtmlToPdf = false
        })
      }, 300)
    },
    ...mapActions('topo', ['initTopoComponents']),
    fetchApi: attackLinksList,
    surveyCollection(id) {
      getSurveyCollectionAssess(id).then(res => {
        if (res.code === 200) {
          this.collectionInfo = res.data
        } else {
          this.collectionInfo = null
        }
      })
    },
    async initTopoDetail(id) {
      // 先获取组件列表，根据组件列表匹配页面需要展示的组件图片
      const params = {
        topologyId: id
      }
      await attackLinksAnalyse(params).then(res => {
        this.nodePercent = res.data
        // this.linksMap = res.data.attackLinkCount
        // this.drawEdge(this.linksMap)
      })
      await this.initTopoComponents()
      getTopoInfo(id).then(res => {
        const nodes = res.data.nodes.map(item => {
          item.percent = this.nodePercent[item.id] ? this.nodePercent[item.id] : 0
          return item
        })
        this.nodeDatas = getTopoNodes(nodes)
        this.useLayout = !(nodes.length && nodes[0].position)
        this.getLinks()
      })
    },
    getLinks() {
      this.graph && this.$refs.topo.reset()
      this.search()
    },
    afterSearch () {
      if (this.tableList.length > 0) {
        this.drawAttackEdge(this.tableList)
      }
    },
    // 暂时废弃
    drawEdge(linksMap) {
      linksMap.map(eg => {
        const cIndex = Math.min(Math.floor(eg.attackPercent / 20), 4)
        this.graph.addEdge({
          shape: 'edge',
          attrs: {
            line: {
              stroke: this.colorList[cIndex],
              sourceMarker: 'classic'
            }
          },
          router: {
            name: 'manhattan'
          },
          source: eg.nodeStart.toString(),
          target: eg.nodeEnd.toString()
        })
      })
    },
    getAttachLink (stroke, reverse, edge) {
      const clone = this.graph.cloneCells([edge])
      const base = clone[Object.keys(clone)[0]]
      if (reverse) {
        base.attr('line/targetMarker', null)
        base.attr('line/sourceMarker', 'classic')
      } else {
        base.attr('line/targetMarker', 'classic')
        base.attr('line/sourceMarker', null)
      }
      base.attr('line/stroke', stroke)
      return base
    },
    drawAttackEdge(attackList) {
      // this.nodePercent[item.id] ? this.nodePercent[item.id] : 0
      const edges = this.graph.getEdges()
      attackList.map(item => {
        const linksMap = []
        for (let i = 0; i < item.attackLink.length - 1; i++) {
          const nodeStart = item.attackLink[i] + ''
          const nodeEnd = item.attackLink[i + 1] + ''
          const attackPercent = this.nodePercent[item.attackLink[i]] ? this.nodePercent[item.attackLink[i]] : 0
          const cIndex = Math.min(Math.floor(attackPercent / 20), 4)
          console.log('color', this.colorList[cIndex])
          const stroke = this.colorList[cIndex]
          const hasSame = edges.find(item => item.source?.cell === nodeStart && item.target?.cell === nodeEnd)
          if (hasSame) {
            linksMap.push(this.getAttachLink(stroke, false, hasSame))
          }
          const hasReverse = edges.find(item => item.source.cell === nodeEnd && item.target.cell === nodeStart)
          if (hasReverse) {
            linksMap.push(this.getAttachLink(stroke, true, hasReverse))
          }
        }
        console.log('linksMap', linksMap)
        linksMap.map(eg => {
          this.graph.addEdge(eg)
        })
      })
    },
    changeCollape(index) {
      if (index === '') return
      const item = this.tableList[index]
      if (item.deviceInfo && item.deviceInfo.length) {
        return
      }
      item.loading = true
      attackLinksInfo(item.linkId, item.topologyId).then(res => {
        if (res.code === 200) {
          this.$set(this.tableList[index], 'deviceInfo', res.data.attackDetail)
        }
        this.tableList[index].loading = false
      })
    },
    formatData(list) {
      list.map(item => {
        item.loading = false
        item.deviceInfo = []
      })
      return list
    },
    postGraph(graph) {
      this.graph = graph
    },
    topoZoom(status) {
      const graph = this.$refs.topo.graph
      const cur = graph.zoom()
      if (status) {
        graph.zoom(0.1)
      } else {
        if (cur <= 0.1) return
        graph.zoom(-0.1)
      }
    }
  }
}
</script>
<style lang="scss">
.el-pagination {
  text-align: center;
}
.assess-info {
  .is-active,
  .el-tabs__content {
    background: #fff;
  }
  .is-top {
    margin: 0;
    height: 54px;
    line-height: 50px;
  }
  .el-tabs__content {
    border: 1px solid #eee;
    border-top: none;
  }
  .el-card__body {
    overflow: auto;
  }
}
</style>
<style lang="scss" scoped>
.assess-info {
  .flex {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 20px;
    color: #202020;
    margin-right: 10px;
  }
  .label {
    display: inline-block;
    height: 24px;
    line-height: 22px;
    padding: 0 12px;
    border-radius: 12px;
    font-size: 12px;
    color: #202020;
    border: 1px solid rgba(2, 187, 80, 0.3);
  }
  width: 1400px;
  margin: 0 auto;
  .mt-20 {
    margin-top: 20px;
  }
  .w-2 {
    width: 225px;
  }
  .divider {
    height: 155px;
    .el-divider--vertical {
      height: 100%;
      margin: 0 20px;
    }
  }
  .charts {
    height: 155px;
    width: 155px;
  }
  .flex-bw {
    display: flex;
    height: 66px;
    flex-direction: column;
    justify-content: space-between;
    .sub-label {
      color: #202020;
      font-size: 14px;
    }
    .number {
      font-size: 27px;
      font-family: Bebas;
      color: #202020;
    }
    .time {
      font-size: 16px;
      padding: 5px 8px;
      background: #fff;
      display: inline-block;
      border: 1px solid #dadfe7;
    }
  }
  .link-topo {
    height: 700px;
    position: relative;
    .tool-bar {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 1000;
      height: 62px;
      width: 450px;
      display: flex;
      .color-item {
        padding: 5px 15px;
        width: 400px;
        background: #ffffff;
        box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.11);
        border-radius: 2px;
        height: 62px;
        .color-span:first-child {
          border-radius: 6px 0 0 6px;
        }
        .color-span:last-child {
          border-radius: 0 6px 6px 0;
        }
      }
      .tool-add {
        margin-left: 18px;
        width: 32px;
        background: #fff;
        height: 62px;
        box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.11);
        border-radius: 2px;
        .tool-icon {
          height: 32px;
          font-size: 14px;
          cursor: pointer;
          display: block;
          text-align: center;
          line-height: 32px;
        }
      }
    }
  }
  .collapse-constainer {
    background: rgba(241, 243, 247, 0.69);
    border-radius: 4px;
    border: 1px solid #d3d9dd;
    padding: 10px;
    .device-title {
      font-size: 14px;
      line-height: 40px;
      color: #202020;
      font-weight: bold;
    }
    .device-info {
      line-height: 1.5em;
      margin-bottom: 5px;
    }
    .info-label {
      font-size: 12px;
      color: #202020;
      line-height: 18px;
    }
    .info {
      font-size: 12px;
      color: #2c324f;
    }
  }
}
</style>
