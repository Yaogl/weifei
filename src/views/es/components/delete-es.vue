<template>
  <div class="delete-es-dialog">
    <el-dialog
      :visible.sync="visible"
      width="400px"
      top="25vh"
      :before-close="handleClose"
    >
      <div slot="title" style="font-family: Helvetica;font-size: 16px;color: #333333;;">
        Delete data
      </div>
			<el-form ref="form" :model="formData" label-width="130px">
				<el-form-item label="Starting Date" prop="path">
					<el-input placeholder="Enter absolute path" v-model.trim="formData.name">
					</el-input>
				</el-form-item>
				<el-form-item label="End Date" prop="path">
					<el-input placeholder="Enter absolute path" v-model.trim="formData.name">
					</el-input>
				</el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">Cancel</el-button>
        <el-button
					size="medium"
          type="primary"
          class="red"
          @click="removeNode"
        >Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
			formData: {}
    }
  },
  methods: {
    handleClose() {
			this.visible = false
    },
    showModal () {
			this.visible = true
		},
		removeNode () {
			this.$emit('remove')
		}
  }
}
</script>
<style lang="scss">
.delete-es-dialog{
	.el-dialog__body {
    padding: 15px 20px;
  }
	.el-dialog__footer{
		margin-top: 20px;
	}
	.el-dialog__header{
		background: #FBFCFE;
		box-shadow: 0px 1px 0px 0px rgba(239,240,242,1);
	}
	.red {
		color: #fff;
		border: 1px solid #f84e44;
		background: #f84e44;
	}
}
</style>