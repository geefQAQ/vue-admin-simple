import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
    baseURL: '/dev-api',  // url = base url + request url? request url 是什么
    timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求前做处理

        if (store.getters.token) {
            // 让每一个请求都带上token，Z-Token是一个头文件的key，根据需求修改
            config.headers['Z-Token'] = getToken()
        }
        // console.log('axios-request: ', config)

        return config
    },
    error => {
        // 处理请求错误
        console.log('error', error);
        return Promise.rejece(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 根据返回的code，弹出响应的提示，如没有收到正常返回的code，则提示错误
        // MessageBox.confirm('test',{
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'success'
        // })
        Message({
            message: '登录成功',
            type: 'success',
            duration: 3 * 1000
        })
        // console.log('axios-response: ', res)
        return res
    },
    error => {
        console.log('response err:', error)
        Message({
            message: error,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service