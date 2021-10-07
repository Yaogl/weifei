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
      <div class="packets-capture-container">
				<el-form ref="form" :model="formData" :rules="rules" label-width="180px" size="medium">
					<el-form-item label="Capture filter" prop="captureFilter">
						<el-input placeholder="Please Enter" v-model.trim="formData.captureFilter" />
					</el-form-item>
					<el-form-item label="Display filter" prop="showFilter">
						<el-input placeholder="Please Enter" v-model.trim="formData.showFilter" />
					</el-form-item>
					<el-form-item label="Field upload" prop="uploadField">
						<el-input placeholder="Please Enter" v-model.trim="formData.uploadField" />
					</el-form-item>
					<el-form-item label="Length" prop="scrawPackageLength">
						<el-input placeholder="Please Enter" v-model.trim="formData.scrawPackageLength" />
					</el-form-item>
					<el-form-item label="Buffer size" prop="scrawCache">
						<el-input placeholder="Please Enter" v-model.trim="formData.scrawCache" />
					</el-form-item>
					<el-form-item label="ES Authentication" prop="esAuth">
						<el-input placeholder="Please Enter" v-model.trim="formData.esAuth" />
					</el-form-item>
					<el-form-item label="ES address" prop="esAddress">
						<el-input placeholder="Please Enter" v-model.trim="formData.esAddress" />
					</el-form-item>
					<el-form-item label="Enable">
						<ElSwitch v-model="formData.scrawSwitch"></ElSwitch>
					</el-form-item>
				</el-form>
      </div>
      <div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="handleClose">Cancel</el-button>
				<el-button size="medium" type="primary" @click="submitFile">Submit</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
			rules: {
				path: [
					{ required: true, message: 'Required field, must be verified before execution', trigger: 'blur' }
				]
			},
			formData: {
				captureFilter: '',
				showFilter: '',
				uploadField: '',
				scrawPackageLength: '',
				scrawCache: '',
				esAuth: '',
				esAddress: '',
				scrawSwitch: false
			}
    }
  },
  methods: {
    handleClose() {
			this.$refs.form.resetFields()
			this.visible = false
    },
    showModal () {
			this.visible = true
		},
		submitFile () {
			this.$refs.form.validate(valid => {
				console.log(valid)
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