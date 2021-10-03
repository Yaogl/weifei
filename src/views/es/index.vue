<template>
  <div class="es-container">
    <el-card class="mb-20">
			<el-form>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Source IP">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Source Port">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="Destination IP">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="端口">
							<el-select v-model="query.country" placeholder="Please Select" style="width: 100%;">
								<el-option label="中国" value="shanghai"></el-option>
								<el-option label="俄罗斯" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="协议">
							<el-select v-model="query.country" placeholder="Please Select" style="width: 100%;">
								<el-option label="中国" value="shanghai"></el-option>
								<el-option label="俄罗斯" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Domain Name">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="MAC Address">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;">
					<div class="flex-item">
						<el-form-item label="Keyword">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="e-mail">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
						</el-form-item>
					</div>
					<div class="flex-item">
						<el-form-item label="WAN IP">
							<el-input v-model="query.ip" placeholder="Please Enter"></el-input>
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
							<el-input v-model="query.ip" placeholder="Please Enter">
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
					<el-button>Delete Item</el-button>
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
  </div>
</template>

<script>
import List from '@/components/List'

export default {
  name: 'Nodes',
	extends: List,
  data() {
    return {
			query: {
				date: [],
				page: 1,
				size: 10
			},
			// 列表选中项
			tableList: [
				{},
				{},
				{},
				{}
			]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.es-container{
	.el-form-item__label{
		display: block;
		width: 100%;
		text-align: left;
		color: #707070;
		font-size: 0.12rem;
	}
	.el-form-item{
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
