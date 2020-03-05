import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Modules */
import tableRoutes from './modules/table' 
import componentsRoutes from './modules/components' 
import nestedRouts from './modules/nested' 
/**
 * Note: 子菜单只显示于该路由的子路由长度 >= 1
 *
 * hidden: true                     true: 该路由不会显示在sidebar，如404,login,article/edit
 * activeMenu: 'path'               path: 如编辑文章页面，需要指定一个页面来在sidebar上高亮显示
 */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        // 动态路径参数 以冒号开头，*表示正则，0个或多个参数
        // 比如，刷新example/table页，会接收这个example/table作为$route.params
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "Dashboard",
          icon: "odometer",
          affix: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: "index",
      component: () => import("@/views/guide/index"),
      name: "Guide",
      meta: {
        title: "Guide",
        icon: "guide"
      },
      }
    ]
  },
  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/index',
    children: [{
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: { title: 'Icons', icon: 'no-smoking' }
    }]
  },
  // 组件demo
  componentsRoutes,
  // 表格
  tableRoutes,
  // 编辑文章
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    redirect: '/article/article-detail',
    meta: { title: 'Article', icon: 'toilet-paper' },
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
  },
  {
    path: "/example",
    component: Layout,
    // name要来干嘛？
    name: "Example",
    redirect: "/example/table",
    meta: {
      title: "Example",
      icon: "basketball",
    },
    children: [
      {
        path: "table",
        name: "ExampleTable",
        component: () => import("@/views/example/table"),
        meta: {
          title: "Example Table",
          icon: "headset"
        }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/example/tree"),
        meta: {
          title: "Tree",
          icon: "umbrella"
        }
      },
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test"),
        meta: {
          title: "Test"
        }
      }
    ]
  },
  {
    path: "/form",
    component: Layout,
    redirect: "/form/index",
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "document-checked", affix: true }
      }
    ]
  },
  // nested
  nestedRouts,
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

export default router;
