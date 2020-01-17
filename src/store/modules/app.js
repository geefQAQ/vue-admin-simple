import Cookies from 'js-cookie'

const state = {
    sidebar: {
        // 获取opened值的时候，会先查询cookie的sidebarStatus的值，'1'代表打开，'0'代表不打开
        // get()方法返回的值是字符串，要先通过+强制转换为数值，然后通过!!转换为boolean
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        // 存储到cookie
        if(state.sidebar.opened) {
            // 注意了，cookie的值最好写成字符串形式，因为get()方法返回的cookie值是一个string
            Cookies.set('sidebarStatus', '1')
        }else {
            Cookies.set('sidebarStatus', '0')
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
        Cookies.set('sidebarStatus', '0')
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    }
}

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}