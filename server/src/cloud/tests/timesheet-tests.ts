const moment = require("moment");
import axios from 'axios'
var cityhall = {
  results: [
    {
      address_components: [
        {
          long_name: "212",
          short_name: "212",
          types: ["street_number"]
        },
        {
          long_name: "North Bonner Avenue",
          short_name: "N Bonner Ave",
          types: ["route"]
        },
        {
          long_name: "Downtown",
          short_name: "Downtown",
          types: ["neighborhood", "political"]
        },
        {
          long_name: "Tyler",
          short_name: "Tyler",
          types: ["locality", "political"]
        },
        {
          long_name: "Smith County",
          short_name: "Smith County",
          types: ["administrative_area_level_2", "political"]
        },
        {
          long_name: "Texas",
          short_name: "TX",
          types: ["administrative_area_level_1", "political"]
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"]
        },
        {
          long_name: "75702",
          short_name: "75702",
          types: ["postal_code"]
        }
      ],
      formatted_address: "212 N Bonner Ave, Tyler, TX 75702, USA",
      geometry: {
        bounds: {
          northeast: {
            lat: 32.3523857,
            lng: -95.3059047
          },
          southwest: {
            lat: 32.3520271,
            lng: -95.30610830000001
          }
        },
        location: {
          lat: 32.35224780000001,
          lng: -95.30604389999999
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 32.3535553802915,
            lng: -95.3046575197085
          },
          southwest: {
            lat: 32.3508574197085,
            lng: -95.30735548029151
          }
        }
      },
      place_id: "ChIJP0zV9bPOSYYRSbxeAfMd-aA",
      types: ["premise"]
    }
  ],
  status: "OK"
};

// Parse.Cloud.define("generateFakeSheets", async function (request, response) {
  async function generateFakeSheets() {
  const mySchema = new Parse.Schema('Timesheet');
  await mySchema.purge();
  try {
    await axios.delete('http://35.184.15.252:9200/timesheets')
  } catch (e) {
    console.log(e)

  }
  try {
    await axios.put('http://35.184.15.252:9200/timesheets?pretty')
  } catch (e) {
    console.log(e)
  }
  const createTimesheet = function (day) {
    var clockIn = new moment();
    clockIn.subtract(day, "days");
    clockIn = clockIn.startOf("day").add(8, "hours");
    var r50 = Math.floor(Math.random() * Math.floor(50));
    var r3 = Math.floor(Math.random() * Math.floor(3));
    var r12 = Math.floor(Math.random() * Math.floor(8)) + 4;

    clockIn = clockIn.add(r50, "minutes");
    var ci = new moment(clockIn.add(r3, "hours"));
    var clockout = clockIn.add(r12, "hours");
    var co = new moment(clockout.add(r50, "minutes"));
    var duration = moment.duration(moment(co).diff(moment(ci)));
    var startLocation = {
      latitude: 32.3112106941694,
      longitude: -95.2633916507901
    };
    var endLocation = {
      latitude: 32.3112106941694,
      longitude: -95.2633916507901
    };
    return {
      startLocation: startLocation,
      approved: true,
      endLocation: endLocation,
      startTimestamp: ci.toDate().valueOf(),
      endTimestamp: co.toDate().valueOf(),
      duration: duration._data
    };
  };

  const create2ndShift = function (firstSheet) {
    const r70 = Math.floor(Math.random() * Math.floor(70));
    const r2 = Math.floor(Math.random() * Math.floor(2));
    var secondClockIn = new moment(firstSheet.startTimestamp);
    var cItwo = new moment(secondClockIn.add(r70, "minutes"));
    var secondClockout = cItwo.add(r2, "hours");
    var cOtwo = new moment(secondClockout.add(r70, "minutes"));
    var duration = moment.duration(moment(cOtwo).diff(moment(cItwo)));
    var outloc = {};
    if (fiftyFifty()) {
      outloc = {
        latitude: 32.3519851,
        longitude: -95.3049413
      };
    } else {
      outloc = {
        latitude: 32.3530034,
        longitude: -95.3059214
      };
    }

    var startLocation = {
      latitude: 32.3112106941694,
      longitude: -95.2633916507901
    };
    var endLocation = outloc;
    return {
      startLocation: startLocation,
      approved: true,
      endLocation: endLocation,
      startTimestamp: cItwo.toDate().valueOf(),
      endTimestamp: cOtwo.toDate().valueOf(),
      duration: duration._data
    };
  };

  var query = new Parse.Query("User");
  query.limit(500);
  query.equalTo('active', true)
  var emps = await query.find();
  const oneinfive = function () {
    var d = Math.random();
    if (d < 0.17) {
      return true;
    } else {
      return false;
    }
  };
  const fiftyFifty = function () {
    var d = Math.random();
    if (d < 0.5) {
      return true;
    } else {
      return false;
    }
  };

  // var Timesheet = new Parse.Object.Timesheet()
  var sheets = [];
  for (var e = 0; e < emps.length; e++) {
    const emp = emps[e];
    for (var day = 200; day > 0; day--) {

      var timesheet = createTimesheet(day);

      var pObject = new Parse.Object("Timesheet", timesheet);
      pObject.set("user", emp);
      sheets.push(pObject);
      if (oneinfive()) {
        timesheet = create2ndShift(timesheet);
        pObject = new Parse.Object("Timesheet", timesheet);
        pObject.set("user", emp);
        sheets.push(pObject);
      }
    }
  }
  try {
    await Parse.Object.saveAll(sheets);
  } catch (e) {
    console.log(e)
  }

  return sheets;
});

Parse.Cloud.define("lookupUserByPhone", async function (request, response) {
  const query = new Parse.Query("User");
  console.log(request.params);
  query.equalTo("cellPhone", request.params.cellPhone);
  return await query.first();
});

Parse.Cloud.define("createTimesheet", async function (request, response) {
  const user = await Parse.User.logIn("admin", "asdf");
  var Timesheet = Parse.Object.extend("Timesheet");
  let ts = new Timesheet({
    user: user,
    startTime: new Date()
  });
  return await ts.save();
});