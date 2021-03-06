import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 子菜单只显示于该路由的子路由长度 >= 1
 *
 * hidden: true                     true: 该路由不会显示在sidebar，如404,login
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
  {
    path: '/components',
    component: Layout,
    redirect: '/components/tinymce',
    name: 'Components',
    meta: { title: 'Components', icon: 'menu' },
    children: [
      {
        path: 'tinymce',
        component: () => import('@/views/components-demo/tinymce'),
        name: 'Tinymce',
        meta: { title: 'Tinymce' }
      },
      {
        path: 'markdown',
        component: () => import('@/views/components-demo/markdown'),
        name: 'Markdown',
        meta: { title: 'Markdown' }
      },
      {
        path: 'dropzone',
        component: () => import('@/views/components-demo/dropzone'),
        name: 'DropzoneDemo',
        meta: { title: 'Dropzone' }
      },
      {
        path: 'back-to-top',
        component: () => import('@/views/components-demo/back-to-top'),
        name: 'BackToTopDemo',
        meta: { title: 'Back To Top' }
      },
      {
        path: 'drag-select',
        component: () => import('@/views/components-demo/drag-select'),
        name: 'DragSelectDemo',
        meta: { title: 'Drag Select' }
      },
      {
        path: 'drag-schedule',
        component: () => import('@/views/components-demo/drag-schedule'),
        name: 'DragScheduleDemo',
        meta: { title: 'Drag Schedule' }
      },
      {
        path: 'drag-dialog',
        component: () => import('@/views/components-demo/drag-dialog'),
        name: 'DragDialogDemo',
        meta: { title: 'Drag Dialog' }
      },
      {
        path: 'sticky',
        component: () => import('@/views/components-demo/sticky'),
        name: 'StickyDemo',
        meta: { title: 'Sticky' }
      },
      {
        path: 'upload',
        component: () => import('@/views/components-demo/upload'),
        name: 'UploadDemo',
        meta: { title: 'Upload' }
      }
    ]
  },
  // 表格
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    redirect: '/table/complex-table',
    meta:{ title: 'Table', icon: 's-grid' },
    children: [
      {
        path: 'complex-table',
        name: 'ComplexTableName',
        component: () => import('@/views/table/complex-table'),
        meta: {title: 'Complex Table'},
      },
      {
        path: 'drag-table',
        name: 'DragTable',
        component: () => import('@/views/table/drag-table'),
        meta: {title: 'Drag Table'},
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
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "connection"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
          }
        ]
      },
      {
        path: "Menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: 'Menu2',
        meta: { title: "Menu2" }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

export default router;
