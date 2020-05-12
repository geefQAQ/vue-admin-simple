import Layout from '@/layout'
const excelRoutes = {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: { 
      title: 'Excel', 
      icon: 'document',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel', roles: ['admin', 'editor', 'intern'] },
      },
      {
        path: 'export-selected',
        component: () => import('@/views/excel/export-selected'),
        name: 'ExportSelected',
        meta: { title: 'Export Selected', roles: ['admin', 'intern'] }
      },
      {
        path: 'merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header', roles: ['admin', 'editor'] }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel', roles: ['admin'] }
      }
    ]
  }

export default excelRoutes
