<template>
  <el-dialog
    title="保存为模板"
    :visible.sync="visible"
    :append-to-body="true"
    width="700px"
    custom-class="topo-template-save"
    :before-close="handleClose"
  >
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="模板名称：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入模板名称" />
      </el-form-item>
      <el-form-item label="模板缩略图：" prop="thumb">
        <el-upload
          class="upload-demo"
          accept=".jpg, .png"
          drag
          :show-file-list="false"
          :action="uploadThumbUrl"
          :on-success="uploadSuccess"
        >
          <div class="inner upload-flex">
            <img
              v-if="formData.thumb"
              style="height: 100px;width: 100px;"
              :src="imgUrl + formData.thumb"
              alt=""
            >
            <i v-else class="el-icon-upload" />
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        :loading="loading"
        @click="saveTemplate"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { uploadThumbUrl } from '@/api/topo'

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
      uploadThumbUrl,
      imgUrl: process.env.VUE_APP_IMAGE_URL,
      formData: {
        name: '',
        thumb: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'change' }
        ],
        thumb: [
          { required: true, message: '请上传模板缩略图', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    uploadSuccess(res) {
      this.formData.thumb = res.data
    },
    saveTemplate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$emit('save', this.formData)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.topo-template-save {
  .upload-flex {
    width: 100%;
    height: 100%;
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
    .el-icon-upload {
      margin: 0;
    }
    p {
      color: #a9a9a9;
      font-size: 16px;
      margin-bottom: 70px;
    }
  }
}
</style>
