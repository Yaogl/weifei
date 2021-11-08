<template>
  <el-card class="nodes-container">
    <el-table
      :data="tableList"
      tooltip-effect="dark"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column label="FileName" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.originFileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifytime" label="modifytime" show-overflow-tooltip  min-width="140"/>
      <el-table-column prop="size" label="Size" show-overflow-tooltip  min-width="180" />
      <el-table-column label="operation" min-width="120">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="deleteRow(scope.row.id)">delete</el-button>
            <el-button :loading="scope.row.downloadLoading" type="text" @click="downloadRow(scope.row)">download</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mt-10 mr-10 ml-10 mb-10">
      <el-col :span="8">
        {{ total }}
        <span style="font-size: 12px;color: #999999;" class="mr-20">Items</span>
        <el-select v-model="query.pageSize" @change="changePages" size="mini" style="width: 130px">
          <el-option
            v-for="item in [5, 10, 20, 30, 40]"
            :key="item"
            :label="item + ' items/page'"
            :value="item">
            {{ item }} items/page
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16" align="right">
        <el-pagination
          v-if="total > 0"
          :current-page="query.curPage"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="query.pageSize"
          :total="total"
          :pager-count="4"
          layout="prev, pager, next"
          @size-change="changePages"
          @current-change="currentChange"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { fileListDeliver, uploadFileDel, getUploadUrl } from '@/api/machineinspect'
import List from '@/components/List'

export default {
	extends: List,
  data() {
    return {
    }
  },
  methods: {
		fetchApi: fileListDeliver,
    deleteApi: uploadFileDel,
    downloadRow(row) {
      window.location.href = getUploadUrl(row.id)
    },
    formatData(list) {
      return list.map(item => {
        item.downloadLoading = false
        return item
      })
    },
    downloadAsBuffer(data, name) {
      const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
