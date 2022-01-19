<template>
  <div class="upload-dialog">
    <el-dialog
      :visible="visible"
      width="700px"
      custom-class="upload-dialog"
      :append-to-body="true"
      :before-close="handleClose"
    >
			<div slot="title" style="font-family: Helvetica;font-size: 16px;color: #333333;;">
				Upload the files for object nodes
      </div>
      <div class="upload-dialog-container">
        <div>
          <el-upload
						:show-file-list="false"
            class="upload-demo"
						:file-list="fileList"
						:action="uploadDeliverUrl"
            drag
						:on-progress="upProgress"
						:on-success="uploadSuccess"
						:on-error="uploadError"
						:before-upload="beforeUpload"
          >
            <!-- :http-request="uploadJson" -->
            <div>
              <img src="../../../assets/img/upload-files.png" alt="">
              <p style="font-size: 14px;color: #999999;">No exceed 200M</p>
            </div>
          </el-upload>
        </div>
				<el-form ref="form" :model="formData" style="margin-top: 10px">
					<el-form-item label="IP" prop="ip" label-width="60px">
						<el-input
							placeholder="Please Enter IP"
							v-model.trim="formData.ip">
						</el-input>
					</el-form-item>
				</el-form>
				<el-card class="mt-20" style="width: 380px">
					<div slot="header">
						Uploading
					</div>
					<div>
						<!-- <p class="list-top">UPLOADED</p> -->
						<!-- {{ fileList }} -->
						<!-- 上传进度 -->
						<div class="file-item" v-for="item in fileList" :key="item.uuid">
							<img src="../../../assets/img/file.png" style="width: 28px" alt="">
							<div class="file-info">
								<p class="file-name">
									{{ item.name }}
								</p>
								<p class="file-time">
									{{ item.date }} | {{ item.size / 1024 }}kb
								</p>
							</div>
							<div>
								<el-progress type="circle" color="#00B64B" :percentage="percentage" :width="40" stroke-width="4"></el-progress>
							</div>
						</div>
						<!-- <p class="list-top">IN PROGRESS</p> -->

						<!-- <div class="file-item" v-for="item in uploadSuccessList" :key="item.uuid">
							<img src="../../../assets/img/file.png" style="width: 28px" alt="">
							<div class="file-info">
								<p class="file-name">
									{{ item.name }}
								</p>
								<p class="file-time">
									{{ file.date }} | {{ item.size / 1024 }}kb
								</p>
							</div>
							<div>
								<el-progress type="circle" color="#00B64B" :percentage="item.percent" :width="40" stroke-width="4"></el-progress>
							</div>
						</div> -->
					</div>
				</el-card>
      </div>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="handleClose">Cancel</el-button>
				<el-button size="medium" type="primary" :loading="loading" :disabled="percentage < 100" @click="submitFile">Submit</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadDeliverUrl } from '@/api/machineinspect'
import { nodeFiledeliver } from '@/api/node'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      loading: false,
			uploadDeliverUrl,
			fileList: [],
      visible: false,
			nodeIds: [],
			formData: {
				ip: ''
			},
			percentage: 0 // 文件上传进度 直接上file上页面不更新
    }
  },
  methods: {
    handleClose() {
			this.fileList = []
      this.visible = false
    },
		submitFile() {
			if (!this.fileList.length) {
				return this.$message.warning('please upload file')
			}
			const form = new FormData()
			const file = this.fileList[0]
			if (this.formData.ip) {
				form.append('fileDeliverConfig.ip', this.formData.ip)
			} else {
				form.append('fileDeliverConfig.ip', file.response?.server)
			}
			form.append('fileDeliverConfig.filePath', file.response?.filePath)
			form.append('nodeIds', this.nodeIds)
			nodeFiledeliver(form).then(res => {
				if (res) {
					this.$message.success('success')
					this.handleClose()
				} else {
					this.$message.error('error')
				}
			})
		},
		uploadError() {
			this.$message.error('Upload failed')
			this.percentage = 0
		},
		beforeUpload(file) {
			const maxSize = 1024 * 1024 * 200
      try {
        if (file.size > maxSize) {
          return this.$message.warning('File size exceeds limit')
        }
				this.fileList.splice(0, 1, file)
      } catch (error) {
        this.$message.error('Upload failed, please check the file format')
      }
		},
		upProgress(percent) {
			this.percentage = percent.percent ? percent.percent.toFixed(0) : 0
			console.log(this.percentage)
		},
		uploadSuccess(response, file) {
			this.percentage = 100
			file.date = dayjs().format('MMM DD, YYYY')
			this.fileList.splice(0, 1, file)
		},
		showModal (ids) {
			this.nodeIds = ids
			this.visible = true
		}
  }
}
</script>
<style lang="scss">
.upload-dialog {
  .el-dialog__header{
    background: #FBFCFE;
		box-shadow: 0px 1px 0px 0px rgba(239,240,242,1);
  }
	.el-upload, .el-upload-dragger{
		width: 100%;
	}
  .el-dialog__body {
    padding: 10px;
    .upload-dialog-container {
      background: #fff;
    }
  }
	.list-top{
		opacity: 0.9;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #97A0C3;
	}
	.file-item{
		display: flex;
		margin: 10px 0;
		.file-info{
			margin: 0 10px;
			flex: 1;
		}
		.file-name{
			font-size: 14px;
			color: #333333;
			line-height: 22px;
			width: 230px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.file-time{
			font-size: 12px;
			color: #999999;
			line-height: 12px;
		}
	}
}
</style>
