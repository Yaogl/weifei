import { login } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
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
          if (res) {
            setToken(res)
            Cookies.set('userName', userInfo.uname)
            commit('SET_USER_INFO', userInfo.uname)
            resolve()
          }
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
      removeToken()
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
