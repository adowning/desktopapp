/* global Parse */
import './hooks/init'
import './functions/timesheet-functions'
import './functions/presence-functions'
import PubNub from 'pubnub'

const pubnub = new PubNub({
  subscribeKey: 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d',
  secretKey: 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1',
  // uuid: 'system',
  ssl: true,
})

Parse.Cloud.define('hello', req => `Hi ${req.user ? req.user.getUsername() : 'Unknown'}`)

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

async function createAdmin() {
  const query = new Parse.Query(Parse.User)
  query.equalTo('username', 'admin') // find all the women
  const admin = await query.first()
  console.log(admin)
  if (admin == null) {
    const user = new Parse.User()
    user.set('username', 'admin')
    user.set('password', 'asdf')
    user.set('email', 'asdf@asdf.com')
    user.set('firstName', 'Ash')
    user.set('lastName', 'Downing')

    // other fields can be set just like with Parse.Object
    // user.set('phone', '415-392-0202')
    try {
      await user.signUp()
      await pubnub.createUser({
        id: user.id,
        name: 'admin',
      })
      return user
      // Hooray! Let them use the app now.
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      // alert(`Error: ${error.code} ${error.message}`)
    }
  } else {
    return admin
    console.log('admin exists')
  }
}

async function createAdminTimesheets(admin: Parse.User) {
  const timesheets = []
  const Timesheet = Parse.Object.extend('Timesheet')
  const query = new Parse.Query(Timesheet)
  // query.equalTo('employee', admin)
  var count = await query.find()

  if (count.length < 2) {
    for (var i = 0; i < 31; i++) {
      var now = new Date()
      now.setDate(now.getDate() - i)
      let stt = now.valueOf()
      var end = now
      end.setTime(end.getTime() + 6 * 60 * 60 * 1000)
      let ett = end.valueOf()
      // var values = {
      //   startTime: now,
      //   // status: 1,
      //   duration: 1,
      //   startTimestamp: stt,
      //   approved: true,
      //   endTime: end,
      //   endTimestamp: ett,
      //   user: admin,
      //   deviceId: 'debug',
      //   // className: 'Timesheet',
      // }
      let ts = new Timesheet()
      ts.set('startTime', now)
      ts.set('duration', 1)
      ts.set('startTimestamp', stt)
      ts.set('approved', true)
      ts.set('endTime', now)
      ts.set('endTimestamp', ett)
      ts.set('user', admin)
      ts.set('deviceId', 'debug')
      console.log(ts)
      ts.save()
      // timesheets.push(ts)
    }
    // Parse.Object.saveAll(timesheets)
  }
}

async function wait(fn: Promise<void> | null) {
  await timeout(3000)
  const admin = await createAdmin()
  return await createAdminTimesheets(admin)
}
if (process.env.NODE_ENV == 'development') {
  wait(null)
}
