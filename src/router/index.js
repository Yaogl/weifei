import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import InfoView from '@/layout/InfoView'
import BaseView from '@/layout/baseView'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: BaseView,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: BaseView,
    redirect: '/nodes',
    children: [
      {
        path: 'nodes',
        name: 'nodes',
        component: () => import('@/views/nodes/index'),
        meta: { title: 'nodes mangement' }
      },
      {
        path: '/operation-record',
        name: 'OperationRecord',
        component: () => import('@/views/nodes/operation-record'),
        meta: { title: '/operation-record' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
