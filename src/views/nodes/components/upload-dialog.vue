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
						:http-request="uploadFile"
            drag
						:on-change="changeData"
						:on-progress="uploadProcess"
						:before-upload="beforeUpload"
          >
            <!-- :http-request="uploadJson" -->
            <div>
              <img src="../../../assets/img/upload-files.png" alt="">
              <p style="font-size: 14px;color: #999999;">No exceed 200M</p>
            </div>
          </el-upload>
        </div>
				<el-card class="mt-20" style="width: 380px">
					<div slot="header">
						Uploading
					</div>
					<div>
						<p class="list-top">UPLOADED</p>
						<!-- {{ fileList }} -->
						<!-- 上传进度 -->
						<div class="file-item" v-for="item in uploadSuccessList" :key="item.uuid">
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
						</div>
						<p class="list-top">IN PROGRESS</p>

						<div class="file-item" v-for="item in uploadSuccessList" :key="item.uuid">
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
						</div>
					</div>
				</el-card>
      </div>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="handleClose">Cancel</el-button>
				<el-button size="medium" type="primary" @click="submitFile">Submit</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFileDeliver, uploadDeliverUrl } from '@/api/machineinspect'
import dayjs from 'dayjs'
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      fileList: [],
      visible: false
    }
  },
	computed: {
		uploadSuccessList() {
			return this.fileList.filter(item => item.percent === 100 && item.status === 'success')
		},
		unSuccessList() {
			return this.fileList.filter(item => !item.percent === 100 || !item.status === 'success')
		}
	},
  methods: {
    handleClose() {
      this.visible = false
    },
		beforeUpload(file) {
			const maxSize = 1024 * 1024 * 200
      try {
        if (file.size > maxSize) {
          return this.$message.warning('文件大小超出限制')
        }
      } catch (error) {
        this.loading = false
        this.$message.error('上传失败，请检查文件格式')
      }
		},
		uploadFile(params) {
			const form = new FormData()
			form.append('file', params.file)
			// uploadFileDeliver(form)
			axios({
				url: uploadDeliverUrl,
				method: 'post',
				data: form,
				//上传进度
				onUploadProgress: (progressEvent) => {
					let num = progressEvent.loaded / progressEvent.total * 100 | 0 //百分比
					params.onProgress({ percent: num })     //进度条
				}
			}).then((data) => {
				params.onSuccess()
			})
		},
		changeData(file, fileList) {
			this.fileList = fileList
		},
		uploadProcess(event, file) {
			file.percent = Math.floor(event.percent)
			file.date = dayjs().format('MMM DD, YYYY')
		},
		showModal () {
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
