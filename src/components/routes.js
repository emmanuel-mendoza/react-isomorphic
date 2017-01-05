import React     from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app';
import AppContainer from './appcontainer';

//we just define the routes so it can be used by the server and client
export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={App}></IndexRoute>
  </Route>
);