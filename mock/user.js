const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    },
    intern: {
        token: 'intern-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: '超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: '编辑',
        avatar: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
        name: 'Normal Editor'
    },
    'intern-token': {
        roles: ['intern'],
        introduction: '实习',
        avatar: 'https://s1.ax1x.com/2020/03/12/8VBYL9.gif',
        name: 'Trainee'
    }
}

export default [
    // user login
    {
        // 拦截的请求参数
        url: '/user/login',
        type: 'post',
        // 返回数据
        response: config => {
            // config 是 登录表单里的数据，如{ username: admin; password: 123123 }
            // 则这里的 username = admin
            const { username } = config.body
            // 相应的 tokens['admin']
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: '用户名或密码不正确'
                }
            }
            // 请求成功，返回token
            return {
                code: 20000,
                data: token
            }
        }
    },

    // get user info 
    {
        // reg: 
        // .: 匹配除了换行符(\n)之外的单字符
        // *: 匹配前面的表达式0次或多次
        // 意思是 /user/info 后面除了\n 全部都匹配
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            // 所有get请求都带有 token，譬如token是admin-token
            const { token } = config.query
            // 根据 token 获取数据
            const info = users[token]
            // console.log('get-user-mock',info)
            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: '登录失败，未能获取用户信息'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },


    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                // data 还是 message 取决于是否显示提示框 
                data: 'success'
            }
        }
    }
]