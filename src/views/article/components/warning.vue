<template>
    <aside>
        目前缓存的方案对于某些业务是不适合的，比如文章详情页这种 /article/1 /article/2，他们的路由不同但对应的组件却是一样的，所以他们的组件 name 就是一样的，就如前面提到的，keep-alive的 include 只能根据组件名来进行缓存，所以这样就出问题了。目前有两种解决方案：
        不使用 keep-alive 的 include 功能 ，直接是用 keep-alive 缓存所有组件，这样子是支持前面所说的业务情况的。 前往@/layout/components/AppMain.vue文件下，移除include相关代码即可。当然直接使用 keep-alive 也是有弊端的，他并不能动态的删除缓存，你最多只能帮它设置一个最大缓存实例的个数 limit。相关 issue
        使用 localStorage 等浏览器缓存方案，自己进行缓存处理
        <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/tags-view.html#visitedviews-cachedviews">点击这里查看更多</a>
    </aside>
</template>
