import { constantRoutes, asyncRoutes } from '@/router'
const state = {
    routes : constantRoutes
}

const mutations = {
    ASYNC_ROUTES: (state, routes) => {
        state.routes = constantRoutes.concat(routes)
    } 
}

const actions = {
    generateRoutes({commit, state}, roles) {
        // console.log('generateRoutes')
        // hasPermission
        return new Promise((resolve, reject) => {
            let result = hasPermission(roles, asyncRoutes)
            commit('ASYNC_ROUTES', result)
            result = constantRoutes.concat(result)
            console.log('result', result)
            resolve(result)
        })
        .catch(err => {
            console.log('err', err)
        })
    }
}

function hasPermission(roles, routes) {
    // console.log('routes', routes)
    
    let res = []
    routes.forEach(route => {
        if(route.meta && route.meta.roles && route.meta.roles.length > 0) {
            res.push(route)
        }
        else if(route.children && route.children.length > 0) {
            let tempArr = []
            route.children.forEach(cRoute => {
                if(cRoute.meta && cRoute.meta.roles && cRoute.meta.roles.length > 0) {
                    // console.log('cRoute', cRoute)
                    tempArr.push(cRoute)
                }
                // console.log('tempArr', tempArr)
                route.children = tempArr
            })
            if(route.children.length > 0) {
                res.push(route)
            }
        }
    })
    console.log('res', res)
    return res
}

// 1、判断该路由有没有meta.roles属性，没有则push到res
// 2、有的话进入下一步比对
// 3、比对函数返回符合权限的routes

export default {
    namespaced: true,
    state,
    mutations,
    actions
}