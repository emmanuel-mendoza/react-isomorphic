// Store contains all app data
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';
import { logger, crashReporter, promiseMiddleware } from './infra/todos-manager';
import ReduxDevTools from './components/reduxDevTools';

const configureStore = (initialState, history) => {
  const store = createStore(
    rootReducer,
    { todos: initialState || [] },
    compose(
      applyMiddleware(routerMiddleware(history), logger, crashReporter, promiseMiddleware),
      ReduxDevTools.instrument()
    )
  );

  // Reducers HMR
  if (module.hot) {
    module.hot.accept('./reducers', () => (
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default)
    ));
  }

  return store;
};

export default configureStore;
