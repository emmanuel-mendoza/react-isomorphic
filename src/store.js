// Store contains all app data
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';
import { logger, crashReporter, promiseMiddleware } from './infra/todos-manager';

const configureStore = (initialState, history) => {
  const store = createStore(
    rootReducer,
    { todos: initialState || [] },
    applyMiddleware(routerMiddleware(history), logger, crashReporter, promiseMiddleware)
  );

  return store;
};

export default configureStore;
