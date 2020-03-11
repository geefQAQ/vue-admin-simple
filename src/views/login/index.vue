<template>
    <div class="login-container">
        <el-form
        ref="loginForm"
        :rules="loginRules"
        @keyup.enter.native="handleLogin"
        :model="loginForm"
        class="login-form">
            <h3 class="title">Login Form</h3>
            <el-form-item class="va-input" prop="username">
                <span class="va-input__prefix">
                    <i class="va-icon va-icon__user"></i>
                </span>
                <el-input
                    ref="username"
                    class="va-input__inner"
                    type="text"
                    v-model="loginForm.username"
                    placeholder="Username" 
                    auto-complete="on"
                    tabindex="1"
                />
            </el-form-item>
            <!-- <el-tooltip v-model="capsLockTip" effect="dark" content="大写锁定已打开" placement="right" manual> -->
                <el-form-item class="va-input" prop="password">
                    <span class="va-input__prefix">
                        <i class="va-icon va-icon__lock"></i>
                    </span>
                    <!-- password 的 placeholder 不好使？暂用 value 代替 -->
                    <!-- 通过v-model 1、解决 placeholder 不会隐藏的问题，2、focus后光标会自动后移，原理不清楚-->
                    <el-input 
                        class="va-input__inner"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        @keyup.native="handlePswKeyup"  
                        @keydown.native="handlePswKeydown"
                        @blur="capsLockTip = false"
                        placeholder="Password"
                        auto-complete="on"
                        tabindex="2"
                    />
                    <!-- input自带的show-password太简陋了 -->
                    <span class="va-input__suffix" @click="showPwd">
                        <i 
                            class="va-icon"
                            :class="passwordType === 'password' ? 'va-icon__viewoff' : 'va-icon__view'"
                        ></i>
                    </span>
                </el-form-item>
            <!-- </el-tooltip> -->
            <el-button
                :disabled="loginLoading"
                class="va-login__submit"
                @click.prevent="handleLogin"
            >{{ loginLoading ? '登录中，请稍后...' : '登录'}}</el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data: function () {
      const validateUsername = (rule, value, callback) => {
          if(!validUsername(value)) {
              callback(new Error('请输入正确的用户名'))
          }
          else {
              callback()
          }
      }
      const validatePassword = (rule, value, callback) => {
          if(value.length < 6) {
              callback(new Error('密码长度不能小于6'))
          } else {
              callback()
          }
      }
      return {
          loginRules:{
            username: [{ required: true, trigger: 'blur', validator: validateUsername }],
            password: [{ required: true, trigger: 'blur', validator: validatePassword }]
          },
          passwordType: 'password',
          loginForm: {
            username: 'admin',
            password: '111111'
          },
          capsLockTip: false,
          redirect: undefined,
          otherQuery: {},
          loading: false,
          loginLoading: false,
      }
  },
  watch: {
      // 键是需要观察的表达式，值是对应回调函数。
      $route: {
          // 该回调将会在侦听开始之后被立即调用
          // 这个函数作用是：获取route的redirect值，因为存在未登录而去访问需要权限的url，此时会重定向到login，同时带上一个参数redirect
          // 所以要获取这个参数并赋值，当login成功时，跳转到这个原本想去的url
          handler: function(route) {
            // console.log('route change --->', route)
            const { query } = route
            // console.log('query', query)
            if(query) {
                this.redirect = query.redirect
                this.otherQuery = this.getOtherQuery(query)
            }
          },
          immediate: true
      }
  },
  mounted() { // 优化体验
      if(!this.loginForm.username) {
          this.$refs.username.focus()
      }else if(!this.loginForm.password) {
          this.$refs.password.focus()
      }
  },
  methods: {
    //  Caps的keyup与keydown与一般key不同，keydown就是灯亮，keyup就是灯灭
    handlePswKeyup({ shiftKey, key }) {
        if(key === 'CapsLock' && this.capsLockTip === true) {
            this.capsLockTip = false
        }
        if(key && key.length === 1) { // 为什么长度为1，因为像功能键command，key是'Meta'，这里只校验长度为1的字母
            if(!shiftKey && (key >= 'A' && key <= 'Z')) {
                this.capsLockTip = true
            }
        }
    },
    handlePswKeydown({ key }) {
        if(key === 'CapsLock' && this.capsLockTip === false) {
            this.capsLockTip = true
        }
    },
    showPwd: function() {
    // 简单逻辑判断
        if(this.passwordType === 'password') {
            this.passwordType = ''
        }
        else {
            this.passwordType = 'password'
        }
        // 点击之后直接focus到password
        this.$nextTick(() => {
            this.$refs.password.focus()
      })
    },
    handleLogin: function() {
        // 验证
        this.$refs.loginForm.validate(valid => {
            if(valid) {
                // console.log('handlelogin---->', valid)
                // 跳转到dashboard
                this.loginLoading = true
                this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
                        // 如果是重定向到login页的，login成功后会跳转到原来想要去的url
                        setTimeout(() => {
                            this.$router.push({ path: this.redirect || '/' , query: this.otherQuery})
                            this.loginLoading = false
                        }, 1500)
                    })
                    .catch((error) => {
                        console.log('login页面---error-->', error)
                        // this.loading = false
                    })
            }
            else {
                return false
            }
        })
    },
    // 如果query的左边不是redirect的情况，其他值的情况(其实就是除去redirect)
    // 要注意，如果router里有匹配*然后跳转404的路由的话，这个就没用，建议router分成constantRouter和asyncRouter，把*404放asyncRouter里
    // 否则如果匹配不到，就不会走到permission中的next(`/login?redirect=${to.path}`)，会优先匹配404然后跑到whiteList.indexOf(to.path) !== -1
    getOtherQuery(query) {
        // return Object.keys(query).reduce((acc, cur) => {
        //     if(cur !== 'redirect') {
        //         acc[cur] = query[cur]
        //     }
        //     return acc
        // }, {})

        // 这好像没什么不同
        delete query['redirect']
        return query
    }
  }
}
</script>
<style lang="scss">
// 为什么加了scoped 属性反而不生效？答：很简单，搞清楚scope是什么，这里是全局的样式，所以要注意添加父元素的类名
// 其实登录框算是一种特殊的form，所以对ui改造一下是十分有必要的，甚至可以单独出一份login.scss
.login-container {
    .el-input {
        .el-input__inner {
            background: transparent;
            border-color:rgba(255, 255, 255, .1);
            color: #fff;
            padding: 0 50px;
            height: 50px;
            line-height: 50px; // 给左边留出空隙给图标
            &:hover {
                border-color: #c0c4cc;
            }
            &:focus {
                outline: none;
                border-color: #409eff;
            }
            
        }
    }
    .el-form-item.is-error {
        .el-input__inner {
            border-color: #F56C6C;
        }
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;

.login-container {
    min-height: 100%;
    background: $bg;
    // 相当于子元素的宽度是520px，同时水平居中，关键是保持了子元素的流动性(width: auto)
    // 但是当出现滚动条时，vw的宽度减少，导致了form表格的宽度变小，而实际上要保持form宽度
    // padding: 0 calc(50vw - 260px);
    width: 100%;
}

.login-form {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    max-width: 100%; // 有什么用？
    background: $bg;
    color: $dark_gray;
}

.title {
    color: #eee;
    font-size: 26px;
    text-align: center;
    margin-bottom: 40px;
}

.va-input {
    position: relative;
    // border: 1px solid rgba(255,255,255,0.1);
    border-radius: 5px;
    color: $dark_gray;
    background: rgba(0,0,0,0.1);
    margin-bottom: 22px;
}

.va-input__prefix {
    text-align: center;
    position: absolute;
    top: 0; left: 0;
}

.va-input__suffix {
    text-align: center;
    position: absolute;
    top: 0; right: 0;
}

.va-icon {
    display: inline-block;
    line-height: 50px;
    width: 50px;
}

.va-input__inner {
    color: #eee;    
    border-radius: 5px;
    line-height: 50px;
    width: 100%;
    &::-webkit-input-placeholder { // 需要这样设置？
        color: $dark_gray;
    }
    &:focus {
        border-color: #409eff;
    }
}

.va-login__submit {
    color: #fff;
    width: 100%;
    text-align: center;
    font-weight: 500;
    line-height: 50px;
    background-color: #409EFF;
    border-radius: 4px;
    border: none;
    padding: 0;
    &:hover, &:focus {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }
}
.va-input__error {
    position: absolute;
    top: 100%; left: 0;
    font-size: 12px;
    color: #F56C6C;
    padding-top: 4px;
}
</style>