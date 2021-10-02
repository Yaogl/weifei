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
    path: '/topo',
    component: BaseView,
    children: [
      {
        path: '/assess/add',
        name: 'Topo',
        component: () => import('@/views/topo')
      }
    ]
  },
  {
    path: '/assess',
    component: InfoView,
    redirect: '/assess/list',
    children: [
      {
        path: '/assess/list',
        name: 'AssessList',
        component: () => import('@/views/assess/assessList'),
        meta: { title: '', icon: '' }
      },
      {
        path: 'info',
        name: 'assessInfo',
        component: () => import('@/views/assess/assess-info'),
        meta: { title: '评估详情', icon: '', back: true }
      },
      {
        path: '/assess/topo-list',
        name: 'TopoList',
        component: () => import('@/views/assess/topoList'),
        meta: { title: '拓扑图', icon: '', back: true }
      },
      {
        path: '/assess/company-detail',
        name: 'CompanyDetail',
        component: () => import('@/views/assess/companyDetail'),
        meta: { title: '企业详情', icon: '', back: true }
      },
      {
        path: '/assess/company-edit',
        name: 'CompanyEdit',
        component: () => import('@/views/assess/companyEdit'),
        meta: { title: '企业详情', icon: '', back: true }
      }
    ]
  },
  {
    path: '/set',
    component: InfoView,
    redirect: '/setting/user',
    children: [
      {
        path: '/setting/user',
        name: 'Account',
        component: () => import('@/views/set/account'),
        meta: {}
      },
      {
        path: '/component/list',
        name: 'ComponentProList',
        component: () => import('@/views/set/componentProList'),
        meta: {}
      },
      {
        path: '/role/list',
        name: 'Role',
        component: () => import('@/views/set/role'),
        meta: {}
      },
      {
        path: '/survey/manage',
        name: 'Question',
        component: () => import('@/views/set/question'),
        meta: {}
      },
      {
        path: '/set/role-add',
        name: 'RoleAdd',
        component: () => import('@/views/set/roleAdd'),
        meta: { title: '添加角色', icon: '', back: true }
      },
      {
        path: '/company/list',
        name: 'Company',
        component: () => import('@/views/set/company'),
        meta: { title: '公司管理', icon: '' }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test'),
        meta: { title: '测试', icon: '' }
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
