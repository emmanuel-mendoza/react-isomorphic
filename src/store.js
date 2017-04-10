// Store contains all app data
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers/index';
import { logger, crashReporter, promiseMiddleware } from './infra/todos-manager';

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    { todos: initialState || [] },
    applyMiddleware(logger, crashReporter, promiseMiddleware));

  return store;
};

export default configureStore;
