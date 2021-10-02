<template>
  <div class="page">
    <div class="container assess-list">
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header">
          <div class="header">
            筛选
          </div>
        </div>
        <el-form
          ref="elForm"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="top"
        >
          <div class="flex-x">
            <div>
              <el-form-item label="企业名称">
                <el-input
                  v-model="query.companyName"
                  label="企业名称"
                  type="text"
                  clearable
                  placeholder="请输入企业名称"
                  @clear="getData(1)"
                  @keyup.native.enter="getData(1)"
                  @blur="getData(1)"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="评估状态">
                <el-select
                  v-model="query.status"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="评估中" :value="1" />
                  <el-option label="未评估" :value="0" />
                  <el-option label="评估完成" :value="2" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="安全级别">
                <el-select
                  v-model="query.safeLevel"
                  clearable
                  placeholder="请选择"
                >
                  <el-option label="高" value="高" />
                  <el-option label="中" value="中" />
                  <el-option label="低" value="低" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="关联问卷">
                <el-select
                  v-model="query.surveyId"
                  placeholder="请选择"
                  clearable
                >
                  <el-option label="已关联" :value="1" />
                  <el-option label="未关联" :value="0" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="评估时间">
                <el-date-picker
                  v-model="dateRange"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyyMMddHHmm"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-card>
      <el-card
        class="box-card"
        style="margin-top: 20px;padding-bottom: 30px"
      >
        <div class="header">
          <span>评估管理</span>
          <el-button v-if="canAdd" type="success" @click="jumpToTopo">创建评估</el-button>
        </div>
        <Table
          v-loading="loading"
          :columns="columns"
          :data="tableData"
          :header-cell-style="{ textAlign: 'center' }"
          :stripe="false"
          :total="total"
          :pageSize="query.pageSize"
          @getData="getData"
        >
          <template slot-scope="scope" slot="companyName">
            <div style="text-align: center">
              <span class="color-success">{{ scope.row.companyName }}</span>
            </div>
          </template>
          <template slot-scope="scope" slot="status">
            <div style="text-align: center">
              <span
                class="status"
                :class="[scope.row.status === 0 ? 'status0' : 'status1']"
              >
                <i v-if="scope.row.status === 0">未评估</i>
                <i v-if="scope.row.status === 1">评估中</i>
                <i v-if="scope.row.status === 2">评估完成</i>
              </span>
            </div>
          </template>
          <!-- 0 草稿 1 使用中 2 未使用 -->
          <template slot-scope="scope" slot="topologyStatus">
            <div style="text-align: center">
              <span v-if="scope.row.topologyStatus === 0">草稿</span>
              <span v-if="scope.row.topologyStatus === 1">使用中</span>
              <span v-if="scope.row.topologyStatus === 2">未使用</span>
            </div>
          </template>
          <!-- 0 未关联 1 已关联 -->
          <template slot-scope="scope" slot="surveyStatus">
            <div style="text-align: center">
              <span v-if="scope.row.surveyStatus === 0">未关联</span>
              <span v-if="scope.row.surveyStatus === 1">已关联</span>
            </div>
          </template>

          <template slot-scope="scope" slot="key8">
            <div style="text-align: center">
              <span
                class="btn color-success"
                type="text"
                @click="$router.push(`/assess/topo-list?id=${scope.row.id}`)"
              >拓扑图</span>
              |
              <span
                class="btn color-success"
                type="text"
                @click="relation(scope.row)"
              >
                结合问卷
              </span>
              |
              <span
                class="btn"
                :class="[scope.row.status !== 0 || scope.row.surveyStatus == 1 ? 'color-success' : '']"
                type="text"
                @click="jumpDetail(scope.row)"
              >评估详情</span>
            </div>
          </template>
        </Table>
        <el-dialog
          title="结合问卷"
          :visible.sync="dialogVisible"
          width="800px"
          :before-close="handleClose"
        >
          <div v-loading="questionLoading">
            <el-radio-group v-model="checkQuestion" style="width: 100%;">
              <el-radio
                v-for="(item, index) in questionList"
                :key="index"
                style="display: inline;"
                :label="item.id"
              >{{ item.surveyName }}</el-radio>
            </el-radio-group>
            <p
              v-if="!questionList.length && !questionLoading"
              style="text-align: center;"
            >
              暂无数据
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="linkQuestion">
              确 定
            </el-button>
          </span>
        </el-dialog>
      </el-card>
      <el-card v-if="!tableData.length && !loading" class="box-card" style="margin-top: 20px">
        <Empty class="empty-box" :showBtn="false" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Empty from '@/components/Empty/empty'
import Table from '@/components/Table/index'
import {
  finishAssessInfo,
  getAssessList,
  getSurveyCollections,
  linkSurveyCollection
} from '@/api/topo'
import dayjs from 'dayjs'

export default {
  name: 'AssessList',
  components: {
    Empty,
    Table
  },
  data() {
    return {
      dialogVisible: false,
      checkQuestion: '',
      loading: false,
      query: {
        companyName: '',
        status: '',
        safeLevel: '',
        surveyId: '',
        timeStart: '',
        timeEnd: '',
        pageSize: 10,
        page: ''
      },
      total: 0,
      dateRange: '',
      tableData: [],
      columns: [
        { title: '序号', key: 'index', align: 'center', minWidth: 50 },
        { title: 'ID', key: 'id', align: 'center', minWidth: 50 },
        { title: '被评估企业', slot: 'companyName', align: 'center', minWidth: 120 },
        { title: '创建时间', key: 'createtime', align: 'center', minWidth: 150 },
        { title: '评估状态', slot: 'status', align: 'center', minWidth: 100 },
        { title: '拓扑状态', slot: 'topologyStatus', align: 'center', minWidth: 100 },
        { title: '问卷状态', slot: 'surveyStatus', align: 'center', minWidth: 90 },
        { title: '攻击链路数量', key: 'vulnerabilityNum', align: 'center', minWidth: 100 },
        { title: '安全级别', key: 'safeLevel', align: 'center', minWidth: 90 },
        { title: '操作', slot: 'key8', minWidth: 180 }
      ],
      questionList: [],
      curRow: {},
      questionLoading: false,
      questionQuery: {
        companyId: '',
        page: 1,
        pageSize: 10000
      },
      questionTotal: 0
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    canAdd() {
      let b = false
      this.permissions.forEach(item => {
        if (item.children) {
            item.children.forEach(child => {
              if (child.url == 'assess/add') {
                b = true
              }
            })
        }
      })
      return b
    }
  },
  watch: {
    'query.status'() {
      this.getData(1)
    },
    'query.safeLevel'() {
      this.getData(1)
    },
    'query.surveyId'() {
      this.getData(1)
    },
    'dateRange'(val) {
      this.getData(1)
      if (val && val.length) {
        this.query.timeStart = val[0]
        this.query.timeEnd = val[1]
      } else {
        this.query.timeStart = ''
        this.query.timeEnd = ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(page = 1) {
      this.loading = true
      this.query.page = page
      getAssessList(this.query).then(({ data: { items, pager }}) => {
        this.loading = false
        this.total = pager.total
        this.tableData = items.map((it, index) => {
          it.index = index + 1
          it.createtime = dayjs(it.createtime).format('YYYY-MM-DD hh:mm:ss')
          return it
        })
      })
    },
    relation(row) {
      this.curRow = row
      this.questionQuery.companyId = row.companyId
      this.dialogVisible = true
      this.getQuestionList(1)
    },
    getQuestionList(page) {
      this.questionLoading = true
      this.questionQuery.page = page
      getSurveyCollections(this.questionQuery)
        .then(res => {
          this.questionLoading = false
          const { items, pager } = res.data
          this.questionList = items
          this.questionTotal = pager.total
        })
        .catch(() => {
          this.questionLoading = false
        })
    },
    linkQuestion() {
      if (!this.checkQuestion) {
        return this.$message.warning('请选择要结合的问卷')
      }
      const data = {
        id: this.curRow.id,
        surveyCollectionId: this.checkQuestion
      }
      linkSurveyCollection(data).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message.success('操作成功')
          this.getData(this.query.page)
          this.checkQuestion = ''
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    jumpDetail(row) {
      if (row.status == 0 && row.surveyStatus == 0) return
      if (row.status == 1) {
        finishAssessInfo(row.id).then((res) => {
          console.log(res)
          this.$router.push(`/assess/info?id=${row.id}`)
        })
      } else {
        this.$router.push(`/assess/info?id=${row.id}`)
      }
    },
    jumpToTopo() {
      this.$router.push('/assess/add')
    }
  }
}
</script>
<style lang="scss">
.assess-list {
  .el-table td .cell {
    line-height: 24px;
    padding: 15px 0;
  }
}
</style>

<style lang="scss" scoped>
@import 'global';
.box-card {
  width: 100%;
  margin-bottom: 20px;
  .header {
    font-size: $font-md;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .flex-x {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    & > div {
      padding-right: 20px;
      flex: 1;
    }
    & > div:first-child {
      width: 242px;
    }
  }
}
.empty-box {
  min-height: 60vh;
}
.status {
  padding: 5px 14px;
}

.status1 {
  background: #e2faea;
  color: #02bb50;
}
.status0 {
  background: #dadfe7;
  color: #858aa0;
}
.color-success {
  color: $color-success;
}

.btn:hover {
  cursor: pointer;
}
.checkBox {
  display: flex;
  flex-direction: column;
  & .el-checkbox {
    padding: 10px 0;
  }
}
</style>
