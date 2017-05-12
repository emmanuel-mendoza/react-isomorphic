import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from '../components/routes';
import configureStore from '../store';
import history from '../history';

const store = configureStore(window.__INITIAL_STATE__.todos, history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-view')
);

// HMR
if (module.hot) {
  module.hot.accept();
}
