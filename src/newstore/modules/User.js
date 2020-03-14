import Parse from 'parse'
import { router } from '@/router'
import { setSessionId } from '@/api/onsipHelpers'

export const ACTIONS = {
  login: 'login',
  logout: 'logout',
}

export const GETTERS = {
  isAuthenticated: 'isAuthenticated',
  getUser: 'getUser'
}

export const MUTATIONS = {
  setAuthenticated: 'setAuthenticated',
  setUser: 'setUser',
}

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: {}
  },
  actions: {
    async [ACTIONS.login]({ commit }, { email, password }) {
      console.log(email, password)
      let user = await Parse.User.logIn(email, password)
      await setSessionId()

      commit(MUTATIONS.setAuthenticated, true)
      commit(MUTATIONS.setUser, user)

      router.push({ name: 'dashboard' })
      // Parse.User.logIn(email, password)
      //   .then(() => {
      //     commit(MUTATIONS.setAuthenticated, true);
      //     router.push({ name: 'dashboard' });
      //   })
      //   .catch(function() {
      //     commit(MUTATIONS.setAuthenticated, false);
      //   });
    },
    [ACTIONS.logout]({ commit }) {
      commit(MUTATIONS.setAuthenticated, false)
      router.push({ name: 'login' })
      // try to logout ...
      Parse.User.logOut()
        .then(() => {
          // nothing else
        })
        .catch(function() {
          // nothing else
        })
    },
  },
  getters: {
    [GETTERS.isAuthenticated]: state => () => {
      return state.authenticated
    },
    [GETTERS.getUser]: state => () => {
      return  state.user
    }
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated
    },
    setUser(state, user) {
      state.user = user
    },
  },
}
