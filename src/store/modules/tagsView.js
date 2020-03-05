
const state = {
    visitedViews: [],
    // 什么情况是visitedViews里存在，而cachedViews不存在的情况？暂时不清楚什么情况下要用
    // cachedViews: []
}

const mutations = {
    // 添加已访问的url作为新加标签页
    ADD_VISITED_VIEW: (state, view) => {
        // view作为传入的参数，是一个$route对象
        // 不重复添加，some函数的v参数是数组里的元素，当匹配到元素的path和view.path一致，就不添加
        if(state.visitedViews.some(v => v.path === view.path) ) return
        // 如果用这种方法，会导致不能更新特定的view的属性，如title
        // state.visitedViews.push( view
        //     // 对象添加属性的一种方法是Object.assign
        //     // Object.assign({}, view)
        // )
        // 这样才能更新title，不然在更新属性的时候回报错，提示属性是只读的，建议再好好看下vuex中更新属性的部分
        state.visitedViews.push(
            Object.assign({}, view, {
              title: view.meta.title || 'no-name'
            })
        )
    },
    // 关闭标签页=>删除数组中对应的元素
    DEL_VISITED_VIEW: (state, view) => {
        // entries方法：方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
        // 要同时遍历索引和值，可以用[i, v]这种方法，但是注意，这种方法只能迭代可迭代对象，或者map
        // 所以要对数组变成一个可迭代对象，也就是用entries()方法
        for(const [i, v] of state.visitedViews.entries()) {
            if(v.path === view.path) {
                // 从索引i的开始，删除一个元素（也就是索引为i的元素）
                state.visitedViews.splice(i, 1)
                break
            }
        }
        // 其实可以用传统for循环，只是没上面的优雅，而且传说的for循环代码会更多
        // const arr = state.visitedViews
        // for(let i = 0; i <= arr.length; i++) {
        //     if(arr[i].path === view.path) {
        //         arr.splice(i, 1)
        //     }
        // }
    },
    // 删除除了选中标签之外其他标签
    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
        // filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
        state.visitedViews = state.visitedViews.filter(v => {
            // 当然还有affix标签
            return (v.path === view.path || v.meta.affix)
        })
    },
    // 关闭所有标签页
    DEL_ALL_VISITED_VIEWS: state => {
        // 除了affix标签
        const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
        state.visitedViews = affixTags
    },
    // 更新标签页(例如，编辑文章页面，需要不同的标签名)
    // UPDATE_VISITED_VIEW: (state, view) => {
    //     for(let v of state.visitedViews) {
    //         if(v.path === view.path) {
    //             // path是判断的条件，实际上改变的是title，因为tagsviews是按照title来生成的
    //             // 奇怪的是，在这里打印 v 是assign之后的值，debugger的时候才能正确显示assign之前的值，原因暂不明白
    //             v = Object.assign(v, view)
    //             break
    //         }
    //     }
    // }
    UPDATE_VISITED_VIEW: (state, view) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view)
                return
            }
        }
    }
}

const actions = {
    addVisitedView ({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    delVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            // 传递给then方法的fullfill参数
            // resolve({
            //     visitedViews:state.visitedViews
            // })
            // 为什么不直接上面那样返回state.visitedViews，细心会发现，前者是一个observer?之类的东西，是store的结构
            // 而下者是一个数组，更容易去处理吧，所以先扩散再转换为数组
            resolve({visitedViews:[...state.visitedViews]})
        })
    },
    delOtherViews({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve({
                visitedViews:[...state.visitedViews]
            })
        })
    },
    delAllViews({ commit, state }) {
        return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS')
            resolve({
                visitedViews: [...state.visitedViews]
            })
        })
    },
    updateVisitedView({ commit }, view) {
        commit('UPDATE_VISITED_VIEW', view)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}