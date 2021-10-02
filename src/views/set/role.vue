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
        <templat slot="table-header">
          <el-button
            icon="el-icon-plus"
            type="success"
            @click="$router.push('/set/role-add')"
          >添加角色</el-button>
        </templat>

        <template slot-scope="scope" slot="key3">
          <div style="text-align: center">
            <span class="status">
              {{ dayjs(scope.row.key3).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </template>

        <template slot-scope="data" slot="key6">
          <div style="text-align: center">
            <span
              class="btn color-success "
              type="text"
              @click="$router.push(`/set/role-add?id=${data.row.key0}`)"
            >
              编辑
            </span>
            |
            <span
              class="btn color-success"
              type="text"
              @click="del(data.row.key0)"
            >
              删除
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
import { getRoles, delRole } from '@/api/role'
import dayjs from 'dayjs'

export default {
  name: 'Role',
  components: {
    layout,
    Table
  },
  data() {
    return {
      dayjs,
      tableData: [],
      columns: [
        { title: '序号', key: 'key0', align: 'center', minWidth: '24' },
        {
          title: '角色',
          key: 'key1',
          align: 'center',
          className: 'table-success-color'
        },
        { title: '创建人', key: 'key2', align: 'center' },
        { title: '创建时间', slot: 'key3', align: 'center' },
        { title: '操作', slot: 'key6' }
      ],
      page: 1,
      pageSize: 15,
      total: 0
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
      getRoles({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const {
          data: {
            items,
            pager: { total }
          }
        } = res
        this.total = total
        const tableData = []
        items.forEach(item => {
          tableData.push({
            key0: item.id,
            key1: item.name,
            key2: item.creatorName,
            key3: item.createtime
          })
        })
        this.tableData = tableData
      })
    },
    del(id) {
      if (id === 1 || id === 2) {
        this.$message.warning('禁止删除')
        return false
      }
      delRole(id).then(res => {
        this.$message.success('删除成功')
        this.getData()
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
</style>
