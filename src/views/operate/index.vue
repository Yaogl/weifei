<template>
  <div class="operate-container">
		<el-card>
			<div slot="header" style="position: relative;">
				<span class="list-header">
					Operation Management
				</span>
			</div>
			<el-table
				ref="multipleTable"
				:data="tableList"
				tooltip-effect="dark"
				v-loading="loading"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column label="服务器IP" min-width="160">
					<template slot-scope="scope">
						<span style="color: #00B64B;">{{ scope.row.ip }}</span>
					</template>
				</el-table-column>
				<el-table-column label="CPU占用率" min-width="140">
					<template slot-scope="scope">
						<span>{{ scope.row.cpuUsed }} / {{ scope.row.cpuTotal }}</span>
					</template>
				</el-table-column>
				<el-table-column label="运行内存占用率" min-width="140">
					<template slot-scope="scope">
						<span>{{ scope.row.memoryUsed }} / {{ scope.row.memoryTotal }}</span>
					</template>
				</el-table-column>
				<el-table-column label="存储占用" min-width="140">
					<template slot-scope="scope">
						<span>{{ scope.row.diskUsed }} / {{ scope.row.diskTotal }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="processNum" label="进程数量" show-overflow-tooltip  min-width="180"/>
				<el-table-column prop="brandWidth" label="带宽" show-overflow-tooltip  min-width="180"/>
				<el-table-column label="operation" min-width="120">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="toDetail(scope.row.id)">详情</el-button>
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
		</el-card>
  </div>
</template>

<script>
import { getServerList } from '@/api/machineinspect'
import List from '@/components/List'

export default {
	extends: List,
  data() {
    return {
			// 列表选中项
			multipleSelection: []
    }
  },
  methods: {
		fetchApi: getServerList,
		fetchByPage() {
      if (this.loading) {
        this.$message.warning('正在加载，请勿重复操作')
        return
      }
      this.loading = true
      return this.fetchApi().then(results => {
        this.loading = false
        this.tableList = results
      })
    },
		toDetail(id) {
			this.$router.push({
				path: '/operate-info',
				query: { id }
			})
		}
  }
}
</script>
<style lang="scss" scoped>
.operate-container {
  height: 100%;
  width: 100%;
	background: #F5F5F5;
	padding: 0.2rem;
}
</style>
