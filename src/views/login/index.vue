<template>
    <div 
    
    class="login-container">
        <el-form 
        status-icon
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
                    class="va-input__inner"
                    type="text"
                    v-model="loginForm.username"
                    placeholder="Username" 
                    auto-complete="on"
                />
            </el-form-item>
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
                    placeholder="Password"
                    auto-complete="on"
                />
                <span class="va-input__suffix" @click="showPwd">
                    <!-- 通过 passwordType 改变样式 -->
                    <i 
                        class="va-icon"
                        :class="passwordType === 'password' ? 'va-icon__viewoff' : 'va-icon__view'"
                    ></i>
                </span>
            </el-form-item>
            <el-button
                :loading="loading"
                class="va-login__submit"
                @click.prevent="handleLogin"
            >Login</el-button>
            <span></span>
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
          loading: false,
          redirect: undefined
      }
  },
  watch: {
      // 键是需要观察的表达式，值是对应回调函数。
      $route: {
          // 该回调将会在侦听开始之后被立即调用
          // 这个函数作用是：获取route的redirect值，因为存在未登录而去访问需要权限的url，此时会重定向到login，同时带上一个参数redirect
          // 所以要获取这个参数并赋值，当login成功时，跳转到这个原本想去的url
          handler: function(route) {
            //   console.log('route change --->', route)
              this.redirect = route.query && route.query.redirecthandlelogin
          },
          immediate: true
      }
  },
  methods: {
    test: function() {alert('1')},
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
        // 再次验证
        this.$refs.loginForm.validate(valid => {
            if(valid) {
                // console.log('handlelogin---->', valid)
                // 跳转到dashboard
                this.loading = true
                this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
                        // 如果是重定向到login页的，login成功后会跳转到原来想要去的url
                        this.$router.push({ path: this.redirect || '/' })
                        this.loading = false
                    })
                    .catch((error) => {
                        console.log('login页面---error-->', error)
                        this.loading = false
                    })
            }
            else {
                return false
            }
        })
    }
  }
}
</script>
<style lang="scss">
// 为什么加了scoped 属性反而不生效？
.login-container {
    .el-input {
        .el-input__inner {
            background: transparent;
            border: none;
            color: #fff;
            padding: 0;
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
    padding: 0 calc(50vw - 260px); // 相当于子元素的宽度是520px，同时水平居中，关键是保持了子元素的流动性(width: auto)
}

.login-form {
    padding: 160px 35px 0;
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
    border: 1px solid rgba(255,255,255,0.1);
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
    background: transparent;
    line-height: 50px;
    // vertical-align: 1px; 对齐问题
    width: 100%;
    padding: 0 50px;  // 给左边留出空隙给图标
    box-sizing: border-box; //  设置padding时，不会影响input的width，默认是padding-box
    &::-webkit-input-placeholder { // 需要这样设置？
        color: $dark_gray;
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
}
.va-input__error {
    position: absolute;
    top: 100%; left: 0;
    font-size: 12px;
    color: #F56C6C;
    padding-top: 4px;
}
</style>