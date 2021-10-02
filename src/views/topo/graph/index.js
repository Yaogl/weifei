import { Graph, Addon, Shape } from '@antv/x6'
import { DagreLayout } from '@antv/layout'
import { getTopoNodes } from './util'
import store from '@/store'
const { Dnd } = Addon
export default class FlowGraph {
  static init(nodesData) {
    if (this.graph) this.graph.dispose()
    this.graph = new Graph({
      container: document.getElementById('flowContainer'),
      async: true,
      // 画布调整
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        sorting: 'approx',
        pannable: true
      },
      interacting: {
        // edge
        edgeMovable: true,
        edgeLabelMovable: true,
        arrowheadMovable: true,
        vertexMovable: true,
        vertexAddable: true,
        vertexDeletable: true,
        useEdgeTools: true,
        // node
        nodeMovable: true,
        magnetConnectable: true,
        stopDelegateOnDragging: true
      },
      grid: {
        size: 5,
        visible: true,
        type: 'doubleMesh', // 'dot' | 'fixedDot' | 'mesh'
        args: {
          color: 'transparent', // 网格线/点颜色
          thickness: 1 // 网格线宽度/网格点大小
        }
      },
      // 鼠标缩放配置
      // mousewheel: {
      //   enabled: true,
      //   modifiers: ['ctrl', 'meta'],
      //   minScale: 0.5,
      //   maxScale: 2,
      //   guard () {
      //     return true
      //   }
      // },
      // 画布调整
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'boundary',
        allowBlank: false,
        highlight: false,
        snap: true,
        connector: { name: 'rounded' },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#000',
                strokeWidth: 2,
                targetMarker: 'classic'
              }
            },
            router: {
              name: 'manhattan'
            },
            zIndex: 0
          })
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'red'
            }
          }
        }
      },
      history: {
        enabled: true,
        ignoreChange: true
      },
      clipboard: {
        enabled: true
      },
      keyboard: {
        enabled: true
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter(node => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      }
    })
    this.initDnd()
    this.initGraphShape(nodesData)
    this.initEvent()
    this.graph.on('selection:changed', args => {
      // 增加拐点之后 线点不上，在这处理下
      if (args.added.length === 1 && args.added[0].shape === 'edge') {
        if (store.getters.canEdit) {
          store.dispatch('topo/changeTopoState', {
            key: 'curCellType',
            value: 'edge'
          })
          store.dispatch('topo/changeTopoState', {
            key: 'curSelectCell',
            value: args.added[0]
          })
          store.dispatch('topo/changeTopoState', {
            key: 'curCellId',
            value: args.added[0].id
          })
        }
      }

      args.added.forEach(cell => {
        if (!cell.isNode()) {
          cell.attr('line/stroke', '#ffa940')
        }
      })
      args.removed.forEach(cell => {
        if (!cell.isNode()) {
          cell.attr('line/stroke', '#000')
        }
      })
    })
    this.graph.disableRubberband()
    return this.graph
  }

  static initDnd() {
    this.Dnd = new Dnd({
      target: this.graph,
      animation: true,
      getDropNode: (node, options) => {
        store.dispatch('topo/addMaxId') // 拖拽完成，id自增1
        return options.sourceNode
      }
    })
  }
  // 无布局，使用布局
  static layoutTopo(nodesData) {
    const model = getTopoNodes(nodesData, true)
    const layout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'DL',
      ranksep: 90,
      nodesep: 15,
      controlPoints: true
    })
    const newModel = layout.layout(model)
    this.cloneCells = newModel
    this.graph.fromJSON(newModel)
  }
  // 有布局，根据布局位置生成
  static layoutByPosition(nodesData) {
    const data = getTopoNodes(nodesData, false)
    this.cloneCells = data
    this.graph.fromJSON(data)
  }
  static initGraphShape(nodesData) {
    if (nodesData && nodesData.length && nodesData[0].position) {
      this.layoutByPosition(nodesData)
    } else {
      this.layoutTopo(nodesData)
    }
  }

  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  static initEvent() {
    const { graph } = this
    const container = document.getElementById('flowContainer')
    const copy = () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    }
    const paste = () => {
      if (!graph.isClipboardEmpty()) {
        // 克隆节点
        const clone = graph.cloneCells(graph.getCellsInClipboard())
        const cells = Object.keys(clone).map(key => clone[key]).filter(item => item.shape !== 'edge')
        // const cells = graph.paste({ offset: 32 })
        // 为所有节点重置id以及位置
        cells.map(cell => {
          if (cell.shape !== 'edge') {
            const data = cell.data
            const postion = cell.position()
            cell.position(postion.x + 30, postion.y + 30)
            cell.id = store.getters.nextNodeId.toString()
            cell.setProp('id', store.getters.nextNodeId.toString())
            data.id = store.getters.nextNodeId
            graph.disableHistory()
            cell.setData(data)
            graph.enableHistory()
            cell.attr('text/text', store.getters.nextNodeId)
            store.dispatch('topo/addMaxId')
          }
        })
        graph.addCell(cells)
        // 将现在复制的节点继续放在剪切板中，保证下次复制位置正确
        graph.copy(cells)
        graph.cleanSelection()
      }
      return false
      // cells.map(cell => {
      //   if (cell.shape !== 'edge') {
      //     let data = cell.data
      //     data.id = store.getters.nextNodeId
      //     cell.setData({ data })
      //     const postion = cell.getPosition()
      //     postion.x += 32
      //     postion.y += 32
      //     cell.id = store.getters.nextNodeId
      //     cell.setPosition(postion)
      //     cell.attr('text/text', store.getters.nextNodeId)
      //     store.dispatch('topo/addMaxId')
      //   }
      // })
      // graph.copy(cells)
    }
    // 绑定复制的方法
    graph.bindKey('ctrl+c', copy)
    graph.bindKey('cmd+c', copy)
    // 粘贴
    graph.bindKey('ctrl+v', paste)
    graph.bindKey('cmd+v', paste)
    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text')
      const elem = view.container.querySelector('.x6-edit-text')
      if (elem == null) {
        return
      }
      cell.attr('text/style/display', 'none')
      if (elem) {
        elem.style.display = ''
        elem.contentEditable = 'true'
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText)
        cell.attr('text/style/display', '')
        elem.style.display = 'none'
        elem.contentEditable = 'false'
      }
      elem.addEventListener('blur', () => {
        onBlur()
        elem.removeEventListener('blur', onBlur)
      })
    })
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })
    graph.on('blank:click', () => {
      store.dispatch('topo/changeTopoState', {
        key: 'curCellType',
        value: 'grid'
      })
    })
    graph.on('cell:click', ({ cell }) => {
      const type = cell.isNode() ? 'node' : 'edge'
      if (!store.getters.canEdit) {
        return
      }
      store.dispatch('topo/changeTopoState', {
        key: 'curCellType',
        value: type
      })
      store.dispatch('topo/changeTopoState', {
        key: 'curSelectCell',
        value: cell
      })
      store.dispatch('topo/changeTopoState', {
        key: 'curCellId',
        value: cell.id
      })
    })
    // 删除按键，删除节点
    graph.bindKey(['backspace', 'delete'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length && store.getters.canEdit) {
        // 弹出删除窗口
        store.dispatch('topo/changeTopoState', {
          key: 'removeVisibile',
          value: true
        })
      }
    })
    graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'vertices',
          args: {
            stopPropagation: false,
            attrs: { fill: '#999', r: 5 }
          }
        }
      ])
    })

    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
  }

  // 销毁
  static destroy() {
    this.graph.dispose()
  }
}
