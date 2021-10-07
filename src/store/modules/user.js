import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    permissions: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { uname, pwd } = userInfo
    return new Promise((resolve) => {
      setToken(uname + pwd)
      commit('SET_TOKEN', uname + pwd)
      resolve()
      // login({ username: username.trim(), password: password })
      //   .then(response => {
      //     const { data } = response
      //     commit('SET_TOKEN', data.token)
      //     setToken(data.token)
      //     resolve()
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response

          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const {
            username,
            avatar,
            permissions,
            companyName,
            companyId
          } = data

          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          commit('SET_PERMISSIONS', permissions)
          if (companyId > 0 && !companyName) {
            router.push(`/assess/company-edit?id=${companyId}`)
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          console.log('退出登录')
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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
