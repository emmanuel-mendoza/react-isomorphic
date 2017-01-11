// Store contains all app data
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import rootReducer from './reducers/index';
import { logger, crashReporter, promiseMiddleware } from './infra/todos-manager';

const isClient = () => typeof window !== 'undefined';

// Initial state is set depending on if store is being accessed by client or server
console.log('Store being created from ', isClient() ? 'client' : 'server');
const defaultState = {
  todos: isClient() ? window.__INITIAL_STATE__.todos || [] : [] // eslint-disable-line no-underscore-dangle
};

const store = createStore(rootReducer, defaultState, applyMiddleware(logger, promiseMiddleware, crashReporter));
// history only works on client side
const history = isClient() ? syncHistoryWithStore(browserHistory, store) : undefined;

console.log('Initial state: ', store.getState());

export { isClient, history };
export default store;
