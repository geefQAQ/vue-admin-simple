/**
 * 
 * @param {*} url 
 */

 export function parseTime(time, cFormat) {
    // 健壮性
    if(arguments.length === 0) {
        return null
    }
    // 默认参数
    const format = cFormat || '{y}-{m}-{d} {h}:{m}:{s}'
    
 }

/**
 * URL参数转换为对象
 * @param {string} url
 * @returns {Object}
 */

export function param2Obj(url) {
    // 假设 url='?a=1&b=2&"+'
    const search = url.split('?')[1]
    // search = 'a=1&b=2"+'
    if (!search) {
        return {}
    }
    // JSON.parse是反序列化，将JSON字符串转换成对象
    return JSON.parse(
        // decodeURIComponent 不包括 " 和 +
        '{"' +
        decodeURIComponent(search) // 'a=1&b=2"+'
            // 前面的\是要来转码后面的\，然后再转码"，最后"替换成",
            .replace(/"/g, '\\"')  // 'a=1&b=2"+'
            .replace(/&/g, '","')  // 'a=1","b=2"+'
            .replace(/=/g, '":"')  // 'a":"1","b":"2"+'
            .replace(/\+/g, ' ') + // 'a":"1","b":"2" '
    '"}'                           // '{"a":"1","b":"2" "}'
    )                              // {a:"1",b:"2" "}
}

/**
 * 检查元素是否有指定类名
 * @param {HTMLElement} ele 
 * @param {string} cls 
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match
    // https://regexr.com/
    return ele.classList.contains(cls)
    // return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}


/**
 * 直接在DOM添加类名
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele, cls) {
    return ele.classList.add(cls)
    // if(!hasClass(ele, cls)) {
    //     return ele.className = ele.className + ' ' + cls
    // }
}


/**
 * 直接在DOM删除类名
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    return ele.classList.remove(cls)
    // if(hasClass(ele, cls)) {
    //     const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    //     ele.className = ele.className.replace(reg, ' ')
    //     if(!ele.className === ' ') {
    //         ele.className = ''
    //     }
    // }
}