<template>
  <div class="delete-dialog">
    <el-dialog
      :visible.sync="visible"
      width="400px"
      top="25vh"
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dia-title">
        <img src="../../../assets/img/close.png" class="mr-10" alt="">
        <span>File deletion</span>
      </div>
			<div class="info">
				Caution! After the selectednode is deleted it will nolonger be displayed in list
			</div>
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
      visible: false
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
.delete-dialog{
	.el-dialog__body {
    padding: 0 20px;
  }
	.el-dialog__footer{
		margin-top: 20px;
	}
	.info{
		margin-left: 40px;
		font-size: 14px;
		color: #666666;
		line-height: 22px;
		font-weight: 400;
	}
	.dia-title{
		font-size: 16px;
		color: #333333;
		line-height: 24px;
		font-weight: 700;
		display: flex;
		align-items: center;
	}
	.red {
		color: #fff;
		border: 1px solid #f84e44;
		background: #f84e44;
	}
}
</style>