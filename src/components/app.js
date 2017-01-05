import React from 'react';

import TodosView from './todosView';
import TodosForm from './todosForm';
import * as TodoActions from '../actions/actionCreators'; //it does not work if I import only the function using stage-0 way, dunno why

const needs = [TodoActions.getTodos];

export default class App extends React.Component {
  //static needs = [TodoActions.getTodos]; //Available only for stage-0 preset which is not recommended
  static get needs() { return needs; };

  render() {
    return (
      <div id="app">        
        <TodosView {...this.props} />

        <TodosForm {...this.props}/>
      </div>
    );
  }
}