import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    // 登录组件调用的 action, userInfo 是参数
    const { username, password } = userInfo;
    // api 暴露出来的方法都是 promise
    return new Promise((resolve, reject) => {
      // login 是 api 的方法，response 是请求成功返回的数据
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        // 请求成功，则把获取到的 token 保存到管理状态的 state.token
        commit('SET_TOKEN', data.token)
        // 请求成功，则保存到本地 token ，vuex 是页面刷新就丢失数据的，cookie 则在 maxage/expire 内还在浏览器保存
        setToken(data.token)
        // 记得 resolve
        resolve()
      }).catch(error => {
        reject(error)
      });
    });
  },


  // get user info 
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('检验失败，请重新登录')
        }

        const { name, avatar, roles } = data

        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLES', roles)
        resolve(data) // 需要返回值
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        // 不仅要清除cookie，整个state都要清空
        // 因为 vuex 是在刷新页面才会重新初始化，当在不刷新页面下admin -> logout -> editor -> login
        // vuex 依然会保存 user.name 和 avatar，导致信息显示不正确
        // 清除name 后就可以保证每次登陆会拉取最新信息
        commit('SET_NAME', '')
        removeToken()
        // resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}