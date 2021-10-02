<template>
  <div class="topo-index-container">
    <tool-bar
      :disabled="activeIndex === '2'"
      @changeTab="changeMenu"
      @loadTopo="loadTopo"
    />
    <div class="container">
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-top"
          background-color="#fff"
          text-color="#000"
          active-text-color="#20D78F"
          @select="changeMenu"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-fold" />
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu" />
          </el-menu-item>
        </el-menu>
      </div>
      <!-- v-show  拿不到元素高度，初始化拓扑失败 -->
      <div
        v-loading="loading"
        v-if="activeIndex === '1'"
        style="display: flex;flex: 1;positon: relative;"
      >
        <div class="component-bar">
          <component-bar />
        </div>

        <div class="topo-wrap">
          <div id="flowContainer" class="x6-graph" />
        </div>

        <div class="config-right">
          <config-panel />
        </div>
      </div>
      <div v-if="activeIndex === '2'" style="flex: 1;">
        <TopoList @changeTemplate="changeTemplate" />
      </div>
    </div>

    <RemoveDialog />
  </div>
</template>
<script>
import ToolBar from './components/toolbar'
import ConfigPanel from './components/config-panl'
import ComponentBar from './components/component-bar'
import FlowGraph from './graph'
import TopoList from './list'
import RemoveDialog from './components/remove-dialog'
import { mapActions, mapGetters } from 'vuex'
import { getTopoInfo, getTopoTemplateInfo } from '@/api/topo'

export default {
  name: 'TopoFrontendIndex',
  components: { ToolBar, ConfigPanel, ComponentBar, TopoList, RemoveDialog },
  data() {
    return {
      activeIndex: '1',
      loading: false,
      templateId: '',
      graph: null
    }
  },
  computed: {
    ...mapGetters(['topoComponents', 'topoComOptions'])
  },
  mounted() {
    this.initConfig().then(() => {
      this.initGraph()
    })
  },
  methods: {
    ...mapActions('topo', ['changeTopoState', 'initTopoComponents']),
    loadTopo(data) {
      this.$router.replace({ query: {}})
      this.activeIndex = '1'
      this.loading = true
      setTimeout(() => {
        const maxId = Math.max.apply(
          null,
          data.map(item => item.id || 0)
        )
        this.resetAll()
        this.changeTopoState({ key: 'nextNodeId', value: +maxId + 1 })
        this.graph = FlowGraph.init(data)
        this.graph.on('render:done', () => {
          this.loading = false
        })
      }, 100)
    },
    changeTemplate(id) {
      this.$router.replace('/assess/add')
      this.activeIndex = '1'
      this.templateId = id
      this.initTemplate(id)
    },
    initConfig() {
      return new Promise(resolve => {
        this.initTopoComponents().then(() => {
          resolve()
        })
      })
    },
    initTemplate(id) {
      this.loading = false
      getTopoTemplateInfo(id).then(res => {
        // 重新渲染缩放比例重置为 1
        const maxId = Math.max.apply(
          null,
          res.data.topoJson.map(item => item.id)
        )
        this.resetAll()
        this.changeTopoState({ key: 'nextNodeId', value: +maxId + 1 })
        this.graph = FlowGraph.init(res.data.topoJson)
        this.graph.on('render:done', () => {
          this.loading = false
        })
      })
    },
    initGraph() {
      setTimeout(() => {
        this.loading = true
        if (this.$route.query.id) {
          getTopoInfo(this.$route.query.id).then(res => {
            // 重新渲染缩放比例重置为 1
            const maxId = Math.max.apply(
              null,
              res.data.nodes.map(item => item.id)
            )
            this.resetAll()
            this.changeTopoState({ key: 'nextNodeId', value: +maxId + 1 })
            this.graph = FlowGraph.init(res.data.nodes)
            this.graph.on('render:done', () => {
              this.loading = false
            })
          })
        } else {
          this.loading = false
          this.resetAll()
          this.changeTopoState({ key: 'nextNodeId', value: 1 })
          this.graph = FlowGraph.init([])
        }
      }, 0)
    },
    changeMenu(index) {
      if (index === '1') {
        this.initGraph()
      }
      this.activeIndex = index
    },
    resetAll() {
      this.changeTopoState({ key: 'zoom', value: 1 })
      this.changeTopoState({ key: 'compose', value: false })
      this.changeTopoState({ key: 'connect', value: false })
      this.changeTopoState({ key: 'canEdit', value: true })
      this.changeTopoState({ key: 'curSelectCell', value: null })
      this.changeTopoState({ key: 'curCellId', value: '' })
      this.changeTopoState({ key: 'curCellType', value: 'grid' })
    }
  }
}
</script>
<style lang="scss">
.topo-index-container {
  width: 100%;
  min-height: 600px;
  padding-top: 64px;
  .ghostClass {
    display: none !important;
  }
  .container {
    display: flex;
    height: 100%;
  }
  .nav {
    width: 52px;
    background: #fff;
    border-right: 1px solid #e1e7f2;
    .el-menu-item {
      padding: 0 !important;
      text-align: center;
    }
  }
  .topo-wrap {
    flex: 1;
    .children {
      display: none !important;
    }
    display: flex;
    margin-right: 298px;
    display: -webkit-flex;
    align-items: stretch;
    #flowContainer {
      width: 100%;
      height: 100%;
    }
  }
  .component-bar {
    width: 245px;
    background: #f6f7fb;
    border: 1px solid #e1e7f2;
  }
  .config-right {
    width: 298px;
    position: absolute;
    top: 65px;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}
</style>
