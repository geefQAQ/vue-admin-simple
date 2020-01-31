const steps = [
    {
        element: '.va-hamburger-container',
        popover: {
            title: '侧边栏按钮',
            description: '显示于关闭侧边栏',
            position: 'right',
            // offset: 20,
        },
    },
    {
        element: '.va-breadcrumb',
        popover: {
            title: '导航栏',
            description: '当前位置的页面',
            position: 'right'
        },
        
    },
    {
        element: '.va-tagsview-container',
        popover: {
            title: '标签栏',
            description: '显示访问过的标签页',
            position: 'bottom'
        },
    }, 
    // 在这里用时会出现问题，暂不明了
    // {
    //     element: '.va-rightpanel-button',
    //     popover: {
    //         title: '工具栏',
    //         description: '修改全局样式',
    //         position: 'left'
    //     },
    // }, 
]
export default steps