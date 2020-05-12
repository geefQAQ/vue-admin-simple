import Layout from '@/layout'
const articleRoutes = {
    path: '/article',
    component: Layout,
    name: 'Article',
    redirect: '/article/article-detail',
    meta: { 
      title: 'Article', 
      icon: 'toilet-paper',
      roles: ['admin', 'editor'] },
    children: [
      {
        path: '/article-detail',
        component: () => import('@/views/article/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'milk-tea' }
      },
      {
        path: '/article-list',
        component: () => import('@/views/article/article-list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'burger' }
      },
      {
        path: '/article/edit/:id',
        component: () => import('@/views/article/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', activeMenu: '/article-list' },
        hidden: true
      }
    ]
}
export default articleRoutes