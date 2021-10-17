<template>
  <div class="es-container">
    <el-card class="mb-20">
			<el-form>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Source IP">
							<el-input v-model.trim="query.sourceIp" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Source Port">
							<el-input v-model.trim="query.sourcePort" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Destination IP">
							<el-input v-model.trim="query.toIp" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="端口">
							<el-input v-model.trim="query.toPort" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="协议">
							<el-select v-model="query.protocal" placeholder="Please Select" style="width: 100%;">
								<el-option label="dns" value="dns"></el-option>
								<el-option label="telnet" value="telnet"></el-option>
								<el-option label="dhcp" value="dhcp"></el-option>
								<el-option label="smtp" value="smtp"></el-option>
								<el-option label="pop3" value="pop3"></el-option>
								<el-option label="https" value="https"></el-option>
								<el-option label="ftp" value="ftp"></el-option>
								<el-option label="http" value="http"></el-option>
							</el-select>
						</el-form-item>
						<!-- 根据“协议”输入框的内容 来显示过滤条件，
						上面截图是必须显示的 ，当协议选择 “dns” 时 ，
						显示“域名” 输入框，当协议选择“smtp”或 “pop3” 时，
						显示  “邮箱账户”输入框， “协议”为空或其他协议 只显示必选的那几个输入框 -->
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Domain Name">
							<el-input v-model.trim="query.domain" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="MAC Address">
							<el-input v-model.trim="query.macAddress" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Keyword">
							<el-input v-model.trim="query.keyword" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="e-mail">
							<el-input v-model.trim="query.email" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="WAN IP">
							<el-input v-model.trim="query.wanip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Date">
							<el-date-picker
								v-model="query.date"
								type="daterange"
								range-separator="-"
								start-placeholder="Starting Date"
								end-placeholder="End Date" />
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="自定义">
							<el-input v-model="query.kql" placeholder="Please Enter">
								<template slot="append">KQL</template>
							</el-input>
						</el-form-item>
					</div>
					<div style="width: 200px">
						<el-form-item>
							<div slot="label"><br /></div>
							<el-button type="primary" icon="el-icon-search">Search</el-button>
							<el-button>Reset</el-button>
						</el-form-item>
					</div>
				</div>
			</el-form>
		</el-card>

		<el-card>
			<div slot="header" style="position: relative;">
				<p style="font-size: 12px;color: #333;line-height: 20px">1,208hits</p>
				<p style="font-size: 12px;color: #333;line-height: 18px"> _source</p>

				<div style="position: absolute; right: 0;top: 10px" class="more">
					<el-button @click="deleteEs">Delete Item</el-button>
				</div>
			</div>
			<div class="source-item">
				<div class="icon">
					<i class="el-icon-arrow-right"></i>
					<!-- <i class="el-icon-arrow-down"></i> -->
				</div>
				<div style="flex: 1">
					 <el-tag
						v-for="item in 40"
						class="mb-10 mr-10"
						:key="item"
						type="info">
						  _source _source _source
					</el-tag>
				</div>
			</div>
			<div class="source-item">
				<div class="icon">
					<i class="el-icon-arrow-right"></i>
					<!-- <i class="el-icon-arrow-down"></i> -->
				</div>
				<div style="flex: 1">
					 <el-tag
						v-for="item in 40"
						class="mb-10 mr-10"
						:key="item"
						type="info">
						  _source _source _source
					</el-tag>
				</div>
			</div>
		</el-card>
		<DeleteEs ref="deleteEs" />
  </div>
</template>

<script>
import List from '@/components/List'
import DeleteEs from './components/delete-es.vue'
import { esSearch } from '@/api/es'

export default {
  name: 'Es',
	extends: List,
	components: {
		DeleteEs
	},
  data() {
    return {
			query: {
				sourceIp: '',
				sourcePort: '',
				toIp: '', // 目的ip
				toPort: '', // 目的端口
				protocal: '', // 协议
				domain:	'',	// 域名
				macAddress:	'', // mac地址
				keyword: '', // 关键字
				email: '', // 邮箱账户
				wanip: '', // 邮箱账户
				date: [], // 结构成开始结束时间
				fromTime:	'', // 开始时间
				toTime:	'', // 结束时间
				kql: '' // 结束时间
			},
			// 列表选中项
			tableList: [
				{},
				{}
			]
    }
  },
  methods: {
		fetchApi: esSearch,
		deleteEs () {
			this.$refs.deleteEs.showModal()
		}
  }
}
</script>
<style lang="scss">
.es-container{
	.mb-20 .el-form-item__label{
		display: block;
		width: 100%;
		text-align: left;
		color: #707070;
		font-size: 0.12rem;
	}
	.mb-20 .el-form-item{
		margin-bottom: 10px;
	}
}
</style>
<style lang="scss" scoped>
.es-container {
  height: 100%;
  width: 100%;
	background: #F5F5F5;
	padding: 0.2rem;
	.flex-item{
		flex: 1;
		padding: 0 5px;
	}
	.source-item{
		display: flex;
		border-bottom: 2px solid #EEEEEE;
		margin-bottom: 10px;
		.icon{
			padding-right: 10px;
		}
	}
}
</style>
