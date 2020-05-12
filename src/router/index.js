import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Modules */
import tableRoutes from './modules/table' 
import componentsRoutes from './modules/components' 
import nestedRouts from './modules/nested' 
import excelRoutes from './modules/excel' 
import articleRoutes from './modules/article' 
/**
 * Note: 子菜单只显示于该路由的子路由长度 >= 1
 *
 * hidden: true                     true: 该路由不会显示在sidebar，如404,login,article/edit
 * activeMenu: 'path'               path: 如编辑文章页面，需要指定一个页面来在sidebar上高亮显示
 * alwasShow: true                  true: 总是出现根路由，就算只有一个子路由，如果不设置或者false，只有两个以上的子路由时，才会出现包含层叠的效果
 */

/**
 * constantRoutes: 不需要权限
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
    component: () => import("@/views/error-page/404"),
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
];

/**
 * asyncRouters: 根据权限动态生成路由
 */
export const asyncRoutes = [
   // permission
   {
    path: "/permission",
    component: Layout,
    redirect: '/permission/page-permissin',
    meta: { 
      title: 'Permission', 
      icon: 'headset', 
      roles: ['admin', 'editor'] },
    children: [
      {
        path: 'page-permissin',
        component: () => import('@/views/permission/page-permissin'),
        name: 'PagePermission',
        meta: { title: 'Page Permission' }
      },
      {
        path: 'directive-perimission',
        component: () => import('@/views/permission/directive-permission'),
        name: 'DirectivePermission',
        meta: { title: 'Directive Permission' }
      }
    ]
  },
  // 组件demo
  componentsRoutes,
  // 表格
  tableRoutes,
  // 编辑文章
  articleRoutes,
  // tab标签页
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'refrigerator',roles: ['admin', 'editor'] }
      }
    ]
  },
  // 错误提示页
  {
    path: '/error',
    component: Layout,
    redirect: '/error/401',
    meta: { title: 'Error Page', icon: 'error', roles: ['admin', 'editor'] },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'ErrorPage401',
        meta: { title: '401' }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'ErrorPage404',
        meta: { title: '404' }
      }
    ]
  },
  // excel
  excelRoutes,
  // zip
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/export-zip',
    alwaysShow: true,
    meta: { title: 'Zip', icon: 'lollipop' },
    children: [
      {
        path: 'export-zip',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip', roles: ['admin', 'editor'] },
      }
    ]
  },
  // PDF
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'document-add', roles: ['admin', 'editor'] }
      }
    ]
  },
  // PDF download
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true,
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
        meta: { title: "Form", icon: "document-checked" }
      }
    ]
  },
  // nested
  nestedRouts,
  { path: '*', redirect: '/404', hidden: true } // *必须放在最好，理由你品
]

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

export default router;