<template>
  <div class="topo-upload">
    <el-dialog
      :visible="visible"
      width="600px"
      :show-close="false"
      custom-class="topo-upload"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <div slot="title">
        <i class="el-icon-close" @click="handleClose" />
      </div>
      <div class="topo-upload-container">
        <!-- 上传完成 -->
        <div v-if="complete">
          <div class="complete-inner upload-flex">
            <el-progress type="circle" :percentage="percentage" :width="100" />

            <p style="font-size: 20px;color: #202020;line-height: 50px">
              已生成拓扑图
            </p>
            <p style="font-size: 14px;color: #555555;line-height: 50px;">
              拓扑图生成成功，点击按钮立即查看！
            </p>
            <el-button
              type="success"
              style="height: 32px;padding: 0 20px;line-height: 32px;margin: 30px 0;"
              @click="jumpTopo"
            >立即查看</el-button>
          </div>
        </div>

        <div v-else>
          <el-upload
            v-if="!loading"
            :show-file-list="false"
            class="upload-demo"
            drag
            accept=".json"
            :http-request="uploadJson"
          >
            <div class="inner upload-flex">
              <i class="el-icon-upload" />
              <p>文件上传完成后，系统将自动生成拓扑图</p>
            </div>
          </el-upload>

          <!-- 上传中 -->
          <div v-else class="inner upload-flex">
            <i class="iconfont">&#xe659;</i>
            <p style="color: #02BB50;">正在上传中，请稍后…</p>
          </div>
        </div>

        <el-button
          v-if="!complete"
          type="text"
          style="color: #202020;padding: 0;"
        >
          <i class="iconfont">&#xe605;</i>
          上传json文件
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      complete: false,
      wait: 120,
      percentage: 100,
      uploadData: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    jumpTopo() {
      this.$emit('loadTopo', this.uploadData)
      this.handleClose()
    },
    uploadJson(params) {
      const maxSize = 1024 * 1024 * 50
      try {
        if (params.file.size > maxSize) {
          return this.$message.warning('文件大小超出限制')
        }
        this.loading = true
        const reader = new FileReader()
        reader.readAsText(params.file)
        reader.onload = e => {
          this.uploadData = []
          this.uploadData = JSON.parse(e.target.result).nodes ? JSON.parse(e.target.result).nodes : []

          if (!this.uploadData.length) {
            return this.$message.warning('上传数据为空')
          }
          for (let idx = 0; idx < this.uploadData.length; idx++) {
            const element = this.uploadData[idx]
            delete element.topologyId
            if (!element.type) {
              return this.$message.warning('请检查json数据是否正确')
            }
          }
          setTimeout(() => {
            this.loading = false
            this.complete = true
          }, 1000)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('上传失败，请检查文件格式')
      }
    }
  }
}
</script>
<style lang="scss">
.topo-upload {
  .el-dialog__header,
  .el-dialog__footer {
    padding: 0;
    .el-icon-close {
      position: absolute;
      color: #fff;
      right: -30px;
      cursor: pointer;
    }
  }
  .el-dialog__body {
    padding: 20px;
    background: #e1e5ec;
    border-radius: 5px;
    .topo-upload-container {
      padding: 15px;
      background: #fff;
    }
    .el-upload,
    .el-upload-dragger {
      width: 100%;
      border: none;
    }
    .upload-flex {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .complete-inner {
      padding-top: 30px;
    }
    .inner {
      .iconfont {
        font-size: 46px;
        color: #caced1;
        margin: 70px 0 20px 0;
      }
      p {
        color: #a9a9a9;
        font-size: 16px;
        margin-bottom: 70px;
      }
    }
  }
}
</style>
