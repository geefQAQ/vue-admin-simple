// 动态设置页面title
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

function getPageTitle(pageTitle) {
    if(pageTitle) {
        // 例如 Dashboard - Vue Admin Simple
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}

export default getPageTitle