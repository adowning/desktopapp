/* eslint-disable  */
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

function timeout() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

// eslint-disable-next-line consistent-return
async function createAdmin(): Promise<Parse.User | undefined> {
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
  }
}

async function createAdminTimesheets(admin: Parse.User): Promise<void> {
  const timesheets = []
  const Timesheet = Parse.Object.extend('Timesheet')
  const query = new Parse.Query(Timesheet)
  // query.equalTo('employee', admin)
  const count = await query.find()

  if (count.length < 2) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 31; i++) {
      const now = new Date()
      now.setDate(now.getDate() - i)
      const stt = now.valueOf()
      const end = now
      end.setTime(end.getTime() + 6 * 60 * 60 * 1000)
      const ett = end.valueOf()
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
      const ts = new Timesheet()
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

async function wait(): Promise<void> {
  await timeout()
  const admin = await createAdmin()
  // eslint-disable-next-line no-return-await
  return await createAdminTimesheets(admin as Parse.User)
}
if (process.env.NODE_ENV === 'development') {
  wait()
}
