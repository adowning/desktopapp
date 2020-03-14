/* eslint-disable  */

import Parse from 'parse/node'
import SnipeHelper from '../helpers/SnipeHelper'

export const createUser = async () => {
  const user = new Parse.User()
  user.set('username', `test-${new Date().valueOf().toString()}`)
  user.set('password', 'test')
  user.set('firstName', 'test')
  user.set('lastName', 'test')
  await user.signUp()
  return user
}

export const destroyUser = async (user => {
  console.log(user.get('assetsId'))
  await SnipeHelper.sendToSnipe('delete', '/users', {
    id: user.get('assetsId'),
  })
  await user.destroy({ useMasterKey: true })
  console.log(user)
})

// const generateFromJson = function() {
//   const emps = require('../data/employees.json')
// }

// Parse.Cloud.define('updateUser', (request, response) => {
async function updateUser(
  request,
  response,
) {
  const Todo = Parse.Object.extend('User')
  const todo = new Todo()
  todo.set('author', request.user)
  todo.set('title', request.params.title)
  todo.set('finished', false)
  todo.save(null, {
    useMasterKey: true,
    success(result) {
      response.success(result)
    },
    error(error) {
      response.error(`Error while creating todo ${error.code} - ${error.description}`)
    },
  })
}

async function checkAgainstCurrentUsers(newList) {
  const userQuery = new Parse.Query('User')
  userQuery.limit(100000)
  const nextList = []

  const users = await userQuery.find()
  if (users.length == 0) {
    return newList
  }
}
  // nextList = newList.filter((user => {
  //   let good = true
  //   users.forEach(existingUser => {)
  //     if (existingUser.attributes.thirdPartyAuth[0].humanityId == user.id) {
  //       console.log('bad')
  //       good = false
  //     }
  //     if (good) {
  //       return user
  //     }
  //   })
  //   console.log('nl =', nextList.length)
  //   return nextList
  // }

  async function createParseObject (emp) {
    const User = Parse.Object.extend('User')
    const user = await new User()
    const homeAddress = {
      street: emp.addresss || 'Charleston Park',
      streetNumber: '3954',
      zipcode: emp.zip || '75701',
      city: emp.city || 'Tyler',
      state: 'TX',
      formattedAddress: emp.address || '3952 Charleston Park, Tyler TX 75701',
      geoPoint: {
        lat: 32.3188508,
        lng: -95.2466747,
      },
    }
    const phoneList = []
    if (emp.cell_phone !== undefined) {
      phoneList.push(emp.cell_phone)
    }
    const username = `${emp.firstname.substring(0, 1)}.${emp.lastname}`
    const thirdPartyAuth = []
    thirdPartyAuth.push({
      humanityId: emp.id,
    })
    user.set('firstName', emp.firstname)
    user.set('lastName', emp.lastname)
    user.set('username', username.toLowerCase())
    user.set('password', 'andrews1')
    user.set('addressList', homeAddress)
    user.set('phoneList', phoneList)
    user.set('thirdPartyAuth', thirdPartyAuth)
    user.set('email', `${username.toLowerCase()}@ashdevtools.com`)
    return user
  }

  const usernames = []

  // Parse.Cloud.define("generateUsers", async function (request, response) {
 async function generateUsers() {
    // const emps = require('../../data/employees.json')
    const emps = require('employees.json')
    const list = await checkAgainstCurrentUsers(emps)
    // eslint-disable-next-line no-restricted-syntax
    for (const emp of list) {
      let name = `${emp.firstname.substring(0, 1)}.${emp.lastname}`
      name = name.toLowerCase()
      if (!usernames.includes(name)) {
        usernames.push(name)
        try {
          const nemp = await createParseObject(emp)
          await nemp.save()
        } catch (e) {}
      } else {
        console.log('existed')
      }
    }
  }
