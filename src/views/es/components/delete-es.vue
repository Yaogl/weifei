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
			<el-form ref="form" :model="formData" :rules="rules" label-width="130px">
				<el-form-item label="Starting Date" prop="startTime">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            value-format="yyyyMMdd"
            placeholder="Please Select">
          </el-date-picker>
				</el-form-item>
				<el-form-item label="End Date" prop="endTime">
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            value-format="yyyyMMdd"
            placeholder="Please Select">
          </el-date-picker>
				</el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">Cancel</el-button>
        <el-button
					size="medium"
          type="primary"
          class="red"
          :loading="loading"
          @click="removeNode"
        >Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { esDel } from '@/api/es'

export default {
  data () {
    return {
      visible: false,
      loading: false,
			formData: {
        startTime: '',
        endTime: ''
      },
      rules: {
        startTime: [
          { required: true, message: 'Please Select Starting Date', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: 'Please Select End Date', trigger: 'change' }
        ]
      }
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
      this.$refs.form.validate(valid => {
        if (valid) {
          // 删除列表当前行
          this.$confirm('After deleting the data within this time period, it cannot be recovered. Please be careful.', 'tips', {
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel',
            type: 'warning',
            center: true
          })
            .then(() => {
              const { startTime, endTime } = this.formData
              if (!startTime || !endTime) {
                this.$message.warning('please select time')
              } else {
                esDel(this.formData).then(res => {
                  if (res) {
                    this.$message.success('success')
                    this.handleClose()
                  } else {
                    this.$message.error('error')
                  }
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
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