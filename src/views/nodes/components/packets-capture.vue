<template>
  <div class="packets-capture">
    <el-dialog
      :visible="visible"
      width="600px"
      custom-class="packets-capture"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <div slot="title" style="font-family: Helvetica;font-size: 16px;color: #333333;;">
				Packets-capture configuration
      </div>
      <div class="packets-capture-container" v-loading="configLoading">
				<el-form ref="form" :model="formData" :rules="rules" label-width="180px" size="medium">
					<el-form-item label="Capture filter" prop="captureFilter">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.captureFilter']" />
					</el-form-item>
					<el-form-item label="Display filter" prop="showFilter">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.showFilter']" />
					</el-form-item>
					<el-form-item label="Field upload" prop="uploadField">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.uploadField']" />
					</el-form-item>
					<el-form-item label="Heartbeat Time" prop="heartBeatTime">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.heartBeatTime']" />
					</el-form-item>
					<el-form-item label="Length" prop="scrawPackageLength">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.scrawPackageLength']" />
					</el-form-item>
					<el-form-item label="Buffer size" prop="scrawCache">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.scrawCache']" />
					</el-form-item>
					<el-form-item label="ES Authentication" prop="esAuth">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.esAuth']" />
					</el-form-item>
					<el-form-item label="ES address" prop="esAddress">
						<el-input placeholder="Please Enter" v-model.trim="formData['scrawConfig.esAddress']" />
					</el-form-item>
					<el-form-item label="Enable">
						<ElSwitch v-model="formData['scrawConfig.scrawSwitch']"></ElSwitch>
					</el-form-item>
				</el-form>
      </div>
      <div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="handleClose" :disabled="loading">Cancel</el-button>
				<el-button size="medium" :loading="loading" type="primary" @click="submitFile">Submit</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import { nodeScrawconfigAdd, nodeScrawconfigDefault } from '@/api/node'

export default {
  data () {
    return {
      visible: false,
			rules: {
				path: [
					{ required: true, message: 'Required field, must be verified before execution', trigger: 'blur' }
				]
			},
			configLoading: false,
			loading: false,
			formData: {
				nodeIds: '',
				'scrawConfig.captureFilter': '',
				'scrawConfig.showFilter': '',
				'scrawConfig.uploadField': '',
				'scrawConfig.scrawPackageLength': '',
				'scrawConfig.scrawCache': '',
				'scrawConfig.esAuth': '',
				'scrawConfig.esAddress': '',
				'scrawConfig.scrawSwitch': false,
				'scrawConfig.heartBeatTime': ''
			}
    }
  },
  methods: {
    handleClose() {
			this.$refs.form.resetFields()
			this.visible = false
    },
    showModal (id) {
			const ids = Array.isArray(id) ? id : [id]
			this.formData.nodeIds = ids
			this.configLoading = true
			const nodeIds = ids.map(item => {
				return 'nodeId=' + item
			}).join('&')
			nodeScrawconfigDefault(nodeIds).then(res => {
				if (res) {
					const formKeys = Object.keys(this.formData)
					Object.keys(res).map(key => {
						if (formKeys.includes('scrawConfig.' + key)) {
							this.formData['scrawConfig.' + key] = res[key]
						}
					})
				}
				this.configLoading = false
			}).catch(() => {
				this.configLoading = false
			})
			this.visible = true
		},
		submitFile () {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.loading = true
					const form = new FormData()
					Object.keys(this.formData).map(key => {
						form.append(key, this.formData[key])
					})
					nodeScrawconfigAdd(form).then(res => {
						if (res) {
							this.$message.success('success')
							this.handleClose()
						} else {
							this.$message.error('error')
						}
						this.loading = false
					}).catch(err => {
						this.loading = false
					})
				}
			})
		}
  }
}
</script>
<style lang="scss">
.packets-capture{
	.el-dialog__header{
		background: #FBFCFE;
		box-shadow: 0px 1px 0px 0px rgba(239,240,242,1);
	}
}
</style>