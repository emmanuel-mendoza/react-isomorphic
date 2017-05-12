import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos from './todo';

const rootReducer = combineReducers({ todos,
  router: routerReducer });

export default rootReducer;

