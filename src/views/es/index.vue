<template>
  <div class="es-container">
    <el-card class="mb-20">
			<el-form>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Source IP">
							<el-input v-model.trim="query.sourceIp" placeholder="Please Enter" clearable></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Source Port">
							<el-input v-model.trim="query.sourcePort" placeholder="Please Enter" clearable></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Destination IP">
							<el-input v-model.trim="query.toIp" placeholder="Please Enter" clearable></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Port">
							<el-input v-model.trim="query.toPort" placeholder="Please Enter" clearable></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Protocol">
							<el-select v-model="query.protocal" clearable placeholder="Please Select" style="width: 100%;" @change="changeProtocal">
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
							<el-input v-model.trim="query.domain" :disabled="query.protocal !== 'dns'" clearable placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="MAC Address">
							<el-input v-model.trim="query.macAddress" clearable placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Keyword">
							<el-input v-model.trim="query.keyword" clearable placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="e-mail">
							<el-input v-model.trim="query.email" :disabled="!['smtp', 'pop3'].includes(query.protocal)" clearable placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="WAN IP">
							<el-input v-model.trim="query.wanip" clearable placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Date">
							<el-date-picker
								v-model="query.date"
								type="datetimerange"
								value-format="yyyyMMddHHmmss"
								range-separator="-"
								start-placeholder="Starting Date"
								end-placeholder="End Date" />
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Custom">
							<el-input v-model="query.kql" placeholder="Please Enter" clearable>
								<template slot="append">KQL</template>
							</el-input>
						</el-form-item>
					</div>
					<div style="width: 200px">
						<el-form-item>
							<div slot="label"><br /></div>
							<el-button type="primary" icon="el-icon-search" @click="search">Search</el-button>
							<el-button @click="clearQuery">Reset</el-button>
						</el-form-item>
					</div>
				</div>
			</el-form>
		</el-card>

		<el-card>
			<div slot="header" style="position: relative;">
				<p style="font-size: 12px;color: #333;line-height: 20px">{{ total }}hits</p>
				<p style="font-size: 12px;color: #333;line-height: 18px"> _source</p>

				<div style="position: absolute; right: 0;top: 10px" class="more">
					<el-button @click="deleteEs">Delete Item</el-button>
				</div>
			</div>
			<div class="source-item" v-for="item in tableList" :key="item.id">
				<div style="flex: 1">
					<span
						v-for="tag in getKeys(item)"
						:key="tag.name"
						class="tag-item mr-10"
					>
						<span class="tag-name">
							{{ tag.name }}: 
						</span>
						<span>
							{{ tag.value }}
						</span>
					</span>
				</div>
			</div>
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
	computed: {
		getKeys() {
			return (obj) => {
				if (!obj.content) return []
				const arr = []
				Object.keys(obj.content).map(key => {
					if (obj.content[key]) {
						arr.push({ name: key, value: obj.content[key] })
					}
				})
				return arr
			} 
		}
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
				kql: '', // 自定义
				curPage: 1,
				pageSize: 10
			}
    }
  },
  methods: {
		fetchApi: esSearch,
		changeProtocal(protocal) {
			if (protocal !== 'dns') {
				this.query.domain = ''
			}
			if (!['smtp', 'pop3'].includes(protocal)) {
				this.query.email = ''
			}
			console.log(protocal)
		},
		formatQuery(query) {
			const clone = JSON.parse(JSON.stringify(query))
			clone.fromTime = clone.date[0] || ''
			clone.toTime = clone.date[1] || ''
			delete clone.date
      return clone
    },
		fetchByPage(curPage = this.query.curPage) {
      if (this.loading) {
        this.$message.warning('loading.....')
        return
      }
      this.query.curPage = curPage
      const params = this.formatQuery(this.query)

      this.loading = true
      return this.fetchApi(params).then(results => {
        this.loading = false
        this.tableList = this.formatData(results?.searchHits || [])
        this.total = Number(results.totalHits) || 0
      })
    },
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
		.tag-item{
			color: #343741;
			font-size: 12px;
			padding-bottom: 8px;
			display: inline-block;
			.tag-name{
				display: inline-block;
				background: #E5EEF4;
				border-radius: 4px;
				padding: 5px 6px;
			}
		}
	}
}
</style>
