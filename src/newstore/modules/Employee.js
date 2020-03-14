import Parse from 'parse';
import { EMPLOYEE, handleParseError } from '@/plugins/new-parse';

export const ACTIONS = {
  subscribeToEmployees: 'subscribeToEmployees',
  saveEmployees: 'saveEmployees'
};

export const GETTERS = {
  getEmployees: 'getEmployees'
};

export const MUTATIONS = {
  setEmployees: 'setEmployees',
  setLabel: 'setLabel',
  pushEmployee: 'pushEmployee'
};

export default {
  namespaced: true,
  state: {
    employees: []
  },
  actions: {
    [ACTIONS.subscribeToEmployees]({ commit }) {
      // try to fetch all employees
      const query = new Parse.Query(EMPLOYEE);
      query
        .find()
        .then(results => {
          let employees = [];
          results.forEach(entity => {
            let employee = Object.assign({}, entity.attributes);
            employee.id = entity.id;
            employees.push(employee);
          });
          commit(MUTATIONS.setEmployees, employees);
        })
        .then(() => {
          // subscribe to new values
          query.subscribe().on('create', entity => {
            let employee = Object.assign({}, entity.attributes);
            employee.id = entity.id;
            commit(MUTATIONS.pushEmployee, employee);
          });
        }),
        error => {
          handleParseError(this, error);
        };
    },
    [ACTIONS.saveEmployees]({ state }) {
      // process all employees
      state.employees.forEach(employee => {
        // process each entity
        const query = new Parse.Query(EMPLOYEE);
        query.get(employee.id).then(entity => {
          // update entity if label changed
          if (entity.get('label') != employee.label) {
            entity.set('label', employee.label);
            entity.save().then(
              () => {
                // success
              },
              error => {
                // eslint-disable-next-line no-console
                console.error('Updating failed', error);
              }
            );
          }
        });
      });
    }
  },
  getters: {
    [GETTERS.getEmployees]: state => {
      return state.employees;
    }
  },
  mutations: {
    [MUTATIONS.setEmployees](state, employees) {
      state.employees = employees;
    },
    [MUTATIONS.setLabel](state, { index, label }) {
      state.employees[index].label = label;
    },
    [MUTATIONS.pushEmployee](state, employee) {
      state.employees.push(employee);
    }
  }
};