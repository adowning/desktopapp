import Parse from 'parse'
import store, { MODULES } from '@/newstore'
import { router } from '@/router'
Parse.initialize(process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID, process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY)
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL
Parse.enableLocalDatastore()
global.Parse = Parse

// declare sub classes
export const BME280 = Parse.Object.extend('BME280')
export const DEVICE = Parse.Object.extend('Device')
export const TIMESHEET = Parse.Object.extend('Timesheet')
export const EMPLOYEE = Parse.User.extend()

export const handleParseError = error => {
  // eslint-disable-next-line no-console
  // eslint-disable-next-line no-console
  console.warn('Force logout.')
  console.info('Parse error:', error)
  switch (error.code) {
    case 209:
      Parse.User.logOut()
      store.dispatch(MODULES.User.actions.logout)
      break
    case 100:
      router.push({ path: '/error' })
      break
  }
}
