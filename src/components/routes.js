import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import AppContainer from './appcontainer';

// only routes are defined so it can be used by both server and client
export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={App} />
  </Route>
);
