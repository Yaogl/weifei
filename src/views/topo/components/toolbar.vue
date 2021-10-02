<template>
  <div class="topo-toolbar" :class="[disabled ? 'toolbar-disabled' : '']">
    <div class="left">
      <div class="operate-item">
        <div class="top-icon borderd">
          <i
            class="iconfont"
            :style="{ color: connect ? '#02bb50' : '#666' }"
            @click="connectLine"
          >&#xe600;</i>
        </div>
        <span class="name">
          连接
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon">
          <i
            class="iconfont"
            :style="{ color: compose ? '#02bb50' : '#666' }"
            @click="handleClick('able')"
          >&#xe90e;</i>
        </div>
        <span class="name">
          组合
        </span>
      </div>
      <div class="operate-item">
        <div class="top-icon borderd">
          <i
            class="iconfont"
            :style="{ color: !compose ? '#02bb50' : '#666' }"
            @click="handleClick('enable')"
          >&#xe910;</i>
        </div>
        <span class="name">
          解组
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon">
          <i
            class="iconfont"
            :style="{ color: canEdit ? '#02bb50' : '#666' }"
            @click="giveUp(true)"
          >&#xe61e;</i>
        </div>
        <span class="name">
          编辑
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon">
          <i class="iconfont" @click="handleClick('delete')">&#xe626;</i>
        </div>
        <span class="name">
          全部删除
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon borderd">
          <i class="iconfont" @click="handleClick('undo')">&#xe603;</i>
        </div>
        <span class="name">
          撤销
        </span>
      </div>

      <div class="operate-item zoom">
        <div class="top-icon">
          <i class="iconfont" @click="handleClick('zoomOut')">&#xe774;</i>
          {{ (zoom * 100).toFixed(0) }}%
          <i class="iconfont" @click="handleClick('zoomIn')">&#xe620;</i>
        </div>
        <span class="name">
          缩放窗口
        </span>
      </div>
    </div>
    <div class="right">
      <div class="operate-item">
        <div class="top-icon borderd">
          <img
            src="../../../assets/img/saveAsTemplate.png"
            style="height: 18px"
            alt=""
            @click="saveTemplate"
          >
        </div>
        <span class="name">
          保存为模板
        </span>
      </div>
      <div class="operate-item">
        <el-tooltip
          class="item"
          popper-class="topo-tooltip-upload"
          effect="light"
          content="上传json文件，自动生成拓扑图，文件不能大于50M"
          placement="bottom-end"
        >
          <div class="top-icon borderd">
            <i class="iconfont" @click="importTopo">&#xe623;</i>
          </div>
        </el-tooltip>
        <span class="name">
          从json导入
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon borderd">
          <i class="iconfont" @click="giveUp(false)">&#xe624;</i>
        </div>
        <span class="name">
          放弃编辑
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon">
          <i class="iconfont" @click="saveDraft">&#xe606;</i>
        </div>
        <span class="name">
          保存草稿
        </span>
      </div>

      <div class="operate-item">
        <div class="top-icon">
          <i class="iconfont" @click="saveUp">&#xe651;</i>
        </div>
        <span class="name">
          确认生成
        </span>
        <topo-upload
          v-if="uploadVisible"
          :visible.sync="uploadVisible"
          @loadTopo="loadTopo"
        />
      </div>
    </div>

    <TemplateSave
      v-if="tempVisible"
      :visible.sync="tempVisible"
      @save="saveAsTemplate"
    />
  </div>
</template>
<script>
import FlowGraph from '../graph'
import TopoUpload from './topo-upload'
import { FunctionExt } from '@antv/x6'
import { mapActions, mapGetters } from 'vuex'
import TemplateSave from './template-save'
import { addNewTopo, addTopoTemplate } from '@/api/topo'

export default {
  name: 'TopoFrontendToolbar',
  components: {
    TopoUpload,
    TemplateSave
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadVisible: false,
      tempVisible: false
    }
  },
  computed: {
    ...mapGetters(['zoom', 'compose', 'connect', 'canEdit', 'topoComponents'])
  },
  methods: {
    ...mapActions('topo', ['changeTopoState']),
    loadTopo(data) {
      this.$emit('loadTopo', data)
    },
    importTopo() {
      this.uploadVisible = true
    },
    setSelectNode(node) {
      const { graph } = FlowGraph
      graph.resetSelection()
      graph.select(node.id)
      this.changeTopoState({
        key: 'curSelectCell',
        value: graph.getCellById(node.id)
      })
      this.changeTopoState({ key: 'curCellType', value: 'node' })
      this.changeTopoState({ key: 'curCellId', value: node.id })
    },
    resetAll() {
      const { graph } = FlowGraph
      graph.resetSelection()
      this.changeTopoState({ key: 'curSelectCell', value: null })
      this.changeTopoState({ key: 'curCellId', value: '' })
      this.changeTopoState({ key: 'curCellType', value: 'grid' })
    },
    saveTemplate() {
      const { graph } = FlowGraph
      const json = graph.toJSON().cells || []
      const nodes = json.filter(item => item.shape !== 'edge')
      this.changeTopoState({ key: 'canEdit', value: true })
      const valid = this.validateNodes(nodes)
      if (!valid) {
        this.$message.warning('请填写完整信息')
        return false
      }
      this.tempVisible = true
    },
    saveAsTemplate(form) {
      const saveNodes = this.getTopoNodes()
      if (!saveNodes) return
      form.topoJson = saveNodes
      addTopoTemplate(form).then(res => {
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.tempVisible = false
          this.$emit('changeTab', '2')
        } else {
          this.$message.warning('保存失败，请稍后重试')
        }
      })
    },
    // 取消编辑
    giveUp(status) {
      this.changeTopoState({ key: 'canEdit', value: status })
      const { graph, cloneCells } = FlowGraph
      this.resetAll()
      if (!this.canEdit) {
        // 设置链接桩 显示隐藏
        this.connectLine()
        graph.enablePanning()
        graph.disableRubberband()
        this.changeTopoState({ key: 'compose', value: false })
      }
      if (!status) {
        // 取消编辑，回退所有
        graph.clearCells()
        graph.fromJSON(cloneCells)
      }
    },
    connectLine() {
      const { graph } = FlowGraph
      const container = document.getElementById('flowContainer')
      this.changeTopoState({ key: 'connect', value: !this.connect })
      if (!this.canEdit) {
        this.changeTopoState({ key: 'connect', value: false })
      }
      if (this.connect) {
        graph.on(
          'node:mouseenter',
          FunctionExt.debounce(() => {
            const ports = container.querySelectorAll('.x6-port-body')
            FlowGraph.showPorts(ports, this.connect)
          }),
          500
        )
        graph.on(
          'edge:mouseenter',
          FunctionExt.debounce(() => {
            const ports = container.querySelectorAll('.x6-port-body')
            FlowGraph.showPorts(ports, this.connect)
          }),
          500
        )
      }
    },
    // 生成拓扑
    saveUp() {
      this.changeTopoState({ key: 'canEdit', value: true })
      const saveNodes = this.getTopoNodes()
      if (!saveNodes) return
      const data = { status: '1', nodes: saveNodes }
      const { assessId } = this.$route.query
      assessId ? data.assessId = assessId : ''
      addNewTopo(data, this.$route.query.id).then(
        res => {
          if (res.code === 200) {
            this.$router.push({ path: '/assess/list' })
          }
        }
      )
    },
    // 获取箭头方向  up 正常  down 反向，up/down 双向
    getDirection(edge) {
      const line = edge.attrs.line
      if (line && line.targetMarker && !line.sourceMarker) {
        return 'up'
      }
      if (line && !line.targetMarker && line.sourceMarker) {
        return 'down'
      }
      if (line && line.targetMarker && line.sourceMarker) {
        return 'up/down'
      }
      return 'up'
    },
    getConnector(edge) {
      const { graph } = FlowGraph
      edge = graph.getCellById(edge.id)
      const connect = edge.getConnector()
      const router = edge.getRouter()
      if (!connect && !router) {
        return '1'
      }
      if (!connect && router) {
        return '2'
      }
      if (connect && router) {
        return '3'
      }
      return '2'
    },
    // 保存草稿
    saveDraft() {
      this.changeTopoState({ key: 'canEdit', value: true })
      // 保存草稿，不需要校验
      const saveNodes = this.getTopoNodes(true)
      if (!saveNodes) return
      const data = { status: '0', nodes: saveNodes }
      const { assessId } = this.$route.query
      assessId ? data.assessId = assessId : ''
      addNewTopo(data, this.$route.query.id).then(
        res => {
          if (res.code === 200) {
            this.$router.push({ path: '/assess/list' })
          }
        }
      )
    },
    // isDraft 是不是草稿。是草稿的话，跳过校验
    getTopoNodes(isDraft) {
      const { graph } = FlowGraph
      const json = graph.toJSON().cells || []
      const nodes = json.filter(item => item.shape !== 'edge')
      if (!isDraft) {
        const valid = this.validateNodes(nodes)
        if (!valid) {
          this.$message.warning('请填写完整信息')
          return false
        }
      }
      nodes.map(node => {
        node.data.child_nodes = []
        // 保存node位置
        node.data.position = node.position
      })
      const edges = json.filter(item => item.shape === 'edge')
      edges.map(eg => {
        const childId = eg.target.cell
        const parentId = eg.source.cell
        const parentNode = nodes.find(no => no.id === parentId)
        const childNode = nodes.find(no => no.id === childId)
        const direction = this.getDirection(eg)
        const connector = this.getConnector(eg)
        const style = eg.attrs.line.strokeDasharray ? '2' : '1'
        parentNode &&
          parentNode.data.child_nodes.push({
            id: childId,
            direction,
            connector,
            sourcePort: eg.source.port,
            targetPort: eg.target.port,
            vertices: eg.vertices || [],
            style
          })
        childNode && (childNode.parent_node = parentId)
      })
      const saveNodes = nodes.map(item => {
        delete item.data.options
        item.data.net = item.data.data.net
        delete item.data.data.net
        this.deepFormat(item.data.data)
        item.data.parent_node = item.parent_node
        if (this.$route.query.id) {
          item.data.topologyId = this.$route.query.id
        }
        return item.data
      })
      return saveNodes
    },
    deepFormat(data) {
      Object.keys(data).map(key => {
        if (key.includes('-input')) {
          const realKey = key.split('-input')[0]
          const realData = data[realKey]
          if (realData === 'node-other') {
            data[realKey] = data[key]
            delete data[key]
          }
        }
        if (Array.isArray(data[key])) {
          data[key].forEach(element => {
            this.deepFormat(element)
          })
        }
      })
    },
    validateNodes(nodes) {
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        const { data, display_type } = node.data
        let comOpt = this.topoComponents.find(
          item => item.display_type === display_type
        )
        if (node.data.type === 'ics_device') {
          comOpt = {
            options: this.symbolOpt()
          }
        } else {
          comOpt = JSON.parse(JSON.stringify(comOpt))
          // 组件options中没有设置net必填，手动设定一下，net也放在组件formdata内，保存时需要拆分一下
          comOpt.options.net = {
            require: comOpt.showNet,
            type: 3,
            label: 'net',
            options: [
              {
                name: 'ip',
                type: 1,
                label: 'ip'
              },
              {
                name: 'mac',
                type: 1,
                label: 'mac'
              },
              {
                name: 'gateway',
                type: 1,
                label: 'gateway'
              }
            ]
          }
          if (!comOpt.showNet) {
            node.data.data.net = []
          }
        }
        for (const key in comOpt.options) {
          if (comOpt.options[key].type === 3) {
            if (comOpt.options[key].require) {
              for (let idx = 0; idx < data[key].length; idx++) {
                for (const inkey in data[key][idx]) {
                  if (!data[key][idx][inkey]) {
                    this.setSelectNode(node)
                    return false
                  }
                }
              }
            }
          } else {
            if (comOpt.options[key].require && !data[key]) {
              this.setSelectNode(node)
              return false
            }
          }
        }
      }
      return true
    },
    symbolOpt() {
      return {
        label: {
          name: 'label',
          label: 'label',
          type: 1
        },
        title: {
          name: 'title',
          label: 'title',
          type: 1
        },
        net: {
          require: 1,
          type: 3,
          label: 'net',
          options: [
            {
              name: 'ip',
              type: 1,
              label: 'ip'
            },
            {
              name: 'mac',
              type: 1,
              label: 'mac'
            },
            {
              name: 'gateway',
              type: 1,
              label: 'gateway'
            }
          ]
        }
      }
    },
    // 组合解组 标记是否组合 解组
    composeNode() {
      const { graph } = FlowGraph
      this.changeTopoState({ key: 'compose', value: !this.compose })
      if (!this.canEdit) {
        this.changeTopoState({ key: 'compose', value: false })
      }
      if (this.compose) {
        // 禁止平移
        graph.disablePanning()
        // 启动框选
        graph.enableRubberband()
      } else {
        graph.enablePanning()
        // 禁用框选
        graph.disableRubberband()
        // 清空选中项
        graph.resetSelection()
      }
    },
    handleClick(name) {
      const { graph } = FlowGraph
      switch (name) {
        case 'undo':
          this.canEdit && graph.history.undo()
          break
        case 'redo':
          this.canEdit && graph.history.redo()
          break
        case 'delete':
          this.canEdit && graph.clearCells()
          break
        case 'zoomIn':
          graph.zoom(0.1)
          this.changeTopoState({ key: 'zoom', value: graph.zoom() })
          break
        case 'zoomOut':
          this.zoom <= 0.13 ? '' : graph.zoom(-0.1)
          this.changeTopoState({ key: 'zoom', value: graph.zoom() })
          break
        case 'able':
          this.canEdit && this.composeNode()
          break
        case 'enable':
          this.canEdit && this.composeNode()
          break
        case 'toJSON':
          console.log(graph.toJSON())
          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.toolbar-disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
.topo-toolbar {
  height: 64px;
  background: #f6f7fb;
  position: fixed;
  top: 60px;
  z-index: 300;
  width: 100%;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  user-select: none;
  color: #666;
  .left,
  .right {
    display: flex;
  }
  .operate-item {
    width: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .borderd {
      border-right: 2px solid #cad3e0;
    }
    .top-icon {
      width: 100%;
      text-align: center;
      margin-top: 12px;
    }
    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }
    .name {
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .zoom {
    width: 120px;
    .iconfont {
      display: inline-block;
      width: 14px;
      line-height: 14px;
      height: 14px;
      background: #e4e4e4;
      font-size: 12px;
      border-radius: 50%;
    }
  }
  .right {
    .operate-item {
      width: 90px;
    }
  }
}
</style>
<style lang="scss">
.topo-tooltip-upload {
  color: #555;
}
</style>
