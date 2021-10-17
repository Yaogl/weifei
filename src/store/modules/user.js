import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    userName: Cookies.get('userName')
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userName = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve) => {
      login(userInfo)
        .then(res => {
          commit('SET_USER_INFO', userInfo.uname)
          Cookies.set('loginUser', 'true')
          Cookies.set('userName', userInfo.uname)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_USER_INFO', '')
      Cookies.remove('loginUser')
      Cookies.remove('userName')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
