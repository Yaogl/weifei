<template>
  <div class="topology-show-container">
    <div name="topo" class="topo" />
  </div>
</template>
<script>
import { Graph } from '@antv/x6'
import { DagreLayout } from '@antv/layout'
import { FunctionExt } from '@antv/x6'
// import '@antv/x6-vue-shape'

export default {
  props: {
    // 节点
    nodes: {
      type: Array,
      default: () => []
    },
    // 节点是否可以拖拽
    interacting: {
      type: Boolean,
      default: true
    },
    backgroud: {
      default: true
    },
    // 画布拖拽滚动
    showScroll: {
      type: Boolean,
      default: false
    },
    // 是否使用布局
    useLayout: {
      type: Boolean,
      default: true
    },
    // 攻击路径id集合
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      graph: '',
      timer: null
    }
  },
  watch: {
    nodes() {
      this.initGraph()
    }
  },
  mounted() {
    if (this.nodes.length) {
      this.initGraph()
    }
  },
  beforeDestroy() {
    this.graph && this.graph.dispose()
    this.timer && clearTimeout(this.timer)
  },
  methods: {
    reset() {
      this.graph.clearCells()
      this.graph.fromJSON(this.cloneCells)
    },
    initGraph() {
      if (this.timer) {
        clearTimeout(timer)
      }
      this.graph && this.graph.dispose()
      const options = {
        container: this.$el.querySelector('[name="topo"]'),
        interacting: this.interacting,
        scroller: this.showScroll
          ? {
              enabled: true,
              pannable: true
            }
          : null,
        connecting: {
          anchor: 'center',
          connectionPoint: 'boundary',
          allowBlank: false,
          highlight: false,
          snap: false,
          connector: { name: 'rounded' }
        }
      }
      if (this.backgroud) {
        options.grid = {
          size: 10,
          visible: true,
          type: 'doubleMesh', // 'dot' | 'fixedDot' | 'mesh'
          args: [{ color: 'transparent' }, { color: 'rgba(74, 80, 100, 0.1)' }]
        }
      }
      this.graph = new Graph(options)
      this.initGraphShape()
      // 线段hover后展示
      this.graph.on(
        'edge:mouseenter',
        FunctionExt.debounce(({ edge }) => {
          // 保存原始色
          edge.setData({ originColor: edge.attr('line/stroke') })
          edge.attr('line/strokeDasharray', 10)
          edge.attr('line/strokeWidth', 5)
        }),
        500
      )
      this.graph.on(
        'edge:mouseleave',
        FunctionExt.debounce(({ edge }) => {
          edge.attr('line/stroke', edge.data.originColor)
          edge.attr('line/strokeDasharray', null)
          edge.attr('line/strokeWidth', 2)
        }),
        500
      )

      // this.graph.addNode({
      //   shape: 'vue-shape',
      //   width: 200,
      //   height: 200,
      //   x: 100,
      //   y: 100,
      //   attrs: {
      //     body: {
      //       width: 200,
      //       height: 200,
      //       stroke: 'red',
      //     }
      //   },
      //   component: {
      //     template: ` <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      //       <el-button>上左</el-button>
      //     </el-tooltip>`,
      //     data() {
      //       return {}
      //     }
      //   }
      // });

      this.initTimer()
    },
    initTimer() {
      if (this.links && this.links.length) {
        const edges = this.graph
          .toJSON()
          .cells.filter(item => item.shape === 'edge')
        let index = 0
        let curBorderColor = ''
        let curBackground = ''
        const transferLink = () => {
          const curCell = this.graph.getCellById(this.links[index])
          if (this.links[index - 1] && this.links[index]) {
            const egg = edges.find(eg => {
              return (
                eg.source.cell === this.links[index - 1] &&
                eg.target.cell === this.links[index]
              )
            })
            if (egg) {
              const curEdge = this.graph.getCellById(egg.id)
              !curEdge.attr('line/strokeDasharray') &&
                curEdge.attr('line/stroke', 'rgba(201, 27, 25, 1)')
              !curEdge.attr('line/strokeDasharray') && curEdge.setZIndex(20)
              !curEdge.attr('line/strokeDasharray') &&
                curEdge.attr('line/strokeDasharray', 5)
            }
          }
          if (curCell) {
            this.$emit('curCellInfo', curCell)
            curBorderColor = curCell.attr('body/stroke')
            curBackground = curCell.attr('wrap/fill')
            curCell.attr('body/stroke', 'rgba(201, 27, 25, 1)')
            curCell.attr('wrap/fill', 'rgba(201, 27, 25, 0.5)')
          }
          this.timer = setTimeout(() => {
            curBorderColor && curCell.attr('body/stroke', curBorderColor)
            curBackground && curCell.attr('wrap/fill', curBackground)
            index = index === this.links.length - 1 ? 0 : index + 1
            transferLink()
          }, 10000)
        }
        transferLink()
      }
    },
    // 无布局，使用布局
    layoutTopo(nodesData) {
      const layout = new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'DL',
        ranksep: 90,
        nodesep: 15,
        controlPoints: true
      })
      const newModel = layout.layout(nodesData)
      this.cloneCells = newModel
      this.graph.fromJSON(newModel)
    },
    // 有布局，根据布局位置生成
    layoutByPosition(nodesData) {
      this.cloneCells = nodesData
      this.graph.fromJSON(nodesData)
    },
    initGraphShape() {
      if (this.useLayout) {
        this.layoutTopo(this.nodes)
      } else {
        this.layoutByPosition(this.nodes)
      }
      // 缩放内容，适应画布
      this.graph.zoomToFit()
      this.graph.zoom(-0.1)
      this.graph.centerContent()
      // 初始化完成
      this.$emit('postGraph', this.graph)
    }
  }
}
</script>
<style lang="scss">
.topology-show-container {
  height: 100%;
  .topo {
    height: 100%;
    width: 100%;
  }
  @keyframes ant-line {
    to {
      stroke-dashoffset: -1000;
    }
  }
}
</style>
