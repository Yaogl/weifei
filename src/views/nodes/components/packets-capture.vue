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
					<el-form-item label="Capture filter" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="Display filter" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="Field upload" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="Length" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="Buffer size" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="ES Authentication" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="ES address" prop="path">
						<el-input placeholder="Please Enter" v-model.trim="formData.name" />
					</el-form-item>
					<el-form-item label="Enable" prop="path">
						<ElSwitch v-model="formData.flag"></ElSwitch>
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
				path: '',
				flag: false
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