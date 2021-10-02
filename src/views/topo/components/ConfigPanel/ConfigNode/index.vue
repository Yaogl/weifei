<template>
  <div class="config-node">
    <h4 class="header">元件说明</h4>
    <div v-if="curCellId && curCellType === 'node'" class="container">
      <!-- <el-form
        v-if="curSelectCell.data.type === 'ics_device'"
        :model="formLabelAlign"
        label-position="top"
        label-width="100px"
        size="small"
      >
        <el-form-item
          label="标题"
          :rules="[{ required: true, message: '标题不能为空' }]"
        >
          <el-input
            v-model="formLabelAlign.title"
            placeholder="请输入"
            class="input-width"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          :rules="[{ required: true, message: '描述不能为空' }]"
        >
          <el-input
            v-model="formLabelAlign.label"
            placeholder="请输入"
            class="input-width"
            size="mini"
          />
        </el-form-item>
        <div v-if="showNet">
          <p style="margin-top: 10px;">
            net
            <i
              class="el-icon-circle-plus-outline"
              @click="addElement('net')"
            ></i>
            <i
              class="el-icon-remove-outline"
              v-if="formLabelAlign.net && formLabelAlign.net.length > 1"
              @click="deleteElement(formLabelAlign.net)"
            ></i>
          </p>

          <div v-for="(net, idx) in formLabelAlign.net" :key="idx">
            <el-form-item
              :label="'ip' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'ip不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].ip"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              :label="'mac' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'mac不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].mac"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              :label="'gateway' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'gateway不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].gateway"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
          </div>
        </div>
      </el-form> -->
      <el-form
        :model="formLabelAlign"
        label-position="top"
        label-width="100px"
        size="small"
      >
        <el-form-item
          label="节点名称"
          :rules="[
            {
              required: true,
              message: '节点名称不能为空'
            }
          ]"
        >
          <el-input
            v-model="nodeLabel"
            placeholder="请输入"
            class="input-width"
            size="mini"
            @input="changeLabel"
          />
        </el-form-item>
        <div v-for="key in Object.keys(optInfo)" :key="key">
          <el-form-item
            v-if="
              optInfo[key].type === 1 &&
                ((optInfo[key].parent && formLabelAlign[optInfo[key].parent]) ||
                  !optInfo[key].parent)
            "
            :label="optInfo[key].label"
            :rules="[
              {
                required: !!optInfo[key].require,
                message: optInfo[key].label + '不能为空'
              }
            ]"
          >
            <el-input
              v-model="formLabelAlign[key]"
              placeholder="请输入"
              class="input-width"
              size="mini"
              @blur="inputChildren(arguments, key)"
            />
          </el-form-item>
          <div
            v-if="
              optInfo[key].type === 2 &&
                ((optInfo[key].parent && formLabelAlign[optInfo[key].parent]) ||
                  !optInfo[key].parent)
            "
          >
            <el-form-item
              :label="optInfo[key].label"
              :rules="[
                {
                  required: !!optInfo[key].require,
                  message: optInfo[key].label + '不能为空'
                }
              ]"
            >
              <el-select
                v-model="formLabelAlign[key]"
                placeholder="请选择"
                @change="getChildren(arguments, key)"
              >
                <el-option
                  v-for="it in optInfo[key].options.data"
                  :key="it"
                  :value="it"
                  :label="it"
                />
                <el-option value="node-other" label="其他" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                optInfo[key].options.canInput &&
                  formLabelAlign[key] === 'node-other'
              "
              :rules="[
                {
                  required: !!optInfo[key].require,
                  message: optInfo[key].label + '不能为空'
                }
              ]"
            >
              <!-- 如果选择其他，为 formLabelAlign 绑定  -input后缀字段，保存时判断是否选择other 是的话取 -input后缀的值-->
              <el-input
                v-model="formLabelAlign[key + '-input']"
                placeholder="请输入"
                class="input-width"
                size="mini"
                @blur="inputChildren(arguments, key)"
              />
            </el-form-item>
          </div>
          <div
            v-if="
              optInfo[key].type === 3 &&
                ((optInfo[key].parent && formLabelAlign[optInfo[key].parent]) ||
                  !optInfo[key].parent)
            "
          >
            <p style="margin-top: 10px;">
              {{ optInfo[key].label }}
              <i
                class="el-icon-circle-plus-outline"
                @click="addElement(key)"
              />
              <i
                v-if="formLabelAlign[key].length > 1"
                class="el-icon-remove-outline"
                @click="deleteElement(formLabelAlign[key])"
              />
            </p>
            <div v-for="(it, idx) in formLabelAlign[key]" :key="idx">
              <div v-for="(opt, opIdx) in optInfo[key].options" :key="opIdx">
                <el-form-item
                  v-if="opt.type === 1"
                  :label="opt.label + ' - ' + (idx + 1)"
                  :rules="[
                    {
                      required: !!optInfo[key].require,
                      message: opt.label + '不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="formLabelAlign[key][idx][opt.name]"
                    placeholder="请输入"
                    class="input-width"
                    size="mini"
                  />
                </el-form-item>

                <div v-if="opt.type === 2">
                  <el-form-item
                    :label="opt.label + ' - ' + (idx + 1)"
                    :rules="[
                      {
                        required: !!optInfo[key].require,
                        message: opt.label + '不能为空'
                      }
                    ]"
                  >
                    <el-select
                      v-model="formLabelAlign[key][idx][opt.name]"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="thr in opt.options.data"
                        :key="thr"
                        :value="thr"
                        :label="thr"
                      />
                      <el-option value="node-other" label="其他" />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="
                      opt.options.canInput &&
                        formLabelAlign[key][idx][opt.name] === 'node-other'
                    "
                    :rules="[
                      {
                        required: !!optInfo[key].require,
                        message: opt.label + '不能为空'
                      }
                    ]"
                  >
                    <el-input
                      v-model="formLabelAlign[key][idx][opt.name + '-input']"
                      placeholder="请输入"
                      class="input-width"
                      size="mini"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <el-divider />
          </div>
        </div>
        <!-- 每个节点都有net属性，单独拿出来 -->
        <div v-if="showNet">
          <p style="margin-top: 10px;">
            网络
            <i
              class="el-icon-circle-plus-outline"
              @click="addElement('net')"
            />
            <i
              v-if="formLabelAlign.net && formLabelAlign.net.length > 1"
              class="el-icon-remove-outline"
              @click="deleteElement(formLabelAlign.net)"
            />
          </p>

          <div v-for="(net, idx) in formLabelAlign.net" :key="idx">
            <el-form-item
              :label="'ip' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'ip不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].ip"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
            <el-form-item :label="'mac' + ' - ' + (idx + 1)" :rules="[{ required: true, message: 'mac不能为空' }]">
              <el-input
                v-model="formLabelAlign.net[idx].mac"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              :label="'gateway' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'gateway不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].gateway"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              :label="'netmask' + ' - ' + (idx + 1)"
              :rules="[{ required: true, message: 'netmask不能为空' }]"
            >
              <el-input
                v-model="formLabelAlign.net[idx].netmask"
                placeholder="请输入"
                class="input-width"
                size="mini"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="del-btn">
      <el-button style="width: 100%;" plain @click="delNode">删除</el-button>
      <br>
      <el-button
        v-if="
          curSelectCell &&
            curSelectCell.data &&
            curSelectCell.data.type === 'ics_device'
        "
        :loading="proLoading"
        type="primary"
        style="width: 100%;margin-top: 5px;"
        plain
        @click="sendToProfessional"
      >提交到专业组件库</el-button>
    </div>

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
      <span>删除后，该节点的已编辑的信息和节点下关联的相关节点将同时被删除</span>
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
import request from '@/utils/request'
import { componentPro } from '@/api/topo'

export default {
  data() {
    return {
      formLabelAlign: {},
      dialogVisible: false,
      backUpData: {},
      optInfo: {},
      showNet: false,
      nodeLabel: '',
      proLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'canEdit',
      'curSelectCell',
      'curCellId',
      'curCellType',
      'topoComponents',
      'topoComOptions'
    ])
  },
  watch: {
    curCellId() {
      if (this.curCellType === 'node') {
        this.createFormData()
      }
    },
    formLabelAlign: {
      // 监听的对象
      deep: true, // 深度监听设置为 true
      handler(newV) {
        // overwrite覆盖数据，需将其他数据取出，重新赋值，整体覆盖
        const origin = this.curSelectCell.data
        origin.data = newV
        this.curSelectCell.setData(origin, { overwrite: true })
      }
    }
  },
  methods: {
    ...mapActions('topo', ['changeTopoState']),
    sendToProfessional() {
      const data = this.curSelectCell.data?.data
      if (data) {
        const { firmware, model, vendor } = data
        if (!firmware || !model || !vendor || !this.nodeLabel) {
          return this.$message.warning('请填写完整信息')
        }
        this.proLoading = true
        componentPro({ label: this.nodeLabel, firmware, model, vendor }).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败')
          }
          this.proLoading = false
        })
      }
    },
    addElement(name) {
      this.formLabelAlign[name].push(
        JSON.parse(JSON.stringify(this.backUpData[name]))
      )
    },
    deleteElement(data) {
      data.pop()
    },
    firewallZonesDefault() {
      return [
        { zone: 'outside', ip: '', netmask: '' },
        { zone: 'inside', ip: '', netmask: '' },
        { zone: 'dmz', ip: '', netmask: '' }
      ]
    },
    createFormData() {
      // 原数据是否有保存的验证规则
      const {
        options,
        data: originData,
        label,
        net,
        display_type
      } = this.curSelectCell.data
      this.nodeLabel = label
      // 防火墙单独设置
      // if (+id === 11 && (!originData.zones || !originData.zones.length)) {
      //   originData.zones = this.firewallZonesDefault()
      // }
      // 获取需要编辑的节点的规则，及需要编辑的字段
      const comOpt = options
        ? this.curSelectCell.data
        : this.topoComponents.find(
            item => item.display_type === display_type
          ) || {}

      const formLabelAlign = {}
      this.backUpData = {
        net: {
          ip: '',
          mac: '',
          gateway: '',
          netmask: ''
        }
      }
      this.optInfo = []

      // 每个节点都有net属性
      this.$set(formLabelAlign, 'net', comOpt.showNet ? net : [])

      this.curSelectCell.data.options = comOpt.options

      // 重置下数据，如果没有对应的组件值，则终止
      if (!comOpt.options) return
      this.showNet = comOpt.showNet
      this.optInfo = JSON.parse(JSON.stringify(comOpt.options))

      // 格式化formdata value为输入值  { name: '', services: [ [ {value: '', 其他}, {} ] ] }
      Object.keys(this.optInfo).map(key => {
        const item = this.optInfo[key]
        if (!item.parent && item.options && item.options.dataForm) {
          request({
            url:
              item.options.dataForm + '?type=' + this.curSelectCell.data.type,
            method: 'get'
          }).then(res => {
            this.$set(item.options, 'data', res.data)
          })
        }
        if (
          item.parent &&
          item.options &&
          item.options.dataForm &&
          originData[item.parent]
        ) {
          this.getSelfData(originData[item.parent], item)
        }
        // originData 为已经录入数据，回显
        if (item.type !== 3) {
          this.$set(formLabelAlign, key, originData[key])
          // 如果选择了其他，回显自定义设置项
          if (originData[key + '-input'] && originData[key] === 'node-other') {
            this.$set(formLabelAlign, key + '-input', originData[key + '-input'])
          }
        } else {
          const nullData = {}
          item.options.map(op => {
            nullData[op.name] = ''
          })
          this.$set(formLabelAlign, key, originData[key])
          this.$set(this.backUpData, key, JSON.parse(JSON.stringify(nullData)))
        }
      })
      this.formLabelAlign = formLabelAlign
    },
    changeLabel(val) {
      function getByteLen(val, num) {
        let len = 0
        let code = ''
        for (let i = 0; i < val.length; i++) {
          const a = val.charAt(i)
          if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2
          } else {
            len += 1
          }
          if (len < num) {
            code += a
          }
        }
        return { len, code }
      }
      const info = getByteLen(val, 18)
      this.curSelectCell.attr('title/text', info.len > 18 ? info.code + '...' : val)
      this.curSelectCell.setData({ label: val })
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
    getSelfData(arg, val) {
      if (!arg) return
      if (val.options.dataForm) {
        request({
          url:
            val.options.dataForm +
            arg +
            '&type=' +
            this.curSelectCell.data.type,
          method: 'get'
        }).then(res => {
          this.$set(val.options, 'data', res.data)
        })
      }
    },
    getChildren(arg, key) {
      if (!arg || !arg[0]) return
      const child = this.optInfo[this.optInfo[key].child]
      if (child && child.options && child.options.dataForm) {
        request({
          url:
            child.options.dataForm +
            arg[0] +
            '&type=' +
            this.curSelectCell.data.type,
          method: 'get'
        }).then(res => {
          this.$set(child.options, 'data', res.data)
        })
      }
    },
    inputChildren(arg, key) {
      if (!arg || !arg[0]) return
      const child = this.optInfo[this.optInfo[key].child]
      if (child && child.options && child.options.dataForm) {
        request({
          url:
            child.options.dataForm +
            arg[0].target.value +
            '&type=' +
            this.curSelectCell.data.type,
          method: 'get'
        }).then(res => {
          this.$set(child.options, 'data', res.data)
        })
      }
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
    }
  }
}
</script>

<style lang="scss">
.config-node {
  padding-bottom: 100px;
  border: 1px solid #e1e5ec;
  position: relative;
  overflow: auto;
  .el-divider {
    margin: 10px 0 0 0;
  }
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
      // border-bottom: 1px solid #e1e5ec;
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
