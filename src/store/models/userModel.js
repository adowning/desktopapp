// import Parse, { User } from 'parse'
// import { prop, model } from '../plugins/parse'

// @model('Activity')
// export default class Activity extends Parse.Object {
//   @prop() location
//   @prop() startTime
//   @prop() endTime
//   @prop() details
//   @prop() type
//   @prop() color
//   @prop() relatedItems
//   @prop() icon
//   @prop() geoPoint
//   @prop() involvedParties
//   @prop() profile
//   @prop() active
//   @prop() lastClockEvent
// }


export default class Employee extends Parse.User {
  constructor(attributes) {
    super(attributes);
  }

  doSomething() {

    return 5;
  }


}
Parse.Object.registerSubclass('_User', CustomUser);