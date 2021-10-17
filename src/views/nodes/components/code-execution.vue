<template>
  <div class="code-execution">
    <el-dialog
      :visible="visible"
      width="660px"
      custom-class="code-execution"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <div slot="title" style="font-family: Helvetica;font-size: 16px;color: #333333;;">
				Code execution
      </div>
      <div class="code-execution-container">
				<!-- 可以使用自动检测 -->
				<!-- <div id="codeView" v-highlight>
					<pre><code v-html="aaa"></code></pre>
				</div> -->
				<el-input
					type="textarea"
					:rows="10"
					placeholder="请输入内容"
					v-model="formData.cmd">
				</el-input>
      </div>
      <div slot="footer" class="dialog-footer">
				<el-button size="medium" :disabled="loading" @click="handleClose">Cancel</el-button>
				<el-button size="medium" :loading="loading" type="primary" @click="submitFile">Submit</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import { nodeExecmd } from '@/api/node'

export default {
  data () {
    return {
      visible: false,
			loading: false,
			formData: {
				cmd: '',
				nodeIds: ''
			}
    }
  },
  methods: {
    handleClose() {
			this.visible = false
    },
    showModal () {
			const ids = Array.isArray(id) ? id : [id]
			this.formData.nodeIds = ids.join(',')
			this.visible = true
		},
		submitFile () {
			if (!this.formData.cmd.trim()) {
				return this.$message.warning('please enter')
			}
			this.loading = true
			nodeExecmd(this.formData).then(res => {
				this.loading = false
			}).catch(() => {
				this.loading = false
			})
		}
  }
}
</script>
<style lang="scss">
.code-execution{
	.el-dialog__body {
    padding: 0 20px;
  }
	.el-dialog__header{
		background: #FBFCFE;
		box-shadow: 0px 1px 0px 0px rgba(239,240,242,1);
	}
}
</style>