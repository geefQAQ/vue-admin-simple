import Cookies from 'js-cookie'

// 要注意，cookie是在浏览器里面的，就是在所有页面都有
const TokenKey = 'vue_admin_simple_token'

function getToken() {
    return Cookies.get(TokenKey)
}

function setToken(token) {
    return Cookies.set(TokenKey, token)
}

function removeToken() {
    return Cookies.remove(TokenKey)
}

export {
    getToken,
    setToken,
    removeToken
}