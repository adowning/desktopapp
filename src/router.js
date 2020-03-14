import Vue from 'vue'
import VueRouter from 'vue-router'
import FourofFour from '@/views/FourOhFourView'
import Layout from '@/Layout'
import Parse from 'parse'
import Splash from '@/views/LoginView'
import Router from 'vue-router'
// import Head from 'vue-head'
// import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import { isNil } from 'lodash'
// import store from '@/store'
import store from '@/newstore'
import { MODULES } from '@/newstore'

Vue.use(Router)

export var View
;(function(View) {
  View['Dashboard'] = 'dashboard'
  View['FirstTimeSetup'] = 'first-time-setup'
  View['Login'] = 'login'
  View['List'] = 'list'
  View['Home'] = 'home'
  View['Employees'] = 'employees'
  View['CallsView'] = 'calls'
  View['AccountPanel'] = 'accountpanel'
  View['TimesheetManage'] = 'timesheetManage'
  View['Profile'] = 'profile'
  View['Settings'] = 'settings'
  View['Processes'] = 'processes'
  View['Player'] = 'player'
})(View || (View = {}))
export const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    // {
    //   path: '/home',
    //   name: View.Home,
    //   component: () => import(/* webpackChunkName: "dashboard" */ './views/Home.vue'),
    // },
    //  {
    //    path: '/first-time-setup',
    //    name: View.FirstTimeSetup,
    //    component: () =>
    //      import(/* webpackChunkName: "first-time-setup" */ './views/first-time-setup/first-time-setup.vue'),
    //  },
    {
      path: '/login',
      name: View.Login,
      component: () => import(/* webpackChunkName: "login" */ './views/LoginView.vue'),
    },
    {
      path: '/profile',
      name: View.Profile,
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
    {
      path: '/employees',
      name: View.Employees,
      component: () => import(/* webpackChunkName: "profile" */ './views/Employees.vue'),
    },
    {
      path: '/processes',
      name: View.Processes,
      component: () => import(/* webpackChunkName: "processes" */ './views/Processes.vue'),
    },
    {
      path: '/accountpanel',
      name: View.AccountPanel,
      component: () => import(/* webpackChunkName: "accountPanel" */ './views/AccountPanel.vue'),
    },
    {
      path: '/timesheets',
      name: View.TimesheetsView,
      component: () => import(/* webpackChunkName: "timesheetsView" */ './views/TimesheetsView.vue'),
    },
    {
      path: '/timesheetManage',
      name: View.TimesheetManage,
      component: () => import(/* webpackChunkName: "timesheetsView" */ './views/manage/TimesheetManage.vue'),
    },
    {
      path: '/calls',
      name: View.CallsView,
      component: () => import(/* webpackChunkName: "callsView" */ './views/CallsView.vue'),
    },
    {
      path: '/settings',
      name: View.Settings,
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
    {
      path: '/error',
      name: View.Error,
      component: () => import(/* webpackChunkName: "settings" */ './views/Error.vue'),
    },
    {
      path: '/dashboard',
      name: View.Dashboard,
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '*',
      name: View.Dashboard,
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
  ],
})

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 */
const routerMethods = ['push', 'replace']
routerMethods.forEach(method => {
  const originalCall = Router.prototype[method]
  Router.prototype[method] = function(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject)
    }
    return originalCall.call(this, location).catch(err => err)
  }
})

router.beforeEach((to, from, next) => {
  // verify if auth is required
  // if (to.matched.some(record => record.meta.authRequired)) {
  console.log(to.name)
  if (to.name !== 'login') {
    // route to target if authentication is done
    if (store.getters[MODULES.User.getters.isAuthenticated]()) {
      next()
      // otherwise route to login
    } else {
      next({
        name: 'login',
      })
    }
    // if no auth is required ...
  } else {
    // redirect to home if authentication is already done
    if (to.name === 'login' && store.getters[MODULES.User.getters.isAuthenticated]()) {
      next({
        name: 'home',
      })
      // otherwise move on to routes that do not require authentication
    } else {
      next()
    }
  }
  // const { requiresAuth = true, requiresAdmin = false } = to.meta
  // document.body.scrollTop = 0
  // document.documentElement.scrollTop = 0
  // console.log(to, requiresAuth, Parse.User.current())
  // if (requiresAuth && to.path != '/login') {
  //   if (Parse.User.current() == undefined ) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath },
  //     })
  //   } else if (requiresAdmin && store.state.accounts.user.tenantType !== 0) {
  //     console.log('scary')
  //     next('/forbidden')
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
})
