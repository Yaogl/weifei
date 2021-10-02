import { getComponentsList } from '@/api/topo'

const state = {
  zoom: 1,
  // 组合，默认为true
  compose: false,
  // 链接
  connect: false,
  // 是否可以编辑
  canEdit: false,
  // 当前选中节点
  curSelectCell: null,
  // 当前选中节点id
  curCellId: '',
  // 当前选中节点类型
  curCellType: 'grid',
  // 全部组件库信息
  topoComponents: [],
  // 组件库配置信息
  topoComOptions: [],
  // 当前组件最大id
  nextNodeId: '',
  // 删除弹窗是否显示
  removeVisibile: false
}

const mutations = {
  CHANGE_TOPO_STATE: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_NEXT_NODE_ID: state => {
    const curID = +state.nextNodeId || 1
    const nextID = curID + 1
    state.nextNodeId = nextID
  }
}

const actions = {
  changeTopoState({ commit }, data) {
    commit('CHANGE_TOPO_STATE', data)
  },
  addMaxId({ commit }) {
    commit('SET_NEXT_NODE_ID')
  },
  initTopoComponents({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.topoComponents && state.topoComponents.length) {
        resolve(state.topoComponents)
      } else {
        getComponentsList().then(res => {
          if (res.code === 200) {
            commit('CHANGE_TOPO_STATE', {
              key: 'topoComponents',
              value: res.data
            })
            resolve(res.data)
          } else {
            reject()
          }
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
