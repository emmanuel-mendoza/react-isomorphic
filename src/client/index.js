import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes, { routes } from '../components/routes.config';
import configureStore from '../store';
import history from '../history';

const store = configureStore(window.__INITIAL_STATE__.todos, history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-view')
);

// HMR
if (module.hot) {
  module.hot.accept();
}
