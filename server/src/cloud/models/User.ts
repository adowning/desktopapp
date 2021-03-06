export const User = {
  className: '_User',
  fields: {
    objectId: { type: 'String' },
    createdAt: {
      type: 'Date',
    },
    updatedAt: {
      type: 'Date',
    },
    ACL: { type: 'ACL' },
    email: { type: 'String', required: true },
    active: { type: 'Boolean', defaultValue: true },
    authData: { type: 'Object' },
    emailVerified: { type: 'Boolean' },
    password: { type: 'String' },
    assetsId: { type: 'Number' },
    username: { type: 'String' },
    status: { type: 'Number', default: 1 },
    inCompliance: { type: 'Boolean', default: true },
    permissions: {
      type: 'Object',
      defaultValue: {
        '/actions': ['GET', 'POST', 'DELETE'],
        '/actions/:id': ['PUT'],
        '/app_roles': ['POST', 'DELETE', 'GET'],
        '/app_roles/:id': ['PUT'],
        '/applications': ['GET', 'POST', 'DELETE'],
        '/applications/:id': ['PUT'],
        '/certs': ['GET', 'POST', 'DELETE'],
        '/certs/:id': ['PUT'],
        '/codec': ['GET', 'POST', 'DELETE'],
        '/codec/:id': ['PUT'],
        '/current_alerts': ['GET', 'DELETE'],
        '/data_points': ['GET', 'POST', 'DELETE'],
        '/data_points/:id': ['PUT'],
        '/data_streams': ['GET', 'POST', 'DELETE'],
        '/data_streams/:id': ['PUT'],
        '/device_capability_data': ['GET'],
        '/device_publish': ['POST'],
        '/devices': ['GET', 'POST', 'DELETE'],
        '/devices/:id': ['PUT'],
        '/devices_export': ['GET'],
        '/devices_import': ['POST'],

        '/employee_capability_data': ['GET'],
        '/employee_publish': ['POST'],
        '/employees': ['GET', 'POST', 'DELETE'],
        '/employees/:id': ['PUT'],
        '/employees_export': ['GET'],
        '/employees_import': ['POST'],

        '/groups': ['GET', 'POST', 'DELETE'],
        '/groups/:id': ['PUT'],
        '/history_alerts': ['GET', 'DELETE'],
        '/login_logs': ['GET'],
        '/messages': ['GET', 'DELETE'],
        '/products': ['GET', 'POST', 'DELETE'],
        '/products/:id': ['PUT'],
        '/rules': ['GET', 'POST', 'DELETE', 'GET', 'POST', 'DELETE'],
        '/rules/:id': ['PUT', 'PUT'],
        '/run_code': ['POST'],
        '/timer_publish': ['GET', 'POST', 'DELETE'],
      },
    },

    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    avatar: { type: 'File' },
    externalApis: {
      type: 'Array',
    },
    default: [{ snipeIt: 'auto-gen' }],

    lastClockTimestamp: { type: 'Number', defaultValue: new Date().valueOf() },
    // lastClockTime: { type: 'Date', defaultValue: new Date() },
    isClocked: { type: 'Boolean', defaultValue: false },
    // lastClockEvent: new Date().valueOf(),
    lastLocationTimestamp: {
      type: 'Number',
      defaultValue: new Date().valueOf(),
    },
    // deskPhone: { type: 'String', defaultValue: '19035663081' },
    phoneList: {
      type: 'Object',
      defaultValue: { deskPhone: '19035663081', cellPhone: '19035663081' },
    },
    // officePhoneInfo: { type: 'Object' },
    lastLocation: {
      type: 'GeoPoint',
      defaultValue: {
        __type: 'GeoPoint',
        latitude: 32.31121,
        longitude: -95.263391,
      },
    },
  },
  indexes: { objectId: { objectId: 1 } },
  classLevelPermissions: {
    find: { '*': true },
    count: {},
    get: { '*': true },
    update: { requiresAuthentication: true },
    create: { '*': true },
    delete: { requiresAuthentication: true },
    addField: {},
    protectedFields: {
      '*': [
        'email',
        'authData',
        'emailVerified',
        'password',
        'username',
        'lastName',
        'firstName',
      ],
    },
  },
}

// menus: {
//   type: 'Object',
//   defaultValue: [
//     {
//       children: [
//         {
//           children: [
//             {
//               children: [
//                 {
//                   code: 'devices-view',
//                   icon: null,
//                   id: 103,
//                   order: 1,
//                   tabs: 0,
//                   url: '/devices',
//                 },
//                 {
//                   code: 'devices-create',
//                   icon: null,
//                   id: 104,
//                   order: 2,
//                   tabs: 0,
//                   url: '/devices',
//                 },
//                 {
//                   code: 'devices-edit',
//                   icon: null,
//                   id: 105,
//                   order: 3,
//                   tabs: 0,
//                   url: '/devices/:id',
//                 },
//                 {
//                   code: 'devices-delete',
//                   icon: null,
//                   id: 106,
//                   order: 4,
//                   tabs: 0,
//                   url: '/devices',
//                 },
//                 {
//                   code: 'devices_export-view',
//                   icon: null,
//                   id: 107,
//                   order: 5,
//                   tabs: 0,
//                   url: '/devices_export',
//                 },
//                 {
//                   code: 'device_publish-create',
//                   icon: null,
//                   id: 102,
//                   order: 6,
//                   tabs: 0,
//                   url: '/device_publish',
//                 },
//                 {
//                   code: 'devices_import-create',
//                   icon: null,
//                   id: 108,
//                   order: 6,
//                   tabs: 0,
//                   url: '/devices_import',
//                 },
//                 {
//                   code: 'devices_capability_data-view',
//                   icon: null,
//                   id: 81,
//                   order: 12,
//                   tabs: 0,
//                   url: '/device_capability_data',
//                 },
//               ],
//               code: 'devices-devices',
//               icon: null,
//               id: 77,
//               order: 1,
//               tabs: 0,
//               url: '/devices/devices',
//             },
//             {
//               code: 'gateways',
//               icon: null,
//               id: 78,
//               order: 2,
//               tabs: 0,
//               url: '/devices/gateways',
//             },
//             {
//               children: [
//                 {
//                   code: 'groups-view',
//                   icon: null,
//                   id: 109,
//                   order: 1,
//                   tabs: 0,
//                   url: '/groups',
//                 },
//                 {
//                   code: 'groups-create',
//                   icon: null,
//                   id: 110,
//                   order: 2,
//                   tabs: 0,
//                   url: '/groups',
//                 },
//                 {
//                   code: 'groups-edit',
//                   icon: null,
//                   id: 111,
//                   order: 3,
//                   tabs: 0,
//                   url: '/groups/:id',
//                 },
//                 {
//                   code: 'groups-delete',
//                   icon: null,
//                   id: 112,
//                   order: 4,
//                   tabs: 0,
//                   url: '/groups',
//                 },
//               ],
//               code: 'devices-groups',
//               icon: null,
//               id: 79,
//               order: 3,
//               tabs: 0,
//               url: '/devices/groups',
//             },
//           ],
//           code: 'devices',
//           icon: null,
//           id: 26,
//           order: 1,
//           tabs: 1,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'products-view',
//               icon: null,
//               id: 36,
//               order: 1,
//               tabs: 0,
//               url: '/products',
//             },
//             {
//               code: 'products-create',
//               icon: null,
//               id: 37,
//               order: 2,
//               tabs: 0,
//               url: '/products',
//             },
//             {
//               code: 'products-edit',
//               icon: null,
//               id: 38,
//               order: 3,
//               tabs: 0,
//               url: '/products/:id',
//             },
//             {
//               code: 'products-delete',
//               icon: null,
//               id: 39,
//               order: 4,
//               tabs: 0,
//               url: '/products',
//             },
//             {
//               children: [
//                 {
//                   code: 'data_points-view',
//                   icon: null,
//                   id: 82,
//                   order: 1,
//                   tabs: 0,
//                   url: '/data_points',
//                 },
//                 {
//                   code: 'data_points-create',
//                   icon: null,
//                   id: 83,
//                   order: 2,
//                   tabs: 0,
//                   url: '/data_points',
//                 },
//                 {
//                   code: 'data_points-edit',
//                   icon: null,
//                   id: 84,
//                   order: 3,
//                   tabs: 0,
//                   url: '/data_points/:id',
//                 },
//                 {
//                   code: 'data_points-delete',
//                   icon: null,
//                   id: 85,
//                   order: 4,
//                   tabs: 0,
//                   url: '/data_points',
//                 },
//               ],
//               code: 'data_points',
//               icon: null,
//               id: 40,
//               order: 5,
//               tabs: 0,
//               url: null,
//             },
//             {
//               children: [
//                 {
//                   code: 'data_streams-view',
//                   icon: null,
//                   id: 86,
//                   order: 1,
//                   tabs: 0,
//                   url: '/data_streams',
//                 },
//                 {
//                   code: 'data_streams-create',
//                   icon: null,
//                   id: 87,
//                   order: 2,
//                   tabs: 0,
//                   url: '/data_streams',
//                 },
//                 {
//                   code: 'data_streams-edit',
//                   icon: null,
//                   id: 88,
//                   order: 3,
//                   tabs: 0,
//                   url: '/data_streams/:id',
//                 },
//                 {
//                   code: 'data_streams-delete',
//                   icon: null,
//                   id: 89,
//                   order: 4,
//                   tabs: 0,
//                   url: '/data_streams',
//                 },
//               ],
//               code: 'data_streams',
//               icon: null,
//               id: 41,
//               order: 6,
//               tabs: 0,
//               url: null,
//             },
//             {
//               children: [
//                 {
//                   code: 'run_code',
//                   icon: null,
//                   id: 90,
//                   order: 1,
//                   tabs: 0,
//                   url: '/run_code',
//                 },
//                 {
//                   code: 'codec-view',
//                   icon: null,
//                   id: 91,
//                   order: 2,
//                   tabs: 0,
//                   url: '/codec',
//                 },
//                 {
//                   code: 'codec-create',
//                   icon: null,
//                   id: 92,
//                   order: 3,
//                   tabs: 0,
//                   url: '/codec',
//                 },
//                 {
//                   code: 'codec-edit',
//                   icon: null,
//                   id: 93,
//                   order: 4,
//                   tabs: 0,
//                   url: '/codec/:id',
//                 },
//                 {
//                   code: 'codec-delete',
//                   icon: null,
//                   id: 94,
//                   order: 5,
//                   tabs: 0,
//                   url: '/codec',
//                 },
//               ],
//               code: 'codec',
//               icon: null,
//               id: 42,
//               order: 9,
//               tabs: 0,
//               url: null,
//             },
//           ],
//           code: 'products',
//           icon: null,
//           id: 10,
//           order: 2,
//           tabs: 0,
//           url: '/products',
//         },
//         {
//           children: [
//             {
//               children: [
//                 {
//                   code: 'certs-view',
//                   icon: null,
//                   id: 113,
//                   order: 1,
//                   tabs: 0,
//                   url: '/certs',
//                 },
//                 {
//                   code: 'certs-create',
//                   icon: null,
//                   id: 114,
//                   order: 2,
//                   tabs: 0,
//                   url: '/certs',
//                 },
//                 {
//                   code: 'certs-edit',
//                   icon: null,
//                   id: 115,
//                   order: 3,
//                   tabs: 0,
//                   url: '/certs/:id',
//                 },
//                 {
//                   code: 'certs-delete',
//                   icon: null,
//                   id: 116,
//                   order: 4,
//                   tabs: 0,
//                   url: '/certs',
//                 },
//               ],
//               code: 'security-certs',
//               icon: null,
//               id: 80,
//               order: 1,
//               tabs: 0,
//               url: '/security/certs',
//             },
//           ],
//           code: 'security',
//           icon: null,
//           id: 27,
//           order: 3,
//           tabs: 1,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'timer_publish-view',
//               icon: null,
//               id: 62,
//               order: 1,
//               tabs: 0,
//               url: '/timer_publish',
//             },
//             {
//               code: 'timer_publish-create',
//               icon: null,
//               id: 63,
//               order: 2,
//               tabs: 0,
//               url: '/timer_publish',
//             },
//             {
//               code: 'timer_publish-delete',
//               icon: null,
//               id: 64,
//               order: 3,
//               tabs: 0,
//               url: '/timer_publish',
//             },
//           ],
//           code: 'timer_publish',
//           icon: null,
//           id: 22,
//           order: 4,
//           tabs: 0,
//           url: '/timer_publish',
//         },
//       ],
//       code: 'device_manage',
//       icon: 'memory',
//       id: 7,
//       order: 1,
//       tabs: 0,
//       url: null,
//     },
//     {
//       children: [
//         {
//           children: [
//             {
//               code: 'business_rules-view',
//               icon: null,
//               id: 65,
//               order: 1,
//               tabs: 0,
//               url: '/rules',
//             },
//             {
//               code: 'business_rules-create',
//               icon: null,
//               id: 66,
//               order: 2,
//               tabs: 0,
//               url: '/rules',
//             },
//             {
//               code: 'business_rules-edit',
//               icon: null,
//               id: 67,
//               order: 3,
//               tabs: 0,
//               url: '/rules/:id',
//             },
//             {
//               code: 'business_rules-delete',
//               icon: null,
//               id: 68,
//               order: 4,
//               tabs: 0,
//               url: '/rules',
//             },
//           ],
//           code: 'business_rules',
//           icon: null,
//           id: 23,
//           order: 1,
//           tabs: 0,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'scope_rules-view',
//               icon: null,
//               id: 69,
//               order: 1,
//               tabs: 0,
//               url: '/rules',
//             },
//             {
//               code: 'scope_rules-create',
//               icon: null,
//               id: 70,
//               order: 2,
//               tabs: 0,
//               url: '/rules',
//             },
//             {
//               code: 'scope_rules-edit',
//               icon: null,
//               id: 71,
//               order: 3,
//               tabs: 0,
//               url: '/rules/:id',
//             },
//             {
//               code: 'scope_rules-delete',
//               icon: null,
//               id: 72,
//               order: 4,
//               tabs: 0,
//               url: '/rules',
//             },
//           ],
//           code: 'scope_rules',
//           icon: null,
//           id: 24,
//           order: 2,
//           tabs: 0,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'actions-view',
//               icon: null,
//               id: 73,
//               order: 1,
//               tabs: 0,
//               url: '/actions',
//             },
//             {
//               code: 'actions-create',
//               icon: null,
//               id: 74,
//               order: 2,
//               tabs: 0,
//               url: '/actions',
//             },
//             {
//               code: 'actions-edit',
//               icon: null,
//               id: 75,
//               order: 3,
//               tabs: 0,
//               url: '/actions/:id',
//             },
//             {
//               code: 'actions-delete',
//               icon: null,
//               id: 76,
//               order: 4,
//               tabs: 0,
//               url: '/actions',
//             },
//           ],
//           code: 'actions',
//           icon: null,
//           id: 25,
//           order: 3,
//           tabs: 0,
//           url: null,
//         },
//       ],
//       code: 'rule_engine',
//       icon: 'filter_list',
//       id: 6,
//       order: 4,
//       tabs: 0,
//       url: null,
//     },
//     {
//       children: [
//         {
//           children: [
//             {
//               code: 'current_alerts-view',
//               icon: null,
//               id: 58,
//               order: 1,
//               tabs: 0,
//               url: '/current_alerts',
//             },
//             {
//               code: 'current_alerts-delete',
//               icon: null,
//               id: 59,
//               order: 2,
//               tabs: 0,
//               url: '/current_alerts',
//             },
//           ],
//           code: 'current_alerts',
//           icon: null,
//           id: 20,
//           order: 1,
//           tabs: 0,
//           url: '/current_alerts',
//         },
//         {
//           children: [
//             {
//               code: 'history_alerts-view',
//               icon: null,
//               id: 60,
//               order: 1,
//               tabs: 0,
//               url: '/history_alerts',
//             },
//             {
//               code: 'history_alerts-delete',
//               icon: null,
//               id: 61,
//               order: 2,
//               tabs: 0,
//               url: '/history_alerts',
//             },
//           ],
//           code: 'history_alerts',
//           icon: null,
//           id: 21,
//           order: 2,
//           tabs: 0,
//           url: '/history_alerts',
//         },
//       ],
//       code: 'alert_manage',
//       icon: 'error',
//       id: 5,
//       order: 5,
//       tabs: 0,
//       url: null,
//     },
//     {
//       children: [
//         {
//           code: 'mqtt_client',
//           icon: null,
//           id: 16,
//           order: 1,
//           tabs: 0,
//           url: null,
//         },
//         {
//           code: 'coap_client',
//           icon: null,
//           id: 17,
//           order: 2,
//           tabs: 0,
//           url: null,
//         },
//       ],
//       code: 'test_center',
//       icon: 'extension',
//       id: 3,
//       order: 6,
//       tabs: 0,
//       url: null,
//     },
//     {
//       children: [
//         {
//           children: [
//             {
//               code: 'applications-view',
//               icon: null,
//               id: 28,
//               order: 1,
//               tabs: 0,
//               url: '/applications',
//             },
//             {
//               code: 'applications-create',
//               icon: null,
//               id: 29,
//               order: 2,
//               tabs: 0,
//               url: '/applications',
//             },
//             {
//               code: 'applications-edit',
//               icon: null,
//               id: 30,
//               order: 3,
//               tabs: 0,
//               url: '/applications/:id',
//             },
//             {
//               code: 'applications-delete',
//               icon: null,
//               id: 31,
//               order: 4,
//               tabs: 0,
//               url: '/applications',
//             },
//           ],
//           code: 'applications',
//           icon: null,
//           id: 8,
//           order: 1,
//           tabs: 0,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'app_roles-view',
//               icon: null,
//               id: 35,
//               order: 1,
//               tabs: 0,
//               url: '/app_roles',
//             },
//             {
//               code: 'app_roles-create',
//               icon: null,
//               id: 32,
//               order: 2,
//               tabs: 0,
//               url: '/app_roles',
//             },
//             {
//               code: 'app_roles-edit',
//               icon: null,
//               id: 34,
//               order: 3,
//               tabs: 0,
//               url: '/app_roles/:id',
//             },
//             {
//               code: 'app_roles-delete',
//               icon: null,
//               id: 33,
//               order: 4,
//               tabs: 0,
//               url: '/app_roles',
//             },
//           ],
//           code: 'app_roles',
//           icon: null,
//           id: 9,
//           order: 2,
//           tabs: 0,
//           url: null,
//         },
//       ],
//       code: 'application_manage',
//       icon: 'apps',
//       id: 1,
//       order: 7,
//       tabs: 0,
//       url: null,
//     },
//     {
//       children: [
//         {
//           children: [
//             {
//               children: [
//                 {
//                   code: 'users-view',
//                   icon: null,
//                   id: 98,
//                   order: 1,
//                   tabs: 0,
//                   url: '/users',
//                 },
//                 {
//                   code: 'users-create',
//                   icon: null,
//                   id: 95,
//                   order: 2,
//                   tabs: 0,
//                   url: '/users',
//                 },
//                 {
//                   code: 'users-edit',
//                   icon: null,
//                   id: 97,
//                   order: 3,
//                   tabs: 0,
//                   url: '/users/:id',
//                 },
//                 {
//                   code: 'users-delete',
//                   icon: null,
//                   id: 96,
//                   order: 4,
//                   tabs: 0,
//                   url: '/users',
//                 },
//               ],
//               code: 'users-users',
//               icon: null,
//               id: 43,
//               order: 1,
//               tabs: 0,
//               url: '/users/users',
//             },
//             {
//               children: [
//                 {
//                   code: 'invitations-create',
//                   icon: null,
//                   id: 99,
//                   order: 1,
//                   tabs: 0,
//                   url: '/invitations',
//                 },
//                 {
//                   code: 'invitations-view',
//                   icon: null,
//                   id: 101,
//                   order: 2,
//                   tabs: 0,
//                   url: '/invitations',
//                 },
//                 {
//                   code: 'invitations-delete',
//                   icon: null,
//                   id: 100,
//                   order: 3,
//                   tabs: 0,
//                   url: '/invitations',
//                 },
//               ],
//               code: 'users-invitations',
//               icon: null,
//               id: 44,
//               order: 2,
//               tabs: 0,
//               url: '/users/invitations',
//             },
//           ],
//           code: 'users',
//           icon: null,
//           id: 11,
//           order: 1,
//           tabs: 1,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'roles-view',
//               icon: null,
//               id: 48,
//               order: 1,
//               tabs: 0,
//               url: '/roles',
//             },
//             {
//               code: 'roles-create',
//               icon: null,
//               id: 45,
//               order: 2,
//               tabs: 0,
//               url: '/roles',
//             },
//             {
//               code: 'roles-edit',
//               icon: null,
//               id: 47,
//               order: 3,
//               tabs: 0,
//               url: '/roles/:id',
//             },
//             {
//               code: 'roles-delete',
//               icon: null,
//               id: 46,
//               order: 4,
//               tabs: 0,
//               url: '/roles',
//             },
//           ],
//           code: 'roles',
//           icon: null,
//           id: 12,
//           order: 2,
//           tabs: 0,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'messages-view',
//               icon: null,
//               id: 49,
//               order: 1,
//               tabs: 0,
//               url: '/messages',
//             },
//             {
//               code: 'messages-delete',
//               icon: null,
//               id: 50,
//               order: 2,
//               tabs: 0,
//               url: '/messages',
//             },
//           ],
//           code: 'messages',
//           icon: null,
//           id: 13,
//           order: 3,
//           tabs: 0,
//           url: null,
//         },
//         {
//           children: [
//             {
//               code: 'login_logs-view',
//               icon: null,
//               id: 51,
//               order: 1,
//               tabs: 0,
//               url: '/login_logs',
//             },
//           ],
//           code: 'login_logs',
//           icon: null,
//           id: 14,
//           order: 4,
//           tabs: 0,
//           url: null,
//         },
//       ],
//       code: 'account_manage',
//       icon: 'supervisor_account',
//       id: 2,
//       order: 10,
//       tabs: 0,
//       url: null,
//     },
//   ],
// },

// tabs: {
//   type: 'Object',
//   defaultValue: {
//     employees: [
//       {
//         code: 'employees-employees',
//         order: 1,
//         url: '/employees/employees',
//       },

//       {
//         code: 'employees-groups',
//         order: 3,
//         url: '/employees/groups',
//       },
//     ],

//     devices: [
//       { code: 'devices-devices', order: 1, url: '/devices/devices' },
//       { code: 'gateways', order: 2, url: '/devices/gateways' },
//       { code: 'devices-groups', order: 3, url: '/devices/groups' },
//     ],
//     security: [
//       { code: 'security-certs', order: 1, url: '/security/certs' },
//     ],
//     users: [
//       { code: 'users-users', order: 1, url: '/users/users' },
//       { code: 'users-invitations', order: 2, url: '/users/invitations' },
//     ],
//   },
// },
