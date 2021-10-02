<template>
  <layout>
    <telemete slot="main">
      <Table
        v-loading="loading"
        :columns="columns"
        :data="tableData"
        :total="total"
        :header-cell-style="{ textAlign: 'center' }"
        :stripe="false"
        table-padding
        @getData="getData"
      >
        <templat slot="table-header">
          <div class="flex-x">
            <el-button
              icon="el-icon-plus"
              type="success"
              @click="$router.push('/question/title-question')"
            >新建问卷</el-button>
            <div class="flex-x">
              <el-select
                v-model="statusValue"
                clearable
                placeholder="请选择"
                style="margin-right: 20px"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                placeholder="请输入问卷名称"
                suffix-icon="el-icon-search"
              />
            </div>
          </div>
        </templat>

        <template slot-scope="scope" slot="key3">
          <div style="text-align: center">
            <span class="status">
              {{ dayjs(scope.row.key3).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </template>
        <template slot-scope="scope" slot="key5">
          <div style="text-align: center">
            <span
              class="status"
              :class="[scope.row.key4 === 0 ? 'status0' : 'status1']"
            >{{ scope.row.key5 }}</span>
          </div>
        </template>
        <template slot-scope="scope" slot="key6">
          <div style="text-align: center">
            <span
              class="btn color-success point"
              @click="
                $router.push(`/question/title-question?id=${scope.row.id}`)
              "
            >查看问卷</span>
          </div>
        </template>

        <template slot-scope="scope" slot="key7">
          <div style="text-align: center">
            <el-popover placement="bottom" width="100" trigger="hover">
              <div style="line-height: 35px">
                <div
                  class="point active"
                  @click="
                    $router.push(`/question/title-question?id=${scope.row.id}`)
                  "
                >
                  编辑问卷
                </div>
                <div
                  class="point active"
                  @click="
                    $router.push(
                      `/question/title-question?copyId=${scope.row.id}`
                    )
                  "
                >
                  复制问卷
                </div>
                <div class="point active" @click="del(scope.row.id)">删除</div>
              </div>
              <i slot="reference" class="point el-icon-more" />
            </el-popover>
          </div>
        </template>
      </Table>
    </telemete>
  </layout>
</template>

<script>
import layout from './setLayout'
import Table from '@/components/Table/index'
import dayjs from 'dayjs'

export default {
  name: 'Question',
  components: {
    layout,
    Table
  },
  data() {
    return {
      dayjs,
      tableData: [],
      total: 0,
      pageSize: 10,
      loading: false,
      columns: [
        {
          title: '问卷名称',
          key: 'key1',
          align: 'center',
          className: 'table-success-color'
        },
        { title: '创建人', key: 'key2', align: 'center' },
        { title: '创建时间', slot: 'key3', width: '220px', align: 'center' },
        { title: '答卷', key: 'key4', align: 'center' },
        { title: '状态', slot: 'key5', align: 'center' },
        { title: '操作', slot: 'key6' },
        { title: '更多功能', slot: 'key7' }
      ],
      statusValue: 'all',
      status: [
        {
          value: 'all',
          label: '全部问卷'
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(page = 1) {
      this.loading = true
      this.$axios({
        url: '/surveys/list',
        method: 'get',
        params: this.getParams(page)
      }).then(({ data: { items, pager }}) => {
        this.loading = false
        this.total = pager.total
        this.tableData = items.map(item => {
          return {
            id: item.id,
            key1: item.name,
            key2: '管理员',
            key3: item.updatetime,
            key4: item.status,
            key5: item.statusStr
          }
        })
      })
    },
    getParams(page) {
      return {
        page,
        pageSize: this.pageSize
      }
    },
    del(id) {
      this.$axios({
        url: `/surveys/delete/${id}`,
        method: 'delete'
      }).then(() => {
        this.tableData.splice(
          this.tableData.findIndex(item => item.id === id),
          1
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'global';
.color-success {
  color: $color-success;
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
.flex-x {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.point {
  cursor: pointer;
}
.active:hover {
  color: $color-success;
}
</style>
