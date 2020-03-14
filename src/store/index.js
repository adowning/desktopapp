import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import Timesheet from './modules/Timesheet'
import Callrecord from './modules/Callrecord'
import Subscriptions from './modules/Subscriptions'
import authentication from './modules/authentication'
import timesheets from './modules/timesheets'
import profiles from './modules/profiles'
import callrecords from './modules/callrecords'
import devices from './modules/devices'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    darkMode: false,
    userList: []
  },
  getters: {
    loading: state => {
      return state.loading
    },
    darkMode: state => {
      return state.loading
    },

  },
  mutations: {
    saveLoading(state, loading) {
      state.loading = loading
    },
    saveDarkMode(state, mode) {
      state.darkMode = mode
    },
    saveUserList(state, list) {
      state.saveUserList = list
    },
  },
  actions: {
   async setUserlist(context, payload){
      const query = new Parse.Query(Parse.User);
      const userList =  await query.find();
      context.commit('saveUserList', userList)
    },
    setLoading(context, payload) {
      context.commit('saveLoading', payload)
    },
    setDarkMode(context, mode) {
      context.commit('saveDarkMode', mode)
    },
    reset(context) {
      context.state = {
        loading: false,
        darkMode: false
      }
    },
  },
  modules: {
    authentication,
    app,
    timesheets,
    profiles,
    callrecords,
    devices,
    tasks,
    // User,
    // Timesheet,
    // Callrecord,
    // Subscriptions,
  },
  // state: {
  //   loading: false,
  // },
  // actions,
  // mutations,
  // getters,
})
