<template>
  <layout>
    <telemete slot="main">
      <Table
        :columns="columns"
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :stripe="false"
        table-padding
        :page-size="pageSize"
        :page="page"
        :total="total"
        @getData="getData"
      >
        <template slot-scope="scope" slot="action">
          <div style="text-align: center">
            <span
              class="btn"
              :class="[
                scope.row.status === 1 ? 'color-disable' : 'color-success'
              ]"
              type="text"
              @click="changeStatus(scope.row, 1)"
            >
              采纳
            </span>
            |
            <span
              class="btn"
              :class="[
                scope.row.status === -1 ? 'color-disable' : 'color-success'
              ]"
              type="text"
              @click="changeStatus(scope.row, -1)"
            >
              拒绝
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
import { componentList, componentEdit } from '@/api/component'
export default {
  name: 'Account',
  components: {
    layout,
    Table
  },
  data() {
    return {
      page: 1,
      pageSize: 15,
      total: 0,
      tableData: [],
      columns: [
        { title: '序号', key: 'id', align: 'center', minWidth: '24' },
        {
          title: '厂商',
          key: 'vendor',
          align: 'center'
        },
        {
          title: '类型',
          key: 'label',
          align: 'center'
        },
        {
          title: '型号',
          key: 'model',
          align: 'center'
        },
        {
          title: '固件',
          key: 'firmware',
          align: 'center'
        },
        {
          title: '公司',
          key: 'companyName',
          align: 'center'
        },
        {
          title: '用户',
          key: 'userName',
          align: 'center'
        },
        {
          title: '状态',
          key: 'statusStr',
          align: 'center'
        },
        { title: '创建时间', key: 'createtime', align: 'center' },
        { title: '操作', slot: 'action' }
      ]
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
      componentList({
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
          item.createtime = item.createtime.substr(0, 10)
          item.statusStr =
            item.status === 0
              ? '待审核'
              : item.status === 1
              ? '采纳'
              : item.status === -1
              ? '拒绝'
              : '其他'
          tableData.push(item)
        })
        this.tableData = tableData
      })
    },
    changeStatus(row, status) {
      if (row.status === status) {
        return
      }
      componentEdit(row.id, { status }).then(res => {
        this.$message.success('修改成功')
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
</style>
