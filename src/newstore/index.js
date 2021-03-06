import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import AppPreferences, * as AppPreferencesMethods from './modules/AppPreferences'
import BME280, * as BME280Methods from './modules/BME280'
import Timesheet, * as TimesheetMethods from './modules/Timesheet'
import Device, * as DeviceMethods from './modules/Device'
import User, * as UserMethods from './modules/User'
import Employee, * as EmployeeMethods from './modules/Employee'

Vue.use(Vuex)

export const _APP_PREFERENCES = 'AppPreferences'
export const _BME280 = 'BME280'
export const _DEVICE = 'Device'
export const _USER = 'User'
export const _TIMESHEET = 'Timesheet'
export const _EMPLOYEE = 'Employee'

export const MODULES = {
  [_APP_PREFERENCES]: {
    getters: {
      getPanels: _APP_PREFERENCES + '/' + AppPreferencesMethods.GETTERS.getPanels,
    },
    mutations: {
      setPanels: _APP_PREFERENCES + '/' + AppPreferencesMethods.MUTATIONS.setPanels,
    },
  },
  [_BME280]: {
    actions: {
      subscribeToValues: _BME280 + '/' + BME280Methods.ACTIONS.subscribeToValues,
      loadSeries: _BME280 + '/' + BME280Methods.ACTIONS.loadSeries,
    },
    getters: {
      getValue: _BME280 + '/' + BME280Methods.GETTERS.getValue,
      getSeries: _BME280 + '/' + BME280Methods.GETTERS.getSeries,
    },
  },
  [_DEVICE]: {
    actions: {
      subscribeToDevices: _DEVICE + '/' + DeviceMethods.ACTIONS.subscribeToDevices,
      saveDevices: _DEVICE + '/' + DeviceMethods.ACTIONS.saveDevices,
    },
    getters: {
      getDevices: _DEVICE + '/' + DeviceMethods.GETTERS.getDevices,
    },
    mutations: {
      setLabel: _DEVICE + '/' + DeviceMethods.MUTATIONS.setLabel,
    },
  },
  [_TIMESHEET]: {
    actions: {
      // subscribeToTimesheets: _TIMESHEET + '/' + TimesheetMethods.ACTIONS.subscribeToTimesheets,
      query: _TIMESHEET + '/' + TimesheetMethods.query,

      // saveTimesheets: _TIMESHEET + '/' + TimesheetMethods.ACTIONS.saveTimesheets,
    },
    getters: {
      // getTimesheets: _TIMESHEET + '/' + TimesheetMethods.GETTERS.getTimesheets,
    },
    mutations: {
      // setLabel: _TIMESHEET + '/' + TimesheetMethods.MUTATIONS.setLabel,
    },
  },
  [_EMPLOYEE]: {
    actions: {
      subscribeToEmployees: _EMPLOYEE + '/' + EmployeeMethods.ACTIONS.subscribeToEmployees,
      saveEmployees: _EMPLOYEE + '/' + EmployeeMethods.ACTIONS.saveEmployees,
    },
    getters: {
      getEmployees: _EMPLOYEE + '/' + EmployeeMethods.GETTERS.getEmployees,
    },
    mutations: {
      setLabel: _EMPLOYEE + '/' + EmployeeMethods.MUTATIONS.setLabel,
    },
  },
  [_USER]: {
    actions: {
      login: _USER + '/' + UserMethods.ACTIONS.login,
      logout: _USER + '/' + UserMethods.ACTIONS.logout,
    },
    getters: {
      isAuthenticated: _USER + '/' + UserMethods.GETTERS.isAuthenticated,
    },
  },
}

const STORE_KEY = 'smart-sensor'

const vuexCookie = new VuexPersistence({
  key: STORE_KEY,
  // eslint-disable-next-line no-unused-vars
  restoreState: (key, storage) => Cookies.getJSON(key),
  // eslint-disable-next-line no-unused-vars
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 7, // valid for 7 days
    }),
  modules: [_USER],
})

const vuexSession = new VuexPersistence({
  key: STORE_KEY,
  storage: window.sessionStorage,
  modules: [_BME280, _DEVICE],
})

const vuexLocal = new VuexPersistence({
  key: STORE_KEY,
  storage: window.localStorage,
  modules: [_APP_PREFERENCES],
})

const store = new Vuex.Store({
  // eslint-disable-next-line no-undef
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  modules: {
    AppPreferences,
    BME280,
    Timesheet,
    Employee,
    Device,
    User,
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin, vuexLocal.plugin],
})

export default store
