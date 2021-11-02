<template>
  <div class="operate-manage" v-loading="loading">
		<div class="back mb-20">
			<span @click="$router.go(-1)">
				<i class="el-icon-arrow-left"></i>
				Return
			</span>
		</div>
    <div style="padding: 0 0.2rem;">
			<el-card>
				<p class="header-title">Sever IP  {{ serviceInfo.ip }}</p>
				<el-row>
					<el-col :span="5" align="center">
						<p class="big">{{ serviceInfo.cpu }}%</p>
						<p class="small">CPU</p>
					</el-col>
					<el-col :span="5" align="center">
						<p class="big">
							{{ serviceInfo.diskUsed }}<span style="font-size: 16px">/ {{ serviceInfo.diskTotal }}</span>
						</p>
						<p class="small">RAM</p>
					</el-col>
					<el-col :span="5" align="center">
						<p class="big">
							{{ serviceInfo.memoryUsed }}<span style="font-size: 16px">/ {{ serviceInfo.memoryTotal }}</span>
						</p>
						<p class="small">Memory consumption</p>
					</el-col>
					<el-col :span="5" align="center">
						<p class="big">{{ serviceInfo.brandWidth }}</p>
						<p class="small">Bandwidth</p>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="mt-20">
				<p class="header-title">Processes</p>
				<div style="background: #282C34;border-radius: 4px;color: #fff;padding: 20px;">
					<table boder="0" cellpadding="0" cellspacing="0" style="width: 85%">
						<tr style="text-align: left;" class="tHeader">
							<th>PID</th>
							<th>USER</th>
							<th>PR</th>
							<th>NI</th>
							<th>VIRT</th>
							<th>RES</th>
							<th>SHR</th>
							<th>S</th>
							<th>%CPU</th>
							<th>%MEM</th>
							<th>TIME+</th>
							<th>COMMAND</th>
						</tr>
						<tr class="tbody" v-for="(item, index) in serviceInfo.processes" :key="index">
							<td>{{ item.pid }}</td>
							<td>{{ item.user }}</td>
							<td>{{ item.pr }}</td>
							<td>{{ item.ni }}</td>
							<td>{{ item.virt }}</td>
							<td>{{ item.res }}</td>
							<td>{{ item.shr }}</td>
							<td>{{ item.s }}</td>
							<td>{{ item.cpu }}</td>
							<td>{{ item.mem }}</td>
							<td>{{ item.time }}</td>
							<td>{{ item.command }}</td>
						</tr>
					</table>
				</div>
			</el-card>
		</div>
  </div>
</template>

<script>
import { getServerDetails } from '@/api/machineinspect'

export default {
  name: 'Records',
  data() {
    return {
			serviceInfo: {},
			loading: false
    }
  },
	created() {
		this.loading = true
		getServerDetails(this.$route.query.id).then(res => {
			this.loading = false
			if (res) {
				if (res.processes) {
					try {
						res.processes = JSON.parse(res.processes)
					} catch (error) {
					}
					Array.isArray(res.processes) ? '' : (res.processes = [])
				}
				this.serviceInfo = res
			}
		}).catch(() => {
			this.loading = false
		})
	}
}
</script>
<style lang="scss" scoped>
.operate-manage {
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
	.header-title{
		font-family: Helvetica-Bold;
		font-size: 18px;
		color: #333333;
		line-height: 58px;
		font-weight: 700;
	}
	.big{
		line-height: 106px;
		font-family: DIN-Medium;
		font-size: 54px;
		color: #333333;
		font-weight: 500;
	}
	.small{
		font-family: Helvetica-Bold;
		font-size: 16px;
		color: #999999;
		font-weight: 700;
		margin-bottom: 40px;
	}
	.tHeader{
		th{
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #FFFFFF;
			line-height: 20px;
			font-weight: 500;
		}
	}
	.tbody{
		td{
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #AAB2BF;
			line-height: 20px;
			font-weight: 500;
		}
	}
}
</style>
