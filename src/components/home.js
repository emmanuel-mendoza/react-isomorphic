import React from 'react';
import { Route } from 'react-router-dom';

import App from './app';

const Home = (props) => (
  <div id="todo-list">
    <h1>TODOS LIST</h1>
    <hr />
    <Route path="/" render={() => <App {...props} />} />
  </div>
);

export default Home;
