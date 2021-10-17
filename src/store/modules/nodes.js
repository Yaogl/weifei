import { dictsearch } from '@/api/node'
const isEmptyArr = (arr) => {
  if (!Array.isArray(arr)) return true
  return !arr.length
}

const state = {
  nodeCountryList: [],
  nodeFirmwareList: [],
  nodeCpuList: [],
  nodeBrandList: [],
  nodeModelList: [],
  modelMap: {}
}

const mutations = {
  CHANGE_BASE_INFO: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_MODEL_MAP: (state, { key, value }) => {
    state.modelMap[key] = value
    state.nodeModelList = value
  }
}

const actions = {
  // 获取搜索下拉项
  initSearchOptions({ commit, state }) {
    // 字典类型 ：
    // 国家 country 1
    // 固件版本 firmware 2
    // cpu框架 cpu 3
    // 品牌 brand 4
    // 型号 model 5
    isEmptyArr(state.nodeCountryList) && dictsearch({ type: 1 }).then(res => {
      commit('CHANGE_BASE_INFO', { key: 'nodeCountryList', value: res })
    })
    isEmptyArr(state.nodeFirmwareList) && dictsearch({ type: 2 }).then(res => {
      commit('CHANGE_BASE_INFO', { key: 'nodeFirmwareList', value: res })
    })
    isEmptyArr(state.nodeCpuList) && dictsearch({ type: 3 }).then(res => {
      commit('CHANGE_BASE_INFO', { key: 'nodeCpuList', value: res })
    })
    isEmptyArr(state.nodeBrandList) && dictsearch({ type: 4 }).then(res => {
      commit('CHANGE_BASE_INFO', { key: 'nodeBrandList', value: res })
    })
  },
  getModelOptions({ commit, state }, val) {
    if (!state.modelMap[val]) {
      dictsearch({ type: 5, relval: val }).then(res => {
        commit('SET_MODEL_MAP', { key: val, value: res })
      })
    } else {
      commit('SET_MODEL_MAP', { key: val, value: state.modelMap[val] })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

