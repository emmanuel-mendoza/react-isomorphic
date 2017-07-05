import React from 'react';

// TODO: it doesn't work if I import only the function without using stage-0 way, dunno why
import * as TodoActions from '../actions/actionCreators';
import Routes from './routes.config';

const needs = [TodoActions.getTodos];

export default class Home extends React.Component {
  // static needs = [TodoActions.getTodos]; // Available only for stage-0 preset which is not recommended
  static get needs() { return needs; }

  render() {
    return (
      <div id="app">
        <h1>TODOS LIST</h1>
        <hr />
        <Routes {...this.props} />
      </div>
    );
  }
}
