<template>
  <div class="get-files">
    <el-dialog
      :visible="visible"
      width="660px"
      custom-class="get-files"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <div slot="title" style="font-family: Helvetica;font-size: 16px;color: #333333;;">
				Get node’s file
      </div>
      <div class="get-files-container">
				<el-form ref="form" :model="formData" :rules="rules">
					<el-form-item label="Absolute path" prop="path">
						<el-input
							type="textarea"
							:rows="4"
							placeholder="Enter absolute path"
							v-model.trim="formData.name">
						</el-input>
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
				path: ''
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
.get-files{
	.el-dialog__body {
    padding: 0 20px;
  }
	.el-dialog__header{
		background: #FBFCFE;
		box-shadow: 0px 1px 0px 0px rgba(239,240,242,1);
	}
}
</style>