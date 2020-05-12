/**
 * @param {String} str
 * @returns {Boolean}
 */
export function validUsername (str) {
    const valid_map = ['admin', 'editor', 'intern']
    // 我就用includes!，包含了就返回true
    return valid_map.includes(str.trim())
}