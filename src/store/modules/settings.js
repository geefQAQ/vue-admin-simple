import Cookies from 'js-cookie';

const state = {
    // theme: 
    // showSettings:
    tagsView: Cookies.get('tagViewStatus') ? !!+Cookies.get('tagViewStatus') : true,
    fixedHeader: Cookies.get('fixedHeaderStatus') ? !!+Cookies.get('fixedHeaderStatus') : false,
}

const mutations = {
    // 涉及的设置比较多，所以传参的时候要两个参数，一个是要改变的设置，一个是改变的值
    CHANGE_SETTING: (state, { key, value}) => {
        // 注意，这里不能用if(state[key])来判断有没有key，要用hasOwnProperty
        if(state.hasOwnProperty(key)) {
            state[key] = value
            // 分别把设置存储到cookies
            switch(key) {
                case 'tagsView':
                    if(value) {
                        Cookies.set('tagViewStatus', '1');
                    }else {
                        Cookies.set('tagViewStatus', '0');
                    }
                    break
                case 'fixedHeader':
                    if(value) {
                        Cookies.set('fixedHeaderStatus', '1');
                    }else {
                        Cookies.set('fixedHeaderStatus', '0');
                    }
            }
        }
    }
}

const actions = {
    changeSetting({commit}, params) {
        commit('CHANGE_SETTING', params)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}