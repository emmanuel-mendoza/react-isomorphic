// Array will contain all actions that depend on objects that are only available
// in the client side as this will cause the application fails when trying to
// manage such actions from server. As a consecuence, new actions will be created
// so this can be managed from server.
// It would've be great if this is managed using redux middleware but it seems actions
// action is evaluated before the first middleware is fired, throwing a unknonw
// reference error.

import { getAll, filename } from '../data/data-manager';

// Get todos
function getTodosServer() {
  console.log('Action: Retrieving todos (server)');

  return {
    type: 'GET_TODOS',
    promise: getAll(filename, 1000)
  };
}

// Variable to hold a map between the name of the function that can be only executed
// in the client side and the name of the function to be executed in the server side
// instead.
const actions = {
  getTodos: getTodosServer
};

// Function takes the action function and return the server action function if available
// else it returns the provided action.
function clientToServerAction(action) {
  return actions[action.name] || action;
}

export default clientToServerAction;
