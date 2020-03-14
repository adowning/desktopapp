import Vue from 'vue'
import moment from 'moment'
import { TIMESHEET, handleParseError } from '@/plugins/new-parse'

export default {
  strict: true,
  namespaced: true,
  state: () => ({
    loading: false,
    collection: [],
    selected: undefined,
    pagination: {
      itemsPerPage: 5,
      multiSort: false,
      mustSort: false,
      page: 1,
      totalItems: undefined,
    },
  }),
  getters: {
    getCollection: state => {
      return state.collection
    },
    getLoading: state => {
      return state.loading
    },
    getPagination: state => {
      return state.pagination
    },
  },
  mutations: {
    flush(state) {
      state.collection = []
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setCollection(state, data) {
      console.log('Data: ', data)
      state.collection = data
      Vue.set(state.pagination, 'totalItems', data.length)
    },
    setPagination(state, pagination) {
      state.pagination = pagination
    },
  },
  actions: {
    // query({ commit }, params) {
    //   // here we're going to query
    //   // so the first thing to do is
    //   // to clear the collection and
    //   // set loading to true
    //   commit('flush')
    //   commit('setLoading', true)
    //   console.log(params)

    //   return (
    //     query(params)
    //       .find()
    //       .catch(error => {
    //         handleParseError(error)
    //       })
    //       // .then(response => response.data)
    //       .then(data => {
    //         commit('setCollection', {
    //           subSet: data,
    //           totalItems: data.length,
    //         })
    //         commit('setLoading', false)
    //       })
    //   )
    // },

    async queryByWeek({ commit }, params) {
      // here we're going to query
      // so the first thing to do is
      // to clear the collection and

      // set loading to true
      const Timesheet = Parse.Object.extend('Timesheet')
      const query = new Parse.Query(Timesheet)

      commit('flush')
      commit('setLoading', true)
      var start = new moment(params.day)
      const from_date = start.startOf('week')
      console.log(from_date)

      const to_date = start.endOf('week')
      console.log(to_date)

      console.log({
        from_date: from_date.toString(),
        to_date: to_date.toString(),
      })
      // query.greaterThan('startTimestamp', from_date.valueOf())
      // query.lessThanOrEqualTo('endTimestamp', to_date.valueOf())
      query.descending('startTimestamp')

      const results = await query.find()
      console.log(results)
      let timesheets = []
      results.forEach(entity => {
        let timesheet = Object.assign({}, entity.attributes)
        timesheet.id = entity.id
        timesheets.push(timesheet)
      })

      commit('setCollection', timesheets)

      commit('setLoading', false)
      return timesheets
    },
  },
}

// export const ACTIONS = {
//   subscribeToTimesheets: 'subscribeToTimesheets',
//   saveTimesheets: 'saveTimesheets',
// }

// export const GETTERS = {
//   getTimesheets: 'getTimesheets',
// }

// export const MUTATIONS = {
//   setTimesheets: 'setTimesheets',
//   setLabel: 'setLabel',
//   pushTimesheet: 'pushTimesheet',
// }

// export default {
//   namespaced: true,
//   state: {
//     timesheets: [],
//   },
//   actions: {
//     async [ACTIONS.subscribeToTimesheets]({ commit }) {
//       // try to fetch all timesheets
//       const query = new Parse.Query(TIMESHEET)
//       let results
//       let subscription
//       results = await query.find().catch(e => {
//         handleParseError(this, e)
//         return
//       })
//       let timesheets = []
//       results.forEach(entity => {
//         let timesheet = Object.assign({}, entity.attributes)
//         timesheet.id = entity.id
//         timesheets.push(timesheet)
//       })
//       commit(MUTATIONS.setTimesheets, timesheets)
//       subscription = await query.subscribe().catch(e => {
//         handleParseError(this, e)
//         return
//       })
//       subscription.on('create', entity => {
//         let timesheet = Object.assign({}, entity.attributes)
//         timesheet.id = entity.id
//         commit(MUTATIONS.pushTimesheet, timesheet)
//       })

//       // try{
//       // query
//       //   .find().catch(e =>{
//       //     handleParseError(this, e);
//       //     return
//       //   })
//       //   .then(results => {
//       //     let timesheets = [];
//       //     results.forEach(entity => {
//       //       let timesheet = Object.assign({}, entity.attributes);
//       //       timesheet.id = entity.id;
//       //       timesheets.push(timesheet);
//       //     });
//       //     commit(MUTATIONS.setTimesheets, timesheets);
//       //   })
//       //   .then(() => {
//       //     // subscribe to new values
//       //     query.subscribe().on('create', entity => {
//       //       let timesheet = Object.assign({}, entity.attributes);
//       //       timesheet.id = entity.id;
//       //       commit(MUTATIONS.pushTimesheet, timesheet);
//       //     });
//       //   }),
//       //   error => {
//       //     console.log(error)
//       //     handleParseError(this, error);
//       //   };
//       // }catch(e){
//       //   console.log(error)
//       //   handleParseError(this, error);
//       // }
//     },
//     [ACTIONS.saveTimesheets]({ state }) {
//       // process all timesheets
//       state.timesheets.forEach(timesheet => {
//         // process each entity
//         const query = new Parse.Query(TIMESHEET)
//         query.get(timesheet.id).then(entity => {
//           // update entity if label changed
//           if (entity.get('label') != timesheet.label) {
//             entity.set('label', timesheet.label)
//             entity.save().then(
//               () => {
//                 // success
//               },
//               error => {
//                 // eslint-disable-next-line no-console
//                 console.error('Updating failed', error)
//               },
//             )
//           }
//         })
//       })
//     },
//   },
//   getters: {
//     [GETTERS.getTimesheets]: state => {
//       return state.timesheets
//     },
//   },
//   mutations: {
//     [MUTATIONS.setTimesheets](state, timesheets) {
//       state.timesheets = timesheets
//     },
//     [MUTATIONS.setLabel](state, { index, label }) {
//       state.timesheets[index].label = label
//     },
//     [MUTATIONS.pushTimesheet](state, timesheet) {
//       state.timesheets.push(timesheet)
//     },
//   },
// }
// const http = axios.create({
//   baseURL: 'https://reqres.in/api/',
// })

// function query(params = {}) {
//   // return http.get(`${resource}?${new URLSearchParams(params).toString()}`)
//   const query = new Parse.Query(TIMESHEET)
//   if (params.length > 0) {
//     for (let [key, value] of Object.entries(object1)) {
//       console.log(`${key}: ${value}`)
//       query.equalTo(key, value)
//     }
//   }
//   // const results = await query.find();

//   return query
// }
