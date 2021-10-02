<template>
  <div class="component-bar-container">
    <div class="header">
      <p class="title">组件库</p>
      <el-input
        v-model="name"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        size="small"
      />
    </div>
    <div style="margin-top: 15px;">
      <div v-for="(item, index) in comList" :key="item.id">
        <div class="group-name" @click="toggleOpen(index)">
          <i
            :class="
              openMap[index] ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
            "
          />
          {{ item.name }}
        </div>
        <ul v-if="item.children && item.children.length && openMap[index]">
          <li
            v-for="child in item.children"
            :key="child.id"
            class="children"
            draggable="true"
            @dragstart="dragstart(arguments, child)"
          >
            <img :src="IMGURL + child.icon" alt="">
            <span>{{ child.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import FlowGraph from '../graph'
import { ImageRect, CustHtml } from '../graph/shape'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['canEdit', 'topoComponents', 'nextNodeId']),
    comList: {
      get() {
        return [
          {
            name: '基础组件',
            id: 'base-components',
            children: this.topoComponents.filter(
              item =>
                item.team === 0 &&
                item.label.toLowerCase().includes(this.name.toLowerCase())
            )
          },
          {
            name: '形状',
            id: 'shape-components',
            children: this.topoComponents.filter(
              item =>
                item.team === 1 &&
                item.label.toLowerCase().includes(this.name.toLowerCase()) // 本地查找
            )
          },
          {
            name: '专业组件',
            id: 'shape-components',
            children: this.topoComponents.filter(
              item =>
                item.team === 2 &&
                item.label.toLowerCase().includes(this.name.toLowerCase()) // 本地查找
            )
          }
        ]
      }
    }
  },
  data() {
    return {
      drag: false,
      name: '',
      openMap: [true, true, true],
      IMGURL: process.env.VUE_APP_IMAGE_URL
    }
  },
  methods: {
    toggleOpen(index) {
      this.$set(this.openMap, index, !this.openMap[index])
    },
    formatNode(item) {
      const clone = JSON.parse(JSON.stringify(item))
      clone.id = this.nextNodeId
      const data = {}
      // 如果type == 3 为一组数据，组装默认集合
      Object.keys(clone.options).map(key => {
        data[key] = ''
        if (clone.options[key].type === 3) {
          data[key] = [{}]
          clone.options[key].options.map(k => {
            data[key][0][k.name] = ''
          })
        }
      })
      clone.data = data
      clone.net = [
        {
          ip: '',
          mac: '',
          gateway: ''
        }
      ]
      return clone
    },
    dragstart(arg, item) {
      if (item.team === 1) {
        // 为图形元素，添加编辑字段
        item.data = {
          label: '',
          title: '',
          net: [{ ip: '', mac: '', gateway: '', netmask: '' }]
        }
      }
      if (!this.canEdit) return
      let node = new CustHtml({
        shape: 'cust-html',
        data: JSON.parse(JSON.stringify(item)),
        html() {
          const wrap = document.createElement('div')
          // wrap.innerHTML = `
          // <i class="iconfont" style="font-size: 40px;">
          //   ${item.byte}
          // </i>`
          wrap.innerHTML = `<img src="${this.IMGURL +
            item.icon}" style="width: 40px;height: 40px;" />`
          return wrap
        }
      })
      switch (item.team) {
        case 0:
          node = new ImageRect({
            shape: 'image-rect',
            id: this.nextNodeId.toString(),
            // 克隆一份数据，编辑节点属性时使用
            data: this.formatNode(item),
            attrs: {
              title: {
                text: item.label
              },
              text: {
                text: this.nextNodeId.toString()
              },
              image: {
                'xlink:href': this.IMGURL + item.icon
              }
            }
          })
          break
        case 1:
          node = new CustHtml({
            shape: 'cust-html',
            id: this.nextNodeId.toString(),
            data: JSON.parse(JSON.stringify(item)),
            html() {
              const wrap = document.createElement('div')
              // wrap.innerHTML = `
              // <i class="iconfont" style="font-size: 40px;">
              //   ${item.byte}
              // </i>`
              wrap.innerHTML = `<img src="${this.IMGURL +
                item.icon}" style="width: 40px;height: 40px;" />`
              // wrap.innerHTML = `<img src=${require('../../../assets/demo/firewall.png')} style="width: 40px;height: 40px;" />`
              return wrap
            }
          })
          break
      }
      FlowGraph.Dnd.start(node, arg[0])
    }
  }
}
</script>
<style lang="scss" scoped>
.component-bar-container {
  .header {
    padding: 0 15px;
  }
  .title {
    font-size: 14px;
    font-weight: 500;
    color: #202020;
    line-height: 40px;
  }
  .group-name {
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    background: #fff;
    font-size: 12px;
    cursor: pointer;
    color: #202020;
  }
  .children {
    padding: 0 15px;
    display: flex;
    color: #202020;
    font-size: 12px;
    align-items: center;
    height: 34px;
    cursor: pointer;
    img,
    .iconfont {
      height: 15px;
      width: 15px;
      margin-right: 5px;
    }
  }
}
</style>
