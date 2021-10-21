<template>
  <div class="nodes-container">
    <el-table
      :data="tableList"
      tooltip-effect="dark"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column label="WAN IP" min-width="160">
        <template slot-scope="scope">
          <span style="color: #00B64B;">{{ scope.row.originIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="FileName" min-width="140">
        <template slot-scope="scope">
          <span style="color: #00B64B;">{{ scope.row.originFileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifytime" label="modifytime" show-overflow-tooltip  min-width="140"/>
      <el-table-column prop="size" label="Size" show-overflow-tooltip  min-width="180" />
      <el-table-column label="operation" min-width="120">
        <template slot-scope="scope">
          <div style="text-align: right">
            <el-button type="text" @click="delGetItem(scope.row)">删除</el-button>
            <el-button type="text">下载</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mt-10 mr-10 ml-10 mb-10">
      <el-col :span="24" align="right">
        <el-pagination
          v-if="total > 0"
          :current-page="query.pageSize"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="query.size"
          :total="total"
          :pager-count="4"
          layout="prev, pager, next"
          @size-change="changePages"
          @current-change="currentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fileListDeliver } from '@/api/machineinspect'
import List from '@/components/List'

export default {
	extends: List,
  data() {
    return {
    }
  },
  methods: {
		fetchApi: fileListDeliver
  }
}
</script>
