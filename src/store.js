//Store contains all app data

import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
//import Immutable, { fromJS } from 'immutable';

import rootReducer from './reducers/index';
import {logger, crashReporter, promiseMiddleware} from './infra/todos-manager'; 

//Initial state is set depending on if store is being accessed by client or server
/*
let defaultState;
if (typeof window == 'undefined') {
    console.log('Store being accessed from server');
    defaultState = new Immutable.List();
} else {
    console.log('Store being accessed from client');
    // Transform into Immutable.js collections,
    // but leave top level keys untouched for Redux
    defaultState = window.__INITIAL_STATE__;
    Object
        .keys(defaultState)
        .forEach(key => {
            initialState[key] = fromJS(initialState[key]);
        });
}
*/

let isClient = () => typeof window !== 'undefined';

console.log("Store being created from ", isClient()?"client":"server");
const defaultState = {
    todos: isClient()?window.__INITIAL_STATE__.todos || [] : []
};

const store = createStore(rootReducer, defaultState, applyMiddleware(logger, promiseMiddleware, crashReporter));
const history = isClient()? syncHistoryWithStore(browserHistory, store)  : undefined; //This only works on client side

console.log('Initial state: ', store.getState());

export { isClient, history };
export default store;
