import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app'

const routes = [
  {
    path: '/reg',
    name: 'reg',
    component: ()=>import('../pages/Registration'),
    meta: {
      layout: 'Auth',
      redirect: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../pages/Login'),
    meta:{
      layout: 'Auth',
      redirect: true,
    }
  },
  {
    path: '/',
    name: 'main',
    component: ()=>import('@/pages/Main'),
    meta:{
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/pages/CreateService'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/pages/ProposedJobs'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/Profile'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/performers',
    name: 'performers',
    component: ()=> import('@/pages/Performers'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/approval',
    name: 'approval',
    component: () => import('@/pages/Approval'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    name: 'requests',
    path: '/requests',
    component: () => import('@/pages/Requests'),
    meta: {
      layout: 'Base',
      auth: true,
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  let uid = firebase.auth().currentUser
  let isAuth = to.matched.some(path => path.meta.auth)
  if(!uid && isAuth){
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next)=>{
  let uid = firebase.auth().currentUser
  let isRedirect = to.matched.some(path => path.meta.redirect)
  if(uid && isRedirect){
    next('/')
  } else {
    next()
  }
})

export default router
