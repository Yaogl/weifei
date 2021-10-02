<template>
  <div class="page">
    <bread />
    <!-- 评估详情 -->
    <div v-loading="loading" id="assess-info" ref="content" class="assess-info">
      <el-card :body-style="{ padding: '20px' }">
        <el-row class="flex">
          <el-col :span="18" class="flex">
            <span class="title">评估企业：{{ collection.companyName }}</span>
            <span class="label">智能制造</span>
          </el-col>
          <el-col :span="6" align="right">
            <el-button type="primary" size="small" @click="downHtmlToPDF">导出评估报告</el-button>
          </el-col>
        </el-row>
        <div class="flex mt-20">
          <div class="charts">
            <DashboardChart :score="collectionInfo.all" />
          </div>
          <div class="divider">
            <el-divider direction="vertical" />
          </div>
          <div
            style="flex: 1;height: 116px; background: #F7F8FA; border-radius: 2px; border: 1px solid #E1E7F2; padding: 25px 30px;"
          >
            <el-row>
              <el-col :span="16" class="flex-bw">
                <p class="sub-label">评估状态</p>
                <el-button
                  v-if="collection.status === 0"
                  type="info"
                  size="mini"
                  style="width: 74px;"
                  plain
                >未评估</el-button>
                <el-button
                  v-if="collection.status === 1"
                  type="info"
                  size="mini"
                  style="width: 74px;"
                  plain
                >评估中</el-button>
                <el-button
                  v-if="collection.status === 2"
                  type="primary"
                  size="mini"
                  style="width: 74px;"
                  plain
                >评估完成</el-button>
              </el-col>
              <el-col :span="8" class="flex-bw">
                <p class="sub-label">评估时间</p>
                <p>
                  <span class="time">{{
                    collectionInfo.createtime
                      ? dayjs(collectionInfo.createtime).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )
                      : '未知'
                  }}</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
      <el-card class="mt-20">
        <div slot="header">评估详情</div>
        <div>
          <RadarChart style="height: 500px;" :chartData="collectionInfo" />
          <el-table
            :header-cell-style="{ background: '#f8f8f8', color: '#202020' }"
            :data="degreeLevel"
            border
            style="width: 100%"
          >
            <el-table-column prop="dl" label="数字信息化程度" />
            <el-table-column prop="sl" label="网络信息安全程度" />
          </el-table>
        </div>
      </el-card>

      <el-card class="mt-20">
        <div slot="header">可能存在的信息风险</div>
        <div v-if="collectionInfo.pr && collectionInfo.pr.length">
          <div
            v-for="(item, index) in collectionInfo.pr"
            :key="index"
            class="danger-item"
          >
            <p class="title">{{ index + 1 }}、{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </el-card>
      <el-card class="mt-20" style="margin-bottom: 30px;">
        <div slot="header">整改意见</div>
        <el-table
          :header-cell-style="{ background: '#f8f8f8', color: '#202020' }"
          :data="collectionInfo.sg || []"
          style="width: 100%"
        >
          <el-table-column prop="title" label="" width="180" />
          <el-table-column prop="desc" label="整改意见" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import DashboardChart from './components/dashboard-chart'
import RadarChart from './components/radar-chart'
import { getSurveyQuestion, getSurveyCollectionAssess } from '@/api/topo'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import { downloadPDF } from '@/utils/htmlToPdf'

export default {
  components: {
    DashboardChart,
    RadarChart
  },
  data() {
    return {
      dayjs,
      collection: {},
      degreeLevel: [{}],
      collectionInfo: {},
      loading: false
    }
  },
  created() {
    const id = this.$route.query.id
    this.surveyCollection(id)
  },
  methods: {
    ...mapActions('topo', ['initTopoComponents']),
    downHtmlToPDF() {
      downloadPDF(this.$refs.content, this.collection.companyName + '评估报告')
    },
    surveyCollection(id) {
      this.loading = true
      getSurveyCollectionAssess(id)
        .then(res => {
          if (res.code === 200) {
            this.collectionInfo = res.data
            this.degreeLevel = [
              {
                dl: res.data?.dl,
                sl: res.data?.sl
              }
            ]
          }
          getSurveyQuestion(id).then(res => {
            if (res.code === 200) {
              this.collection = res.data?.collection || {}
            }
            this.loading = false
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.assess-info {
  .flex {
    display: flex;
    align-items: center;
  }
  .danger-item {
    padding: 10px 20px;
    margin-bottom: 20px;
    background: #f8f8f8;
    border-radius: 5px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333444;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #202020;
      line-height: 28px;
    }
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
}
</style>
