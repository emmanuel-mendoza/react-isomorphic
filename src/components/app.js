import React from 'react';

import TodosView from './todosView';
import TodosForm from './todosForm';
// TODO: it doesn't work if I import only the function without using stage-0 way, dunno why
import * as TodoActions from '../actions/actionCreators';

const needs = [TodoActions.getTodos];

export default class App extends React.Component {
  // static needs = [TodoActions.getTodos]; // Available only for stage-0 preset which is not recommended
  static get needs() { return needs; }

  render() {
    return (
      <div id="app">
        <TodosView {...this.props} />

        <TodosForm {...this.props} />
      </div>
    );
  }
}
