import Parse from 'parse/node'
import SnipeHelper from '../helpers/SnipeHelper'

export const createUser = async (): Promise<Parse.User> => {
  const user = new Parse.User()
  user.set('username', `test-${new Date().valueOf().toString()}`)
  user.set('password', 'test')
  user.set('firstName', 'test')
  user.set('lastName', 'test')
  await user.signUp()
  return user
}

export const destroyUser = async (user: Parse.User): Promise<void> => {
  console.log(user.get('assetsId'))
  await SnipeHelper.sendToSnipe('delete', '/users', {
    id: user.get('assetsId'),
  })
  await user.destroy({ useMasterKey: true })
  console.log(user)
}
const generateFromJson = function() {
  var emps = require('../data/employees.json')
}

// Parse.Cloud.define('updateUser', (request, response) => {
 async function updateUser(request, response){

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
      response.error('Error while creating todo ' + error.code + ' - ' + error.description)
    },
  })
})

const checkAgainstCurrentUsers = async function(newList) {
  var userQuery = new Parse.Query('User')
  userQuery.limit(100000)
  var nextList = []

  var users = await userQuery.find()
  if (users.length == 0) {
    return newList
  }
  nextList = newList.filter(user => {
    var good = true
    for (var existingUser of users) {
      if (existingUser.attributes.thirdPartyAuth[0].humanityId == user.id) {
        console.log('bad')
        good = false
      }
    }
    if (good) {
      return user
    }
  })
  console.log('nl =', nextList.length)
  return nextList
}

const createParseObject = async function(emp) {
  const User = Parse.Object.extend('User')
  const user = await new User()
  var homeAddress = {
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
  var phoneList = []
  if (emp.cell_phone != undefined) {
    phoneList.push(emp.cell_phone)
  }
  var username = emp.firstname.substring(0, 1) + '.' + emp.lastname
  var thirdPartyAuth = []
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
  user.set('email', username.toLowerCase() + '@ashdevtools.com')
  return user
}

var usernames = []

// Parse.Cloud.define("generateUsers", async function (request, response) {
export async function generateUsers() {
  var emps = require('../../data/employees.json')
  var list = await checkAgainstCurrentUsers(emps)
  for (var emp of list) {
    var name = emp.firstname.substring(0, 1) + '.' + emp.lastname
    name = name.toLowerCase()
    if (!usernames.includes(name)) {
      usernames.push(name)
      try {
        var nemp = await createParseObject(emp)
        await nemp.save()
      } catch (e) {}
    } else {
      console.log('existed')
    }
  }
}
