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
				<div id="codeView" v-highlight>
					<pre><code v-html="aaa"></code></pre>
				</div>
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
			aaa: `handleClose() {
					this.visible = false
				},
				showModal () {
					this.visible = true
				},
				submitFile () {
					alert(1)
				}
			`
    }
  },
  methods: {
    handleClose() {
			this.visible = false
    },
    showModal () {
			this.visible = true
		},
		submitFile () {
			alert(1)
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