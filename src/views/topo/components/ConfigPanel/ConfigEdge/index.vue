<template>
  <div class="config-edge">
    <h4 class="header">连线配置</h4>
    <div class="container">
      <el-form label-position="top" label-width="100px">
        <el-form-item label="连线类型">
          <el-select
            :value="edgeAttrs.type"
            placeholder="请选择连线类型"
            @change="changeType"
          >
            <el-option value="1" label="直线">直线</el-option>
            <el-option value="2" label="折线">折线</el-option>
            <el-option
              value="3"
              label="二次贝塞尔曲线"
            >二次贝塞尔曲线</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连线样式">
          <el-select
            :value="edgeAttrs.style"
            placeholder="请选择连线样式"
            @change="changeStyle"
          >
            <el-option value="1" label="实线">实线</el-option>
            <el-option value="2" label="虚线">虚线</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="箭头方向">
          <el-select
            :value="edgeAttrs.marker"
            placeholder="请选择连线样式"
            @change="changeMarker"
          >
            <el-option value="1" label="单向出">单向出</el-option>
            <el-option value="2" label="单向入">单向入</el-option>
            <el-option value="3" label="双向">双向</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button class="del-btn" plain @click="delNode">删除</el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      top="25vh"
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dia-title">
        <img src="../../../../../assets/img/close.png" alt="">
        确定要删除这条节点吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          class="red"
          @click="removeNode"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FlowGraph from '../../../graph'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      curCel: '',
      edgeAttrs: {
        type: '1',
        style: '1',
        marker: '1'
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['canEdit', 'curSelectCell', 'curCellId', 'curCellType'])
  },
  watch: {
    curCellId() {
      if (this.curCellType === 'edge') {
        this.resetEdgeAttr()
      }
    }
  },
  methods: {
    ...mapActions('topo', ['changeTopoState']),
    resetEdgeAttr() {
      this.edgeAttrs.style = this.curSelectCell.attr('line/strokeDasharray')
        ? '2'
        : '1'
      this.edgeAttrs.marker =
        this.curSelectCell.attr('line/targetMarker') &&
        this.curSelectCell.attr('line/sourceMarker')
          ? '3'
          : !this.curSelectCell.attr('line/targetMarker') &&
            this.curSelectCell.attr('line/sourceMarker')
          ? '2'
          : '1'
      // 如果是贝塞尔曲线
      this.edgeAttrs.type = this.curSelectCell.getConnector()
        ? '3'
        : this.curSelectCell.getRouter()
        ? '2'
        : '1'
    },
    delNode() {
      if (!this.canEdit) {
        return this.$message.warning('请先点击编辑按钮')
      }
      if (!this.curCellId) {
        return this.$message.warning('请选择要删除的节点')
      }
      // 如果是连线，直接删除
      if (this.curCellType === 'edge') {
        this.removeNode()
        return
      }
      this.dialogVisible = true
    },
    removeNode() {
      const { graph } = FlowGraph
      const cells = graph.toJSON().cells.filter(item => item.shape === 'edge')
      const delList = [this.curCellId]
      // 查询所有关联节点
      function getDeleteCells(cells, list) {
        const child = cells.filter(item => list.includes(item.source.cell))
        if (child && child.length) {
          delList.push(...child.map(item => item.target.cell))
          getDeleteCells(
            cells,
            child.map(item => item.target.cell)
          )
        }
        return
      }
      getDeleteCells(cells, [this.curCellId])
      graph.removeCells(delList)
      this.changeTopoState({ key: 'curCellType', value: 'grid' })
      this.changeTopoState({ key: 'curCellId', value: '' })
      this.changeTopoState({ key: 'curSelectCell', value: {}})
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    changeType(val) {
      this.edgeAttrs.type = val
      switch (val) {
        case '1':
          this.curSelectCell.setConnector(null)
          this.curSelectCell.setRouter(null)
          break
        case '2':
          this.curSelectCell.setConnector(null)
          this.curSelectCell.setRouter('manhattan')
          break
        case '3':
          this.curSelectCell.setRouter('manhattan')
          this.curSelectCell.setConnector('curve')
          break
      }
    },
    changeStyle(val) {
      this.edgeAttrs.style = val
      switch (val) {
        case '1':
          this.curSelectCell.attr('line/strokeDasharray', null)
          break
        case '2':
          this.curSelectCell.attr('line/strokeDasharray', 5)
          break
      }
    },
    changeMarker(val) {
      this.edgeAttrs.marker = val
      switch (val) {
        case '1':
          this.curSelectCell.attr('line/sourceMarker', null)
          this.curSelectCell.attr('line/targetMarker', 'classic')
          break
        case '2':
          this.curSelectCell.attr('line/sourceMarker', 'classic')
          this.curSelectCell.attr('line/targetMarker', null)
          break
        case '3':
          this.curSelectCell.attr('line/targetMarker', 'classic')
          this.curSelectCell.attr('line/sourceMarker', 'classic')
          break
      }
    }
  }
}
</script>

<style lang="scss">
.config-edge {
  padding-bottom: 60px;
  border: 1px solid #e1e5ec;
  position: relative;
  height: 100%;
  .del-btn {
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
  .input-width {
    width: 230px;
  }
  .header {
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #e1e5ec;
  }
  .container {
    padding: 0 15px;
    .el-form-item__label {
      font-size: 12px;
      font-weight: 500;
      color: #202020;
      line-height: 36px;
      padding-bottom: 0;
    }
    .el-input__inner {
      height: 36px;
    }
    .el-form-item {
      margin-bottom: 0;
      padding-bottom: 3px;
      border-bottom: 1px solid #e1e5ec;
    }
  }
  .el-dialog__header {
    padding: 32px 32px 4px 32px;
  }
  .dia-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
  }
  .el-dialog__body {
    padding: 0 32px 16px 68px;
    font-size: 14px;
    line-height: 22px;
  }
  .dialog-footer {
    .el-button {
      padding: 0;
      line-height: 32px;
      width: 80px;
      border-radius: 0;
    }
    .red {
      color: #fff;
      border: 1px solid #f84e44;
      background: #f84e44;
    }
  }
}
</style>
