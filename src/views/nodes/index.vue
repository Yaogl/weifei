<template>
  <div class="nodes-container">
    <el-card class="mb-20">
			<el-form>
				<el-row :gutter="5">
					<el-col :span="3">
						<el-form-item label="IP">
							<el-input v-model.trim="query.ip" placeholder="IP" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Country">
							<el-select v-model="query.country" clearable placeholder="Please Select" style="width: 100%;">
								<el-option v-for="item in nodeCountryList" :key="item.id" :label="item.val" :value="item.val"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Firmware version">
							<el-select v-model="query.firmware" clearable placeholder="Please Select" style="width: 100%;">
								<el-option v-for="item in nodeFirmwareList" :key="item.id" :label="item.val" :value="item.val"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Processor architecture">
							<el-select v-model="query.cpu" clearable placeholder="Please Select" style="width: 100%;">
								<el-option v-for="item in nodeCpuList" :key="item.id" :label="item.val" :value="item.val"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Brand">
							<el-select v-model="query.brand" @change="changeBrand" clearable placeholder="Please Select" style="width: 100%;">
								<el-option v-for="item in nodeBrandList" :key="item.id" :label="item.val" :value="item.val"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Model">
							<el-select v-model="query.model" :disabled="!query.brand" clearable placeholder="Please Select" style="width: 100%;">
							  <el-option v-for="item in nodeModelList" :key="item.id" :label="item.val" :value="item.val"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="Status">
							<el-select v-model="query.status" placeholder="Please Select" style="width: 100%;">
								<el-option label="全部" :value="0"></el-option>
								<el-option label="Active" :value="1"></el-option>
								<el-option label="Offline" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3" class="search">
						<el-form-item>
							<div slot="label"><br /></div>
							<div style="width: 100%;">
								<el-button type="primary" icon="el-icon-search" @click="search">Search</el-button>
								<el-button @click="clearQuery">Reset</el-button>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<el-card>
			<div slot="header" style="position: relative;">
				<span class="list-header">
					Nodes List
				</span>
				<div style="position: absolute; right: 0;top: -10px" class="more">
					<el-button-group class="mr-5">
						<el-button size="medium" icon="el-icon-upload2" @click="uploadFile">Upload</el-button>
						<el-button size="medium" icon="el-icon-download">Download</el-button>
					</el-button-group>
					
					<el-button size="medium" class="mr-5" @click="codeExecution">Code execution</el-button>
					<el-button size="medium" class="mr-5" @click="nodeScrawconfigAdd">Packets-capture configuration</el-button>
					<el-dropdown  @command="moreCommand">
						<span class="el-dropdown-link">
							more<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="records">Operation records</el-dropdown-item>
							<el-dropdown-item command="delete">Delete</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<el-table
				ref="multipleTable"
				:data="tableList"
				tooltip-effect="dark"
				v-loading="loading"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column label="IP" min-width="160">
					<template slot-scope="scope">
						<span style="color: #00B64B;">{{ scope.row.ip }}</span>
					</template>
				</el-table-column>
				<el-table-column label="Country" min-width="140">
					<template slot-scope="scope">
						<span style="color: #00B64B;">{{ scope.row.country }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="model" label="Model" show-overflow-tooltip  min-width="140"/>
				<el-table-column prop="firmware" label="Firmware version" show-overflow-tooltip  min-width="180" />
				<el-table-column prop="createtime" label="Date" show-overflow-tooltip  min-width="180"/>
				<el-table-column prop="cpu" label="Processor architecture" show-overflow-tooltip  min-width="180"/>
				<el-table-column prop="Memory" label="Memory" show-overflow-tooltip  min-width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.memoryUsed }} / {{ scope.row.memoryTotal }}</span>
					</template>
				</el-table-column>
				<el-table-column label="Status" min-width="150">
					<template slot-scope="scope">
						<span :class="scope.row.onLine ? 'circle-before green' : 'circle-before gray'">{{ scope.row.onLine ? 'Active' : 'Offline' }}</span>
					</template>
				</el-table-column>
				<el-table-column label="Command execution status" min-width="220">
					<template slot-scope="scope">
						<span class="command-status ok" v-if="scope.row.exeStatus">
							done
						</span>
						<span class="command-status wrong" v-else>
							Unexecuted
						</span>
					</template>
				</el-table-column>
				<el-table-column label="operation" min-width="120">
					<template slot-scope="scope">
						<div style="text-align: right">
							<el-dropdown @command="handleCommand(arguments, scope.row)">
								<span class="el-dropdown-link">
									<i class="el-icon-more mr-20"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="getFile">Get file</el-dropdown-item>
									<el-dropdown-item>Download</el-dropdown-item>
									<el-dropdown-item command="packetsCapture">Packets-capture configuration</el-dropdown-item>
									<el-dropdown-item command="codeExecution">Code execution</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
		<GetFile ref="getfile" />
		<CodeExecution ref="codeexecution" />
		<UploadDialog ref="uploadDialog" />
		<PacketsCapture ref="packetsCapture" />
		<DeleteDialog ref="deleteDialog" @remove="deleteNode" />
  </div>
</template>

<script>
import { nodeSearch } from '@/api/node'
import List from '@/components/List'
import GetFile from './components/get-files.vue'
import CodeExecution from './components/code-execution.vue'
import UploadDialog from './components/upload-dialog.vue'
import PacketsCapture from './components/packets-capture.vue'
import DeleteDialog from './components/delete-dialog.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Nodes',
	extends: List,
	components: {
		GetFile,
		CodeExecution,
		UploadDialog,
		PacketsCapture,
		DeleteDialog
	},
	computed: {
		...mapGetters([
			'nodeCountryList',
			'nodeFirmwareList',
			'nodeCpuList',
			'nodeBrandList',
			'nodeModelList'
		])
	},
  data() {
    return {
			query: {
				ip: '',
				country: '', //	国家
				firmware: '', // 固件版本
				cpu: '', //	cpu框架
				brand: '', // 品牌
				model: '', //	型号
				status: 0, // 当前状态 0全部 1在线 2离线
				curPage: 1,
				pageSize: 10
			},
			// 列表选中项
			multipleSelection: []
    }
  },
	created() {
		this.initSearchOptions()
	},
  methods: {
		...mapActions('nodes', ['initSearchOptions', 'getModelOptions']),
		fetchApi: nodeSearch,
		changeBrand (va) {
			this.getModelOptions(va)
		},
		codeExecution () {
			if (!this.multipleSelection.length) {
				return this.$message.warning('please select one')
			}
			this.$refs.codeexecution.showModal(this.multipleSelection.map(item => item.id))
		},
		moreCommand (name) {
			if (name === 'delete') {
				// 如果是删除按钮
				if (!this.multipleSelection.length) {
					return this.$message.warning('please select one')
				}
				this.$refs.deleteDialog.showModal()
			} else {
				this.$router.push('/operation-record')
			}
		},
		nodeScrawconfigAdd () {
			if (!this.multipleSelection.length) {
				return this.$message.warning('please select one')
			}
			this.$refs.packetsCapture.showModal(this.multipleSelection.map(item => item.id))
		},
		deleteNode () {},
		handleCommand (arg, row) {
			if (arg[0] === 'getFile') {
				this.$refs.getfile.showModal()
			}
			if (arg[0] === 'codeExecution') {
				this.$refs.codeexecution.showModal(row.id)
			}
			if (arg[0] === 'packetsCapture') {
				this.$refs.packetsCapture.showModal(row.id)
			}
		},
		uploadFile () {
			this.$refs.uploadDialog.showModal()
		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row)
				});
			} else {
				this.$refs.multipleTable.clearSelection()
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		}
  }
}
</script>
<style lang="scss">
.nodes-container{
	.el-form-item__label{
		display: block;
		width: 100%;
		text-align: left;
		color: #707070;
		font-size: 0.12rem;
	}
	.el-card__body{
		padding: 0.1rem;
	}
	.search{
		.el-button{
			padding: 0.12rem 0.2rem;
		}
	}
	.more{
		.el-dropdown-link{
	    padding: 7px 13px;
			font-size: 14px;
			border-radius: 4px;
	    border: 1px solid #DCDFE6;
		}
	}
}
</style>
<style lang="scss" scoped>
.nodes-container {
  height: 100%;
  width: 100%;
	background: #F5F5F5;
	padding: 0.2rem;
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
	.circle-before {
		&:before {
			display: inline-block;
			content: "";
			width: 0.06rem;
			height: 0.06rem;
			border-radius: 50%;
			margin-right: 0.08rem;
			vertical-align: middle;
		}
		&.red {
			&:before {
				background: #FE5500;
			}
		}
		&.gray {
			&:before {
				background: #B6B6B6;
			}
		}
		&.green {
			&:before {
				background: #2EBA07;
			}
		}
	}
}
</style>
