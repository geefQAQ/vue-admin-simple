import Layout from '@/layout'

const componentsRoutes = {
    path: '/components',
    component: Layout,
    redirect: '/components/tinymce',
    name: 'Components',
    meta: { 
      title: 'Components', 
      icon: 'menu',
      roles: ['admin', 'editor'] },
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
  }
  export default componentsRoutes