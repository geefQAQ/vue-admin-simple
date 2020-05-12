
import Layout from '@/layout'
const tableRoutes = {
    path: '/table',
    component: Layout,
    name: 'Table',
    redirect: '/table/complex-table',
    meta:{ 
      title: 'Table', 
      icon: 's-grid',
      roles: ['admin', 'editor']
    },
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
      },
      {
        path: 'inline-edit',
        name: 'InlineEdit',
        component: () => import('@/views/table/inline-edit-table'),
        meta: {title: 'Inline Edit'}
      },
      {
        path: 'dynamic-table',
        name: 'DynamicTable',
        component: () => import('@/views/table/dynamic-table/index'), // 注意要添加路径/index，不添加会自动加载为xxx.vue
        meta: {title: 'Dynamic Table'}
      }
    ]
}
export default tableRoutes