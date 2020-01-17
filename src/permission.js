import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 可以覆盖修改进度条样式
import { getToken, setToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import store from './store'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // 不显示右上角的loading圈圈

// 不用权限访问的白名单
const whiteList = ['/login', '/404']

// 全局前置守卫，是 每一次 导航改变的时候都会起作用
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
router.beforeEach(async(to, from, next) => {
    // console.log('start')
    // 进度条开始
    NProgress.start()

    // 设置页面title
    // 跟 setting.js 里的不是重复了吗，难道在创建路由实例前，setting 还没有加载？
    // 哦，title是动态的，setting 里的相当于默认 title
    // 例如 Dashboard - Vue Admin Simple
    document.title = getPageTitle(to.meta.title)
    // setToken('test')
    // 判断用户是否曾经登录
    // cookie里只存储token，不存储用户名，头像等信息，所以每一次登录都要拉取用户信息，以保证信息是最新的
    const hasToken = getToken()
    // console.log('获取token：',hasToken)
    if (hasToken) {
        // 获取到token，登录页重定向到 dashboard
        if (to.path === '/login') {
            console.log('path为/login')
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                // console.log('获取到name: ',hasGetUserInfo)
                next()
            }else {
                // console.log('拉取最新用户信息')
                // 因为用户信息不存储在本地，name 用作判断是否需要拉取用户信息 getUserInfo
                try {
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(
                        error || 'ERROR'
                    )
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // 没有token

        // 千万不能直接next({path: '/'})，这样具体的路径，因为 next 是中断当前导航去指定的导航
        // 状态不是 confirmed ，去指定的导航时又进来beforeEach，导致死循环

        // 可以直接去白名单的路由
        if(whiteList.indexOf(to.path) !== -1) {
            // console.log('whitelist')
            // 这里是不会死循环的原因，当导航到白名单里的路由时，会来到这里，然后next() 来确认confirmed 状态
            next()
        } else {
            // 否则重定向到login，为什么这里不会死循环？
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
