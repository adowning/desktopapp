import { getTimesheetsByUser } from '@/api/parseApi'

export default {
  /**
   * Fetch timesheets of current loggedin user
   */
  getMonthTimesheets: async ({ rootState, commit }) => {
    console.log(Parse.User.current())
    const query = new Parse.Query(Parse.User)
    const usersList = await query.find()
    if (process.env.VUE_APP_NODE_ENV !== 'development') {
      const timesheets = await getUserTimesheets()
      commit('addTimesheets', timesheets)
    } else {
      usersList.forEach(user => {
        // this.generateFakeSheets()
        const timesheets = []
        for (var i = 0; i < 31; i++) {
          var now = new Date()
          now.setDate(now.getDate() - i)
          let stt = now.valueOf()
          var end = now
          end.setTime(end.getTime() + 6 * 60 * 60 * 1000)
          let ett = end.valueOf()
          var timeSheet = {
            startTime: now,
            status: 2,
            duration: 1,
            startTimestamp: stt,
            approved: true,
            endTime: end,
            endTimestamp: ett,
            employee: user,
            deviceId: 'debug',
          }
          timesheets.push(timeSheet)
        }
        commit('addTimesheets', timesheets)
      })
    }
  },

  /**
   * Create a timesheet for current loggedin user
   */
  createUserTimesheet: async ({ commit, rootState }, timesheet) => {
    const userTimesheetDb = new UserTimesheetsDB(rootState.authentication.user.id)

    commit('setTimesheetCreationPending', true)
    const createdTimesheet = await userTimesheetDb.create(timesheet)
    commit('addTimesheet', createdTimesheet)
    commit('setTimesheetCreationPending', false)
  },

  /**
   * Create a new timesheet for current loggedin user and reset timesheet name input
   */
  triggerAddTimesheetAction: ({ dispatch, state, commit }) => {
    if (state.timesheetNameToCreate === '') return

    const timesheet = { name: state.timesheetNameToCreate }
    commit('setTimesheetNameToCreate', '')
    dispatch('createUserTimesheet', timesheet)
  },

  /**
   * Delete a user timesheet from its id
   */
  deleteUserTimesheet: async ({ rootState, commit, getters }, timesheetId) => {
    if (getters.isTimesheetDeletionPending(timesheetId)) return

    const userTimesheetsDb = new UserTimesheetsDB(rootState.authentication.user.id)

    commit('addTimesheetDeletionPending', timesheetId)
    await userTimesheetsDb.delete(timesheetId)
    commit('removeTimesheetById', timesheetId)
    commit('removeTimesheetDeletionPending', timesheetId)
  },
}
