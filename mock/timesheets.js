const Faker = require('faker')
const Fs = require('fs')
const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i)

const randomInt = max => Math.floor(Math.random() * max) + 1
const randomArray = (arr, n) => {
  let result = new Array(n)
  let len = arr.length
  let taken = new Array(len)

  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available')
  }

  while (n--) {
    let x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

const users = JSON.parse(Fs.readFileSync('./static/data/user.json', 'UTF-8'))
const uids = []
const sheets = []
users.forEach(user => {
  //   uids.push(item.uuid);
  for (var i = 0; i < 60; i++) {
    var start = moment()
      .subtract(i, 'days')
      .startOf('day')
    if (start.day == 7) {
      return
    }
    var startHourR = randomInt(3)
    var durationHourR = randomInt(4)
    var startMinsR = randomInt(59)
    var endMinsR = randomInt(59)

    const startHour = new start.add(7 + startHourR, 'hours')
    const startTime = startHour.add(startMinsR, 'minutes')

    const endHour = new start.add(11 + durationHourR, 'hours')
    const endTime = endHour.add(endMinsR, 'minutes')

    const diffM = endTime.diff(startTime, 'minutes')
    const diffH = endTime.diff(startTime, 'hours')

    if (i > 5) {
      approved = true
    }
    approved = false
    // const startTime = Faker.date.between(from:  to:),

    var rlat = (Math.random() * (31.0 - 33.0) + 0.01).toFixed(4)
    var rlng = (Math.random() * (94.0 - 96.0) + 0.01).toFixed(4)

    const evt1 = {
      createdAt: startTime.milliseconds(),
      user: user,
      error: false,
      type: 'clockIn',
      location: { lat: rlat, lng: rlng },
      note: [Faker.lorem.sentence],
      deviceId: Faker.random.uuid,
    }

    const evt2 = {
      createdAt: endTime.milliseconds(),
      user: user,
      error: false,
      type: 'clockOut',
      location: { lat: rlat, lng: rlng },
      note: [Faker.lorem.sentence],
      deviceId: Faker.random.uuid,
    }
    var mngr = users.filter(user => user.isManager == true)

    const evt3 = {
      createdAt: Faker.date.between(endTime.milliseconds() + 1000 * 60 * randomInt(1000)),
      user: mngr,
      error: false,
      type: 'managerNote',
      note: [Faker.lorem.sentence],
    }
    let timesheet = {
      user: user,
      startTime: startTime.utc().format(),
      startTimestamp: startTime.milliseconds(),
      endTime: endTime.utc().format(),
      endTimestamp: endTime.milliseconds(),
      diffM: diffM,
      diffH: diffH,
      notes: [Faker.lorem.sentence],
      approved: approved,
      status: 1,
      events: [evt, evt2, evt3],
    }
    sheets.push(timesheet)
  }

  // const timesheet = range(0, 10).map(() => {
  //   return {
  //     'user': item,
  //     'startTime': ,
  //     'users': randomArray(uids, Faker.random.number({ min: 1, max: 3 })),
  //     'created_by': Faker.random.arrayElement(uids),
  //     'created_at': Faker.date.recent(),

  //   };
  // }
})

// module.exports = () => {
//     return {
//       data: sheets
//     };
//   };

// });
module.exports = () => {
  return {
    data: sheets,
  }
}
