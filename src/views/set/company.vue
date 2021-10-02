<template>
  <layout>
    <telemete slot="main">
      <Table
        :page-size="pageSize"
        :page="page"
        :total="total"
        :columns="columns"
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :stripe="false"
        table-padding
        @getData="getData"
      >
        <template slot="table-header">
          <div class="flex-x">
            <div class="flex-x">
              <el-input
                v-model="query.companyName"
                placeholder="请输入公司名称"
                label="企业名称"
                type="text"
                clearable
                suffix-icon="el-icon-search"
                @clear="getData(1)"
                @keyup.native.enter="getData(1)"
                @blur="getData(1)"
              />
            </div>
          </div>
        </template>
        <template slot-scope="scope" slot="key7">
          <div style="text-align: center;">
            <span class="status">
              {{ dayjs(scope.row.key7).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </template>

        <template slot-scope="data" slot="key8">
          <div style="text-align: center">
            <span
              class="btn color-success "
              type="text"
              @click="$router.push(`/assess/company-edit?id=${data.row.key0}`)"
            >
              编辑
            </span>
          </div>
        </template>
      </Table>
    </telemete>
  </layout>
</template>

<script>
import layout from './setLayout'
import Table from '@/components/Table/index'
import { getCompanys } from '@/api/company'
import dayjs from 'dayjs'

export default {
  name: 'Company',
  components: {
    layout,
    Table
  },
  data() {
    return {
      dayjs,
      tableData: [],
      query: {
        companyName: ''
      },
      columns: [
        { title: '序号', key: 'key0', align: 'center', minWidth: '24' },
        {
          title: '公司名称',
          key: 'key1',
          align: 'center',
          className: 'table-success-color'
        },
        { title: '省市县', key: 'key2', align: 'center' },
        { title: '上市情况', key: 'key3', align: 'center' },
        { title: '产业领域', key: 'key4', align: 'center' },
        { title: '联系人', key: 'key5', align: 'center' },
        { title: '联系电话', key: 'key6', align: 'center' },
        { title: '创建时间', slot: 'key7', width: '220px', align: 'center' },
        { title: '操作', slot: 'key8', align: 'center' }
      ],
      page: 1,
      pageSize: 15,
      total: 0
    }
  },
  watch: {
    'query.companyName'() {
      this.getData(1)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(num = false) {
      if (num !== false) {
        this.page = num
      }
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      if (this.query.companyName) {
        params.companyName = this.query.companyName
      }
      getCompanys(params).then(res => {
        const {
          data: {
            items,
            pager: { total }
          }
        } = res
        this.total = total
        const tableData = []
        items?.forEach(item => {
          tableData.push({
            key0: item.id,
            key1: item.companyName,
            key2: '' + item.province + item?.city + item?.county,
            key3: item.ipoStatus,
            key4: item.companyDomain,
            key5: item.contactName,
            key6: item.contactPhone,
            key7: item.createtime?.substr(0, 10)
          })
        })
        this.tableData = tableData
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

.flex-x {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
