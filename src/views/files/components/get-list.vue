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
          <span style="color: #00B64B;">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="FileName" min-width="140">
        <template slot-scope="scope">
          <span style="color: #00B64B;">{{ scope.row.country }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="model" label="Time" show-overflow-tooltip  min-width="140"/>
      <el-table-column prop="firmware" label="Size" show-overflow-tooltip  min-width="180" />
      <el-table-column label="operation" min-width="120">
        <template slot-scope="scope">
          <div style="text-align: right">
            <el-button type="text">删除</el-button>
            <el-button type="text">下载</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { nodeSearch } from '@/api/node'
import List from '@/components/List'

export default {
	extends: List,
  data() {
    return {
      createdSearch: false
    }
  },
  methods: {
		fetchApi: nodeSearch
  }
}
</script>
