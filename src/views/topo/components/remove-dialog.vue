<template>
  <div class="remove-dialog">
    <el-dialog
      :visible.sync="removeVisibile"
      width="400px"
      top="25vh"
      :show-close="false"
      :before-close="handleClose"
    >
      <div slot="title" class="dia-title">
        <img src="../../../assets/img/close.png" alt="">
        确定要删除这条节点吗？
      </div>
      <span>删除后，该节点的已编辑的信息和节点下关联的相关节点将同时被删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
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
import { mapGetters, mapActions } from 'vuex'
import FlowGraph from '../graph'

export default {
  data() {
    return {
      dialogVisible: true
    }
  },
  computed: {
    ...mapGetters([
      'removeVisibile',
      'canEdit',
      'curSelectCell',
      'curCellId',
      'curCellType'
    ])
  },
  methods: {
    ...mapActions('topo', ['changeTopoState']),
    removeNode() {
      if (!this.curCellId) {
        return this.$message.warning('请选择要删除的节点')
      }
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
      this.handleClose()
    },
    handleClose() {
      this.changeTopoState({
        key: 'removeVisibile',
        value: false
      })
    }
  }
}
</script>
<style lang="scss">
.remove-dialog {
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
