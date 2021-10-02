<template>
  <div class="page">
    <bread />
    <div class="container">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="title">历史版本</div>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" size="default" @click="jumpToAdd">新建拓扑图</el-button>
        </el-col>
      </el-row>
      <Table
        v-loading="loading"
        :columns="columns"
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :stripe="false"
        table-padding
      >
        <template slot-scope="scope" slot="status">
          <div style="text-align: center">
            <span v-if="scope.row.status === 0">草稿</span>
            <span v-if="scope.row.status === 1">使用中</span>
            <span v-if="scope.row.status === 2">未使用</span>
          </div>
        </template>
        <template slot-scope="scope" slot="key3">
          <div style="text-align: center">
            <span
              class="btn color-success"
              type="text"
              @click="jumpToEdit(scope.row.id)"
            >编辑</span>
            |
            <span
              class="btn"
              :class="[ canAdd ? 'color-success' : '']"
              type="text"
              @click="exportJson(scope.row.id)"
            >
              导出
            </span>
            |
            <span
              class="btn"
              :class="[scope.row.status !== 1 ? 'color-success' : '']"
              type="text"
              @click="useItem(scope.row)"
            >使用</span>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import { getTopoList, useTopo, exportTopo } from '@/api/topo'
import dayjs from 'dayjs'

export default {
  name: 'TopoList',
  components: {
    Table
  },
  data() {
    return {
      IMGURL: process.env.VUE_APP_IMAGE_URL,
      tableData: [],
      loading: true,
      columns: [
        { title: '序号', key: 'index', align: 'center', minWidth: '24' },
        {
          title: '创建时间',
          key: 'createtime',
          align: 'center'
        },
        {
          title: '状态',
          slot: 'status',
          align: 'center'
        },
        { title: '操作', slot: 'key3' }
      ],
      exportLoading: false
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
  created() {
    this.getAssessTopoList()
  },
  methods: {
    getAssessTopoList() {
      getTopoList(this.$route.query.id).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.map((item, index) => {
            item.index = index + 1
            item.createtime = dayjs(item.createtime).format(
              'YYYY-MM-DD hh:mm:ss'
            )
            return item
          })
        } else {
          this.$message.error('请求失败，请稍后重试')
        }
      })
    },
    exportJson(id) {
      if (this.exportLoading) {
        return this.$message.warning('导出中，请稍后')
      }
      this.exportLoading = true
      exportTopo(id).then(res => {
        this.exportLoading = false
        if (res.code === 200 && res.data) {
          const uri = this.IMGURL + res.data
          const link = document.createElement('a')
          link.setAttribute('href', uri)
          link.click()
        } else {
          this.$message.error('导出失败')
        }
      }).catch(() => {
        this.exportLoading = false
      })
      // getTopoInfo(id).then(res => {
      //   const data = JSON.stringify(res.data.nodes)
      //   const uri =
      //     'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data)
      //   const link = document.createElement('a')
      //   link.href = uri
      //   link.download = res.data.companyName + '.json'
      //   document.body.append(link)
      //   link.click()
      //   document.body.removeChild(link)
      // })
    },
    useItem(row) {
      if (row.status === 1) return
      useTopo(row.id).then(res => {
        if (res.code === 200) {
          this.$message.success('设置成功')
          this.getAssessTopoList()
        } else {
          this.$message.error('操作失败，请稍后重试')
        }
      })
    },
    jumpToAdd () {
      this.$router.push({
        path: '/assess/add',
        query: {
          assessId: this.$route.query.id
        }
      })
    },
    jumpToEdit(id) {
      this.$router.push({
        path: '/assess/add',
        query: {
          id,
          assessId: this.$route.query.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 20px;
  background: #fff;
}
@import 'global';
.title {
  text-indent: 10px;
  font-size: $font-md;
}
.color-success {
  color: $color-success;
}
.btn:hover {
  cursor: pointer;
}
</style>
