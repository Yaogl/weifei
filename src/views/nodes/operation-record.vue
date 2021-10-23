<template>
  <div class="operation-record">
		<div class="back">
			<span @click="$router.go(-1)">
				<i class="el-icon-arrow-left"></i>
				Return
			</span>
		</div>
		<h2 class="page-title">Operation record</h2>
    <div style="padding: 0 0.2rem;">
			<el-card class="mb-20">
				<el-row class="top-content">
					<el-col :span="4">
						<p class="top-sub-title">Number of nodes</p>
						<p class="top-value">{{ operateInfo.nodeNum }}</p>
					</el-col>
					<el-col :span="4">
						<p class="top-sub-title">Done</p>
						<p class="top-value">{{ operateInfo.successNum }}</p>
					</el-col>
					<el-col :span="4">
						<p class="top-sub-title">Failed</p>
						<p class="top-value">{{ operateInfo.failNum }}</p>
					</el-col>
					<el-col :span="4">
						<p class="top-sub-title">Unexecuted</p>
						<p class="top-value">{{ operateInfo.unexeNum }}</p>
					</el-col>
					<el-col :span="4">
						<p class="top-sub-title">Operation time</p>
						<p class="top-value">{{ operateInfo.operateTime }}</p>
					</el-col>
					<el-col :span="4">
						<p class="top-sub-title">Operation type</p>
						<p class="top-value">
							{{ operateInfo.operateType }}
							<a style="color: #00B64B;">Details</a>
						</p>
					</el-col>
				</el-row>
			</el-card>

			<el-card>
				<el-table
					ref="multipleTable"
					:data="tableList"
					tooltip-effect="dark"
					style="width: 100%">
					<el-table-column label="IP" min-width="160">
						<template slot-scope="scope">
							<span style="color: #00B64B;">{{ scope.row.ip }}</span>
						</template>
					</el-table-column>
					<el-table-column label="Country" min-width="140">
						<template slot-scope="scope">
							<span>{{ scope.row.country }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="model" label="Model" show-overflow-tooltip  min-width="140"/>
					<el-table-column prop="firmware" label="Firmware version" show-overflow-tooltip  min-width="180" />
					<el-table-column prop="modifytime" label="Date" show-overflow-tooltip  min-width="180"/>
					<el-table-column prop="cpu" label="Processor architecture" show-overflow-tooltip  min-width="180"/>
					<el-table-column label="Command execution status" min-width="220">
						<template slot-scope="scope">
							<span class="command-status wrong" v-if="scope.row.exeStatus === 0">
								done
							</span>
							<span class="command-status ok" v-else>
								done
							</span>
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
		</div>
  </div>
</template>

<script>
import List from '@/components/List'
import { nodeOperatelist, nodeOperateInfo } from '@/api/node'

export default {
  name: 'Records',
	extends: List,
  data() {
    return {
			query: {
				status: 0,
				curPage: 1,
				pageSize: 10
			},
			operateInfo: {}
    }
  },
	created() {
		nodeOperateInfo()
	},
  methods: {
		fetchApi: nodeOperatelist,
		fetchByPage(curPage = this.query.curPage) {
      if (this.loading) {
        this.$message.warning('正在加载，请勿重复操作')
        return
      }
      this.query.curPage = curPage
      this.loading = true
      return this.fetchApi(this.query).then(results => {
				this.operateInfo = results
        this.loading = false
        this.tableList = this.formatData(results.logs?.records || [])
        this.total = Number(results.logs.total) || 0
        this.afterSearch()
      })
    }
  }
}
</script>
<style lang="scss">
.operation-record{
	.el-card__body{
		padding: 0.2rem;
	}
}
</style>
<style lang="scss" scoped>
.operation-record {
  height: 100%;
  width: 100%;
	background: #F5F5F5;
	.back{
		color: #333;
		font-size: 14px;
		height: 40px;
		padding-left: 0.2rem;
		background: #fff;
		line-height: 40px;
		cursor: pointer;
	}
	.page-title{
		font-family: Helvetica-Bold;
		font-size: 18px;
		color: #333333;
		padding-left: 0.2rem;
		line-height: 50px;
		font-weight: 700;
	}
	.top-content{
		background: #F9F9F9;
		padding: 15px 20px;
	}
	.top-sub-title{
		font-family: Helvetica;
		font-size: 12px;
		color: #505050;
		line-height: 20px;
	}
	.top-value{
		font-family: DIN-Medium;
		font-size: 14px;
		color: #333333;
		line-height: 25px;
		font-weight: 500;
	}
	.list-header{
		font-family: Helvetica-Bold;
		font-size: 18px;
		color: #333333;
		font-weight: 700;
	}
	.command-status{
		padding: 0.1rem;
		background: red;
	}
	.ok{
		color: #3CAE11;
		background: #E2FAEA;
		border-radius: 2px;
	}
	.wrong{
		color: #FA4136;
		background: #FFEAE9;
		border-radius: 2px;
	}
}
</style>
